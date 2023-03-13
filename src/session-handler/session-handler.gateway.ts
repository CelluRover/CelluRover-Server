import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SessionService } from 'src/session/session.service';

@WebSocketGateway()
export class SessionHandlerGateway {
	constructor(private sessionService: SessionService) {}

	@SubscribeMessage('controllerJoin')
	handleMessage(client: any, payload: any): string {
		return 'Hello world!';
	}
}
