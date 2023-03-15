import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { SessionService } from 'src/session/session.service';

@WebSocketGateway()
export class DataCommsGateway {
	constructor(private sessionService: SessionService) {}

	
}
