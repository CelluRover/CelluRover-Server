import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovementGateway } from './movement/movement.gateway';
import { DataCommsGateway } from './data-comms/data-comms.gateway';
import { SessionService } from './session/session.service';
import { SessionHandlerGateway } from './session-handler/session-handler.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MovementGateway, DataCommsGateway, SessionService, SessionHandlerGateway],
})
export class AppModule {}
