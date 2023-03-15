import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
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

	@SubscribeMessage('clientJoin')
	handleMessage(@MessageBody() payload: string) {
		this.sessionService.controllerJoin('1.2.2.3', payload);
		return 'OK';
	}

	@SubscribeMessage('robotJoin')
	handleRobotJoin(@MessageBody() payload: string) {
		this.sessionService.robotJoin('1.2.2.4', payload);
		return 'OK';
	}
}
