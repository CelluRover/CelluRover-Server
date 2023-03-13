import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SessionService } from 'src/session/session.service';

@WebSocketGateway()
export class DataCommsGateway {
	constructor(private sessionService: SessionService) {}

	@SubscribeMessage('clientJoin')
	handleMessage(client: any, payload: any): string {
		return 'Hello world!';
	}
}
