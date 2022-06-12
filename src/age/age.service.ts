import { Injectable } from '@nestjs/common';

@Injectable()
export class AgeService {
  isAdult(birthDate: Date): boolean {
    return this.getAgeFromDate(birthDate) >= 18;
  }

  getAgeFromDate(birthDate: Date) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
