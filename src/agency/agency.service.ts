import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { agencyLoginResDto } from './dto/agencyLogin.res.dto';
import { agencyLoginReqDto } from './dto/agencyLogin.req.dto';
import { agencyPasswordResetReqDto } from './dto/agencyPasswordReset.req.dto';
import { agencyPasswordResetResDto } from './dto/agencyPasswordReset.res.dto';
import { enrollPriceListReqDto } from './dto/enrollPriceList.req.dto';
import { enrollPriceListResDto } from './dto/enrollPriceList.res.dto';
import { modifyListResDto } from './dto/modifyList.res.dto';
import { modifyListReqDto } from './dto/modifyList.req.dto';
import { deletePriceListResDto } from './dto/deletePriceList.res.dto';
import { deletePriceListReqDto } from './dto/deletePriceList.req.dto';
import { registerRatePlanReqDto } from './dto/registerRatePlan.req.dto';
import { registerRatePlanResDto } from './dto/registerRatePlan.res.dto';
import { getAgencyRatePlansReqDto } from './dto/getAgencyRatePlans.req.dto';
import { getAgencyRatePlansResDto } from './dto/getAgencyRatePlans.res.dto';
import { getRatePlanDetailReqDto } from './dto/getRatePlanDetail.req.dto';
import { getRatePlanDetailResDto } from './dto/getRatePlanDetail.res.dto';
import { deleteRatePlanReqDto } from './dto/deleteRatePlan.req.dto';
import { deleteRatePlanResDto } from './dto/deleteRatePlan.res.dto';
import { checkReservationReqDto } from './dto/checkReservation.req.dto';
import { checkReservationResDto } from './dto/checkReservation.res.dto';
import { getAgencyReservationsReqDto } from './dto/getAgencyReservations.req.dto';
import { getAgencyReservationsResDto } from './dto/getAgencyReservations.res.dto';
import { AuthService } from 'src/auth/auth.service';
import { agencyRegisterResDto } from './dto/agencyRegister.res.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/entity/Seller.entity';
import { Repository } from 'typeorm';
import { Agency } from 'src/entity/Agency.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Phone } from 'src/entity/Phone.entity';
import { Telecom } from 'src/entity/Telecom.entity';
import { agencyRegisterReqDto } from './dto/agencyRegister.req.dto';
import { Brand } from 'src/entity/Brand.entity';

