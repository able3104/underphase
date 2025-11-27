import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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
import { IsNull, Repository } from 'typeorm';
import { Agency } from 'src/entity/Agency.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Phone } from 'src/entity/Phone.entity';
import { Telecom } from 'src/entity/Telecom.entity';
import { agencyRegisterReqDto } from './dto/agencyRegister.req.dto';
import { Brand } from 'src/entity/Brand.entity';
import { payloadClass } from 'src/auth/payload.class';
import { getAllPriceListReqDto } from './dto/getAllPriceList.req.dto';
import { getAllPriceListResDto } from './dto/getAllPriceList.res.dto';
import { Rate } from 'src/entity/Rate.entity';
import { SubsidyByTelecom } from 'src/entity/SubsidyByTelecom.entity';
import { enrollSubsidyReqDto } from './dto/enrollSubsidy.req.dto';
import { enrollSubsidyResDto } from './dto/enrollSubsidy.res.dto';
import { getStatusAgencyReqDto } from './dto/getStatusAgency.req.dto';
import { getStatusAgencyResDto } from './dto/getStatusAgency.res.dto';
import { StatusAgency } from 'src/entity/StatusAgency.entity';
import { getStatusQuoteReqDto } from './dto/getStatusQuote.req.dto';
import { getStatusQuoteResDto } from './dto/getStatusQuote.res.dto';

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
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    @InjectRepository(SubsidyByTelecom)
    private subsidyRepository: Repository<SubsidyByTelecom>,
    @InjectRepository(StatusAgency)
    private statusAgencyRepository: Repository<StatusAgency>,
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
    agencyEntity.auth_tag = true;
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

  /**여기*/
  async enrollPriceList(
    dto: enrollPriceListReqDto,
    agency: payloadClass,
  ): Promise<enrollPriceListResDto> {
    if (!agency) throw new BadRequestException();
    // console.debug(`agency: ${JSON.stringify(agency)}`);
    const { priceList } = dto;

    for (const item of priceList) {
      const phone: Phone | null = await this.phoneRepository.findOne({
        where: { name: item.phone_name },
      });

      if (!phone) throw new BadRequestException();
      await this.phoneRepository.save(phone);

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
      const telecom: Telecom | null = await this.telecomRepository.findOne({
        where: { name: item.telecom },
      });

      // const newTelecom = new Telecom();
      // newTelecom.name = item.telecom;
      // newTelecom.delete_time = '';
      // await this.telecomRepository.save(newTelecom);

      // const response = new enrollPriceListResDto();
      // return response;
      if (!telecom) throw new BadRequestException();

      // const pricelistEntity = new PriceList();
      // pricelistEntity.phone = phone;
      // pricelistEntity.agency = agency;
      // pricelistEntity.telecom = telecom;
      // pricelistEntity.subscription_type = item.subscription_type;
      // pricelistEntity.price = item.rebatedPrice;
      // pricelistEntity.delete_time = '';
      // let pricelistEntity = await this.priceListRepository.findOne({
      //   where: {
      //     phone: { id: phone.id }, // ID를 사용하여 검색
      //     agency: { id: agency.payload.id },
      //     telecom: { id: telecom.id },
      //     subscription_type: item.subscription_type,
      //   },
      // });

      // console.debug(new Agency());
      // const newRate = new Rate();
      // newRate.name = item.phone_plan.name;
      // newRate.price = item.phone_plan.price;
      // newRate.data = 200;
      // newRate.telecom = telecom;
      // newRate.delete_time = '';
      // await this.rateRepository.save(newRate);

      const rate = await this.rateRepository.findOne({
        where: { name: item.phone_plan.name },
      });
      if (!rate) throw new BadRequestException();

      const new_agency = new Agency();
      new_agency.id = agency.payload.id;

      const new_data = PriceList.setter(
        new_agency,
        phone,
        telecom,
        item.subscription_type,
        item.phone_price,
        phone.price,
        item.discount.name,
        item.discount.price,
        '',
        rate,
      );
      console.debug(new_data);

      const find_priceList = await this.priceListRepository.find({
        where: {
          subscription_type: item.subscription_type,
          agency: new_agency,
          phone: phone,
          telecom: telecom,
          // discount_name: item.discount.name,
          // discount_price: item.discount.price,
          rate: rate,
          delete_time: '',
        },
      });
      if (find_priceList) throw new NotFoundException();

      await this.priceListRepository.save(new_data);
    }

    const response = new enrollPriceListResDto();
    return response;
  }

  async modifyPriceList(
    dto: modifyListReqDto,
    agency: payloadClass,
  ): Promise<modifyListResDto> {
    const { priceList } = dto;

    // const agencyForSearch: Agency | null = await this.agencyRepository.findOne({
    //   where: { id: agency.payload.id },
    // });
    // if (!agencyForSearch) throw new BadRequestException();
    // console.debug(agencyForSearch);
    const agencyForSearch = new Agency();
    agencyForSearch.id = agency.payload.id;

    const updatePromises = priceList.map(async (item) => {
      const phone: Phone | null = await this.phoneRepository.findOne({
        where: { name: item.phone_name },
      });
      if (!phone) throw new BadRequestException();
      console.debug(phone);

      const telecom: Telecom | null = await this.telecomRepository.findOne({
        where: { name: item.telecom },
      });
      if (!telecom) throw new BadRequestException();
      console.debug(telecom);

      const rate: Rate | null = await this.rateRepository.findOne({
        where: { name: item.phone_plan.name },
      });
      if (!rate) throw new BadRequestException();
      console.debug(rate);

      const pricelistEntity: PriceList | null =
        await this.priceListRepository.findOne({
          where: {
            subscription_type: item.subscription_type,

            agency: { id: agency.payload.id },
            phone: { id: phone.id },
            telecom: { id: telecom.id },
            rate: { id: rate.id },
            delete_time: '',
          },
        });
      if (!pricelistEntity) {
        throw new NotFoundException();
      }
      console.debug(pricelistEntity);

      pricelistEntity.price = item.phone_price;
      await this.priceListRepository.save(pricelistEntity);

      return item;
    });
    try {
      const updatedPriceList = await Promise.all(updatePromises);

      const response = new modifyListResDto();
      response.priceList = updatedPriceList;

      return response;
    } catch (error) {
      throw error;
    }

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
    // const response = new modifyListResDto();

    // //response.priceList = priceList;
    // return response;
  }

  async getAllPriceList(
    // dto: getAllPriceListReqDto,
    agency: payloadClass,
  ): Promise<getAllPriceListResDto> {
    // const searchAgency = await this.agencyRepository.findOne({
    //   where: { id: agency.payload.id },
    // });
    // if (!searchAgency) throw new BadRequestException();

    // const priceList = await this.priceListRepository.find({
    //   where: { agency: { id: searchAgency.id }, delete_time: '' },
    //   relations: ['phone', 'telecom', 'rate'],
    // });
    // if (!priceList) throw new NotFoundException();
    // console.debug(priceList);

    const response = new getAllPriceListResDto();
    // response.priceList = priceList.map((item) => ({
    //   agecny_id: item.agency.id,
    //   phone_name: item.phone.name,
    //   phone_brand: item.phone.brand.name,
    //   phone_price: item.price,
    //   phone_plan: {
    //     name: item.rate.name,
    //     price: item.rate.price,
    //   },
    //   discount: {
    //     name: item.discount_name,
    //     price: item.discount_price,
    //   },
    //   subscription_type: item.subscription_type,
    //   telecom: item.telecom.name,
    // }));

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

  async enrollSubsidy(
    dto: enrollSubsidyReqDto,
    agency: payloadClass,
  ): Promise<enrollSubsidyResDto> {
    const agencyForSearch = new Agency();
    agencyForSearch.id = agency.payload.id;

    const newSubsidy: SubsidyByTelecom | null =
      await this.subsidyRepository.findOne({
        where: { telecom: dto.telecom },
      });
    if (newSubsidy) throw new NotFoundException();

    const subsidyEntity = new SubsidyByTelecom();
    subsidyEntity.value = dto.subsidy_value;
    subsidyEntity.telecom = dto.telecom;

    await this.subsidyRepository.save(subsidyEntity);

    const response = new enrollSubsidyResDto();
    return response;
  }

  async getStatusAgency(
    dto: getStatusAgencyReqDto,
    agency: payloadClass,
  ): Promise<getStatusAgencyResDto> {
    const agencyForSearch: Agency | null = await this.agencyRepository.findOne({
      where: { id: agency.payload.id },
    });
    if (!agencyForSearch) throw new UnauthorizedException();
    console.debug(agencyForSearch);

    const statusAgencyForSearch = await this.statusAgencyRepository.find({
      where: {
        agency: { id: agencyForSearch.id },
        delete_time: '',
      },
    });
    if (statusAgencyForSearch) {
    } else if (!statusAgencyForSearch) {
      const statusAgencyEntity = new StatusAgency();
      statusAgencyEntity.agency = agencyForSearch;
      statusAgencyEntity.complete_quote_count = 0;
      statusAgencyEntity.quote_count = 0;
      statusAgencyEntity.delete_time = '';

      await this.statusAgencyRepository.save(statusAgencyEntity);
    }
    console.debug(statusAgencyForSearch);
    const statusAgency: StatusAgency | null =
      await this.statusAgencyRepository.findOne({
        where: {
          agency: { id: agencyForSearch.id },
          delete_time: '',
        },
      });
    if (!statusAgency) throw new NotFoundException();

    const response = new getStatusAgencyResDto();
    response.complete_quote_count = statusAgency.complete_quote_count;
    response.quote_count = statusAgency.quote_count;
    return response;
  }

  async getStatusQuote(
    dto: getStatusQuoteReqDto,
    agency: payloadClass,
  ): Promise<getStatusQuoteResDto> {
    const response = new getStatusQuoteResDto();
    return response;
  }
}
