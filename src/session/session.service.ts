import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';

interface Session {
	sessionUUID: string;
	joiners: Array<Joiner>;
}

interface Joiner {
	socketId: string;
	iam: IAM;
}

enum IAM {
	robot,
	user,
}

@Injectable()
export class SessionService {
	private session: Array<Session> = [];

	constructor() {
		//! This is temporary, should not be shipped to production
		this.session.push({
			sessionUUID: 'f422d6a5-86a2-4c7d-935c-f1e6640e3159',
			joiners: [],
		});
	}

	public async createSession() {
		const id = uuidv4();
		this.session.push({
			sessionUUID: id,
			joiners: [],
		});
		return { id: id };
	}

	private async hasContoller(sessionIndex: number) {
		let value = this.session[sessionIndex].joiners.find(
			(joiner) => joiner.iam == IAM.user,
		);
		return value ? true : false;
	}

	private async isRobotAlreadyConnected(
		sessionIndex: number,
		robotSocket: string,
	) {
		let value = this.session[sessionIndex].joiners.find(
			(joiner) =>
				joiner.iam == IAM.robot && joiner.socketId == robotSocket,
		);
		return value ? true : false;
	}

	public async join(socketId: string, who: IAM, sessionId: string) {
		const sessionToJoinIndex = this.session.findIndex(
			(ses) => ses.sessionUUID == sessionId,
		);

		if (sessionToJoinIndex == -1)
			throw new WsException("session doesn't exist");

		if ((await this.hasContoller(sessionToJoinIndex)) && who == IAM.user)
			throw new WsException('Session controller exceded');

		if (await this.isRobotAlreadyConnected(sessionToJoinIndex, socketId))
			throw new WsException('Robot already connected');

		this.session[sessionToJoinIndex].joiners.push({
			socketId,
			iam: who,
		});
	}
}
