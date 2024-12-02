import { All, Controller } from '@nestjs/common';

@Controller('')
export class AppController {
  @All()
  async findAll() {
    return `hello there! service is up and running`;
  }
}