@Injectable()
export class AgencyService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
    @InjectRepository(PriceList)
    private priceListRepository: Repository<PriceList>,
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
    @InjectRepository(Telecom)
    private telecomRepository: Repository<Telecom>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async agencyLogin(dto: agencyLoginReqDto): Promise<agencyLoginResDto> {
    const login = await this.authService.validateAgency(dto);
    const response = new agencyLoginResDto();
    // response.authToken = 'ax234QW234';
    response.authToken = login.authToken;
    return response;
  }

  async agencyRegister(
    dto: agencyRegisterReqDto,
  ): Promise<agencyRegisterResDto> {
    // const seller = await this.sellerRepository.findOne({
    //   where: { name: dto.seller_name },
    // });
    // if (!seller) {
    //   throw new BadRequestException();
    // }

    const agency = await this.agencyRepository.findOne({
      where: { user_id: dto.user_id },
    });
    if (agency) {
      throw new BadRequestException();
    }

    const agencyEntity = new Agency();
    agencyEntity.user_id = dto.user_id;
    agencyEntity.password = dto.password;
    agencyEntity.name = dto.name;
    // agencyEntity.seller = seller;
    agencyEntity.address = dto.address;
    agencyEntity.phone_number = dto.phone_number;
    agencyEntity.start_time = dto.start_time;
    agencyEntity.end_time = dto.end_time;
    agencyEntity.review_score = 5.0;
    agencyEntity.reviews = 0;
    agencyEntity.email = dto.email;
    agencyEntity.image_URL = '';
    agencyEntity.delete_time = '';
    await this.agencyRepository.save(agencyEntity);

    const response = new agencyLoginResDto();
    return response;
  }

  async agencyPasswordReset(
    dto: agencyPasswordResetReqDto,
    agency: Agency,
  ): Promise<agencyPasswordResetResDto> {
    const searchAgency = await this.agencyRepository.findOne({
      where: {
        user_id: dto.user_id,
        phone_number: dto.phone_number,
        email: dto.email,
      },
    });
    if (!searchAgency) {
      throw new NotFoundException();
    }

    const agencies: Agency = {
      ...searchAgency,
      password: dto.new_password,
    };

    await this.agencyRepository.save(agencies);

    const response = new agencyPasswordResetResDto();
    return response;
  }

  async enrollPriceList(
    dto: enrollPriceListReqDto,
    agency: Agency,
  ): Promise<enrollPriceListResDto> {
    const { priceList } = dto;

    for (const item of priceList) {
      const pricelistEntity = new PriceList();
      const phone = await this.phoneRepository.findOne({
        where: { name: item.phone_name },
      });
      if (!phone) {
        // // const newBrand = new Brand();
        // // newBrand.name = item.phone_brand;
        // // newBrand.image_URL = '';
        // // newBrand.delete_time = '';
        // const brand = await this.brandRepository.findOne({
        //   where: { name: item.phone_brand },
        // });
        // if (!brand) {
        //   throw new BadRequestException();
        // }

        // const newPhone = new Phone();
        // newPhone.name = item.phone_name;
        // newPhone.volume = '256GB';
        // newPhone.color = 'black';
        // newPhone.image_URL = '';
        // newPhone.delete_time = '';
        // newPhone.brand = brand;

        // // await this.brandRepository.save(newBrand);
        // await this.phoneRepository.save(newPhone);

        // const response = new enrollPriceListResDto();
        // return response;
        throw new BadRequestException();
      }
      const telecom = await this.telecomRepository.findOne({
        where: { name: item.telecom },
      });
      if (!telecom) {
        // const newTelecom = new Telecom();
        // newTelecom.name = item.telecom;
        // newTelecom.delete_time = '';
        // await this.telecomRepository.save(newTelecom);

        // const response = new enrollPriceListResDto();
        // return response;
        throw new BadRequestException();
      }

      if (!agency) {
        throw new BadRequestException();
      }
      pricelistEntity.phone = phone;
      pricelistEntity.agency = agency;
      pricelistEntity.telecom = telecom;
      pricelistEntity.subscription_type = item.subscription_type;
      pricelistEntity.price = item.rebatedPrice;
      pricelistEntity.delete_time = '';

      await this.priceListRepository.create(pricelistEntity);
    }

    const response = new enrollPriceListResDto();
    return response;
  }

  async modifyPriceList(
    dto: modifyListReqDto,
    agency: Agency,
  ): Promise<modifyListResDto> {
    /*
    const priceList = [
      {
        phone_name: 'S25',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 35,
      },
      {
        phone_name: 'S25+',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 55,
      },
    ];
    */
    const response = new modifyListResDto();

    //response.priceList = priceList;
    return response;
  }

  async deletePriceList(
    dto: deletePriceListReqDto,
  ): Promise<deletePriceListResDto> {
    const response = new deletePriceListResDto();
    return response;
  }

  async registerRatePlan(
    dto: registerRatePlanReqDto,
  ): Promise<registerRatePlanResDto> {
    const response = new registerRatePlanResDto();
    return response;
  }

  async getAgencyRatePlans(
    dto: getAgencyRatePlansReqDto,
  ): Promise<getAgencyRatePlansResDto> {
    const rate = [
      {
        plan_name: '5G 스탠다드',
        price: 75000,
        telecom: 'SKT',
        data: 150,
      },
      {
        plan_name: '5G 프리미엄',
        price: 89000,
        telecom: 'SKT',
        data: 250,
      },
    ];
    const response = new getAgencyRatePlansResDto();
    response.rate = rate;
    return response;
  }

  async getRatePlanDetail(
    dto: getRatePlanDetailReqDto,
  ): Promise<getRatePlanDetailResDto> {
    const response = new getRatePlanDetailResDto();
    response.plan_name = '5G 스탠다드';
    response.telecom = 'SKT';
    response.price = 75000;
    response.data = 150;
    return response;
  }

  async deleteRatePlan(
    dto: deleteRatePlanReqDto,
  ): Promise<deleteRatePlanResDto> {
    const response = new deleteRatePlanResDto();
    return response;
  }

  async checkReservations(
    dto: checkReservationReqDto,
  ): Promise<checkReservationResDto> {
    const response = new checkReservationResDto();
    response.approval_status = 'approved';
    return response;
  }

  async getAgencyReservations(
    dto: getAgencyReservationsReqDto,
  ): Promise<getAgencyReservationsResDto> {
    const reservation = [
      {
        user_id: 'user1',
        phone_name: 'S25',
        phone_brand: 'samsung',
        auth_code: '1872536263',
        status: 'Pending',
      },
    ];
    const response = new getAgencyReservationsResDto();
    response.reservation = reservation;
    return response;
  }
}
