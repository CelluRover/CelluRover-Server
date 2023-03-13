import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SessionService } from 'src/session/session.service';

@WebSocketGateway()
export class SessionHandlerGateway {
	constructor(private sessionService: SessionService) {
		console.log('bruh');
	}

	@SubscribeMessage('createSession')
	createSession() {
		let response = this.sessionService.createSession();
		return response;
	}
}
