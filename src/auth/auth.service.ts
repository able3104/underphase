// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 💡 카카오에서 받은 사용자 정보를 처리하고 DB에 저장/조회하는 로직
  async validateKakaoUser(kakaoUser: any): Promise<any> {
    // 1. DB에서 kakaoId로 기존 사용자를 조회합니다.
    let user = await this.findUserByKakaoId(kakaoUser.kakaoId);

    // 2. 사용자가 없으면 새로 생성합니다.
    if (!user) {
      user = await this.createUser(kakaoUser);
    }

    // 3. JWT 토큰을 생성하여 반환합니다.
    const payload = { userId: user.id, nickname: user.nickname };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // (실제 구현 필요) DB에서 사용자 조회/생성 로직
  private async findUserByKakaoId(kakaoId: string) {
    /* ... */ return { id: 1, nickname: 'TestUser' };
  }
  private async createUser(kakaoUser: any) {
    /* ... */ return { id: 1, nickname: 'TestUser' };
  }
}
