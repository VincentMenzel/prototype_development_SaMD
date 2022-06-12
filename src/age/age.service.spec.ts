import { Test, TestingModule } from '@nestjs/testing';
import { AgeService } from './age.service';

const getDate = ({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}): Date => {
  const date = new Date();
  // exception: month is presented by 0 - 11
  date.setFullYear(year, month - 1, day);
  return date;
};

describe('AgeService', () => {
  let service: AgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgeService],
    }).compile();

    jest.useFakeTimers().setSystemTime(new Date('2022-06-12'));

    service = module.get<AgeService>(AgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 22', () => {
    const birthDate = getDate({ day: 4, month: 3, year: 2000 });
    expect(service.getAgeFromDate(birthDate)).toBe(22);
  });

  it('should be 22 if birthday ist today', () => {
    const birthDate = getDate({ day: 12, month: 6, year: 2000 });
    expect(service.getAgeFromDate(birthDate)).toBe(22);
    expect(service.isAdult(birthDate)).toBeTruthy();
  });

  it('should not be 22 if birthday is tomorrow', () => {
    const birthDate = getDate({ day: 13, month: 6, year: 2000 });
    expect(service.getAgeFromDate(birthDate)).toBe(21);
    expect(service.isAdult(birthDate)).toBeTruthy();
  });

  it('should be adult with 18', () => {
    const birthDate = getDate({ day: 1, month: 1, year: 2004 });
    expect(service.getAgeFromDate(birthDate)).toBe(18);
    expect(service.isAdult(birthDate)).toBeTruthy();
  });

  it('should be adult if birthday is today', () => {
    const birthDate = getDate({ day: 12, month: 6, year: 2004 });
    console.log(birthDate);
    expect(service.getAgeFromDate(birthDate)).toBe(18);
    expect(service.isAdult(birthDate)).toBeTruthy();
  });

  it('should not be adult if birthday is tomorrow', () => {
    const birthDate = getDate({ day: 13, month: 6, year: 2004 });
    expect(service.getAgeFromDate(birthDate)).toBe(17);
    expect(service.isAdult(birthDate)).toBeFalsy();
  });

  it('should not be adult if birthday is tomorrow', () => {
    const birthDate = getDate({ day: 13, month: 6, year: 2004 });
    expect(service.getAgeFromDate(birthDate)).toBe(17);
    expect(service.isAdult(birthDate)).toBeFalsy();
  });

  it('should ', () => {
    const birthDate = getDate({ day: 31, month: 12, year: 2004 });
    expect(service.getAgeFromDate(birthDate)).toBe(17);
  });
});
