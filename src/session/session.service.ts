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

export enum IAM {
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
		console.log(sessionToJoinIndex);
		//! Write exception later. Using console.log for now.
		if (sessionToJoinIndex == -1) console.log("Session doesn't exist");

		else if ((await this.hasContoller(sessionToJoinIndex)) && who == IAM.user)
			console.log('Session controller exceded');

		else if (await this.isRobotAlreadyConnected(sessionToJoinIndex, socketId))
			console.log('Robot already connected');
		else {
			this.session[sessionToJoinIndex].joiners.push({
				socketId,
				iam: who,
			});
		}
	}
}
