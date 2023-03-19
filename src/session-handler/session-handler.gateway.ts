import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WsException,
} from '@nestjs/websockets';
import { IJoin } from 'src/interface/IJoin';
import { Socket } from 'socket.io';
import { IAM, SessionService } from 'src/session/session.service';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WsExceptionFilter } from 'src/session/WsErrorException';

@WebSocketGateway({ cors: true })
@UseFilters(new WsExceptionFilter())
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
	async joinSession(
		@MessageBody() body: IJoin,
		@ConnectedSocket() client: Socket,
	) {
		await this.sessionService.join(
			client.id,
			IAM[body.iam],
			body.sessionId,
		);
	}
}
