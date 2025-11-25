import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserPayload } from './userPayload';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as admin from 'firebase-admin';
import * as path from 'path'; // Node.js의 path 모듈 사용
import * as fs from 'fs'; // Node.js의 fs 모듈 사용
import { cwd } from 'process';

interface DecodedKakaoUser {
  firebaseUid: string;
  kakaoId: string;
  email: string;
}

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);
  private readonly KAKAO_API_URL = 'https://kapi.kakao.com/v2/user/me';
  private readonly KAKAO_OIDC_USERINFO_URL =
    'https://kapi.kakao.com/v1/oidc/userinfo'; // 👈 OIDC 엔드포인트 추가
  constructor(
    // private jwtService: JwtService, // 현재 로직에서 사용되지 않아 주석 처리
    private httpService: HttpService, // 카카오 API 호출에 사용
    @InjectRepository(KakaoUser)
    private kakaoUserRepository: Repository<KakaoUser>, // DB 연동에 사용
  ) {
    // if (admin.apps.length === 0) {
    //   try {
    //     // 1. 서비스 계정 JSON 파일 경로 설정
    //     const serviceAccountPath = path.resolve(
    //       cwd(), // 👈 현재 작업 디렉토리 (프로젝트 루트)
    //       'config',
    //       'firebase-keys',
    //       'underphase-ad033-admin-key.json',
    //     );
    //     console.log(
    //       `[DEBUG] Resolved Service Account Path: ${serviceAccountPath}`,
    //     );
    //     // 2. 파일 내용을 동기적으로 읽기
    //     const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');
    //     const serviceAccount = JSON.parse(serviceAccountJson);
    //     // 3. Admin SDK 초기화
    //     admin.initializeApp({
    //       credential: admin.credential.cert(serviceAccount),
    //       // databaseURL: '...', // 필요한 경우 추가
    //     });
    //     console.log('✅ Firebase Admin SDK initialized successfully.');
    //   } catch (e) {
    //     console.error('❌ Firebase Admin SDK initialization critical failure:');
    //     console.error(`Error details: ${e.message}`);
    //     console.error(
    //       'Check if the JSON key file exists at the resolved path.',
    //     );
    //     // 파일 로드 실패 또는 JSON 파싱 오류 시에도 에러가 발생합니다.
    //   }
    // }
  }

  /**
   * TypeORM 옵션을 사용하여 DB에서 사용자를 조회합니다.
   * @param options TypeORM FindOneOptions
   * @returns KakaoUser 엔티티 또는 null
   */
  async findByfield(
    options: FindOneOptions<KakaoUser>,
  ): Promise<KakaoUser | null> {
    return this.kakaoUserRepository.findOne(options);
  }

  /**
   * JWT Payload를 기반으로 DB에서 사용자를 검증합니다.
   * (현재 이 서비스는 카카오 Access Token 검증에 중점을 두고 있어, 이 함수는 자체 JWT 검증 시 사용될 수 있습니다.)
   * @param userPayload 검증할 JWT Payload
   * @returns KakaoUser 엔티티 또는 null
   */
  async tokenValidate(userPayload: UserPayload): Promise<KakaoUser | null> {
    // JWT Payload의 'sub' 필드를 사용하여 DB에서 사용자 조회
    return this.findByfield({
      where: { kakaoId: userPayload.kakaoId },
    });
  }

  // --- 카카오 Access Token을 통한 사용자 정보 조회 ---

  /**
   * 카카오 Access Token을 사용하여 카카오 서버로부터 사용자 정보를 조회합니다.
   * @param token 클라이언트가 전달한 카카오 Access Token
   * @returns 카카오 사용자 정보 객체 (id, properties, kakao_account 등 포함)
   */
  // async getKakaoUserInfo(token: string): Promise<any> {
  //   try {
  //     this.logger.debug(
  //       `Calling Kakao API with token: ${token.substring(0, 10)}...`,
  //     );

  //     const response = await firstValueFrom(
  //       this.httpService.get(this.KAKAO_API_URL, {
  //         headers: {
  //           // 필수: Authorization 헤더에 Bearer 타입으로 토큰을 전달
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }),
  //     );

  //     this.logger.debug(`Kakao User Info received: ID ${response.data.id}`);
  //     // 응답 데이터에서 사용자 정보를 추출하여 반환
  //     return response.data;
  //   } catch (error) {
  //     // 카카오 API 호출 실패 (401 Unauthorized, 네트워크 에러 등) 시
  //     const errorMessage = error.response?.data?.msg || error.message;
  //     this.logger.error(`Kakao API Call Error: ${errorMessage}`);

  //     // NestJS 표준 예외로 변환하여 가드(Guard)에 전달
  //     throw new UnauthorizedException(
  //       '유효하지 않은 카카오 Access Token입니다. (' + errorMessage + ')',
  //     );
  //   }
  // }

  async verifyFirebaseToken(token: string): Promise<DecodedKakaoUser> {
    try {
      // Firebase Admin SDK를 사용하여 ID Token의 유효성을 검증하고 디코딩합니다.
      const decodedToken = await admin.auth().verifyIdToken(token);

      // 토큰 페이로드에서 필요한 정보(카카오 ID 포함)를 추출합니다.
      const kakaoId = decodedToken.firebase.identities['oidc.kakao']?.[0];

      if (!kakaoId) {
        throw new UnauthorizedException('토큰에 카카오 OIDC 정보가 없습니다.');
      }

      return {
        firebaseUid: decodedToken.uid,
        kakaoId: kakaoId,
        email: decodedToken.email ?? '',
      };
    } catch (error) {
      // 토큰 만료, 서명 불일치 등 모든 인증 실패를 처리합니다.
      console.error('Firebase Token Verification Error:', error.message);
      throw new UnauthorizedException(
        '유효하지 않거나 만료된 인증 토큰입니다.',
      );
    }
  }

  async getKakaoOidcUserInfo(accessToken: string): Promise<any> {
    try {
      this.logger.debug(
        `[Kakao OIDC API] Attempting to fetch user info with token...`,
      );

      // 1. OIDC 엔드포인트로 GET 요청 전송
      const response = await firstValueFrom(
        this.httpService.get(this.KAKAO_OIDC_USERINFO_URL, {
          headers: {
            // 공식 문서에 명시된 대로 Authorization 헤더에 Bearer 타입으로 토큰 전달
            Authorization: `Bearer ${accessToken}`,
            // 'Content-Type': 'application/json', // OIDC UserInfo 엔드포인트에서는 필수는 아님
          },
        }),
      );

      // 2. 성공 시 응답 데이터 반환
      this.logger.debug(
        `[Kakao OIDC API] Success! User Subject (sub): ${response.data.sub}`,
      );
      return response.data;
    } catch (error) {
      // 3. API 호출 실패 처리
      const kakaoError = error.response?.data;
      const errorMessage = kakaoError?.msg || error.message;

      this.logger.error(`[Kakao OIDC API] Call Error: ${errorMessage}`);

      // 유효하지 않은 토큰에 대해 HTTP 401 예외 발생
      throw new UnauthorizedException(
        `카카오 OIDC Access Token 검증 실패: (${errorMessage})`,
      );
    }
  }
}
