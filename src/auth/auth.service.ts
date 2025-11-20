// src/auth/auth.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyService } from 'src/agency/agency.service';
import { agencyLoginReqDto } from 'src/agency/dto/agencyLogin.req.dto';
import { agencyLoginResDto } from 'src/agency/dto/agencyLogin.res.dto';
import { Agency } from 'src/entity/Agency.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Payload } from './payload';
import { payloadClass } from './payload.class';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private agencyService: AgencyService,
    @InjectRepository(Agency) private agencyRepository: Repository<Agency>,
  ) {}

  // // 💡 카카오에서 받은 사용자 정보를 처리하고 DB에 저장/조회하는 로직
  // async validateKakaoUser(kakaoUser: any): Promise<any> {
  //   // 1. DB에서 kakaoId로 기존 사용자를 조회합니다.
  //   let user = await this.findUserByKakaoId(kakaoUser.kakaoId);

  //   // 2. 사용자가 없으면 새로 생성합니다.
  //   if (!user) {
  //     user = await this.createUser(kakaoUser);
  //   }

  //   // 3. JWT 토큰을 생성하여 반환합니다.
  //   const payload = { userId: user.id, nickname: user.nickname };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  // // (실제 구현 필요) DB에서 사용자 조회/생성 로직
  // private async findUserByKakaoId(kakaoId: string) {
  //   /* ... */ return { id: 1, nickname: 'TestUser' };
  // }
  // private async createUser(kakaoUser: any) {
  //   /* ... */ return { id: 1, nickname: 'TestUser' };
  // }

  async validateAgency(dto: agencyLoginReqDto): Promise<agencyLoginResDto> {
    const agency = await this.findByfield({
      where: { user_id: dto.user_id, password: dto.password },
    });
    if (!agency) {
      throw new NotFoundException();
    }

    const payloadclass = new payloadClass();
    payloadclass.payload.id = agency.id;
    payloadclass.payload.user_id = agency.user_id;

    const accessToken = this.jwtService.sign(payloadclass.payload);

    const response = new agencyLoginResDto();
    response.authToken = accessToken;
    return response;
  }

  async findByfield(options: FindOneOptions<Agency>): Promise<Agency | null> {
    return this.agencyRepository.findOne(options);
  }

  async tokenValidate(payload: Payload): Promise<Agency | null> {
    return this.findByfield({
      where: { id: payload.id },
    });
  }
}
