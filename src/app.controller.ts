import { Controller, Get, Header, Res, Response, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pdf')
  download(@Res() res) {
    const filename = 'book.pdf';
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    const filestream = createReadStream('./files/' + filename);
    filestream.pipe(res);
  }
}