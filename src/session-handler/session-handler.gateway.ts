import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { IJoin } from 'src/interface/IJoin';
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
	@SubscribeMessage('join')
	joinSession(@MessageBody() body: string, client) {
		const response: IJoin = JSON.parse(body);
		console.log(client);
	}
}
