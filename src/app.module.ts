import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataCommsGateway } from './data-comms/data-comms.gateway';
import { SessionService } from './session/session.service';
import { SessionHandlerGateway } from './session-handler/session-handler.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DataCommsGateway, SessionService, SessionHandlerGateway],
})
export class AppModule {}
