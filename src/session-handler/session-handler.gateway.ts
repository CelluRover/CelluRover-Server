import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { IJoin } from 'src/interface/IJoin';
import { Socket } from 'socket.io';
import { IAM, SessionService } from 'src/session/session.service';

@WebSocketGateway({ cors: true })
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
	joinSession(@MessageBody() body: IJoin, @ConnectedSocket() client: Socket) {
		this.sessionService.join(client.id, IAM[body.iam], body.sessionId);
	}
}
