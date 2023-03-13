import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { SessionService } from 'src/session/session.service';

@WebSocketGateway()
export class DataCommsGateway {
	constructor(private sessionService: SessionService) {}

	@SubscribeMessage('clientJoin')
	handleMessage(@MessageBody() payload: string) {
		console.log(JSON.stringify(payload));
		this.sessionService.controllerJoin('1.2.2.3', payload);
		return 'OK';
	}
}
