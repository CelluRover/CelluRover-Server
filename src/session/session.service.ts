import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { v4 as uuidv4 } from 'uuid';

interface Session {
	sessionUUID: string;
	robotIp: string;
	controllerIp: string;
	robotOnline: boolean;
	controllerOnline: boolean;
}

@Injectable()
export class SessionService {
	private session: Array<Session> = [];

	constructor() {
		//! This is temporary, should not be shipped to production
		this.session.push({
			sessionUUID: 'f422d6a5-86a2-4c7d-935c-f1e6640e3159',
			robotIp: '',
			controllerIp: '',
			robotOnline: false,
			controllerOnline: false,
		});
	}

	public async createSession() {
		const id = uuidv4();
		this.session.push({
			sessionUUID: id,
			robotIp: '',
			controllerIp: '',
			robotOnline: false,
			controllerOnline: false,
		});
		return { id: id };
	}

	public async robotJoin(ip: string, session: string) {
		const index = this.session.findIndex((p) => p.sessionUUID == session);
		console.log(index);
		if (index > -1) {
			this.session[index].robotIp = ip;
			this.session[index].robotOnline = true;
		} else console.log('bruh');
	}

	public async robotEnd(sessionId: string) {
		const index = this.session.findIndex((p) => p.sessionUUID == sessionId);
		if (index > -1) {
			this.session[index].robotIp = '';
			this.session[index].robotOnline = false;
		} else throw new WsException("Session doesn't exist");
	}

	public async controllerJoin(ip: string, session: string) {
		console.log(session);
		const index = this.session.findIndex((p) => p.sessionUUID == session);
		if (index > -1) {
			this.session[index].controllerIp = ip;
			this.session[index].controllerOnline = true;
		} else console.log('bruh');
	}

	public async controllerEnd(ip: string, session: string) {
		const index = this.session.findIndex((p) => p.sessionUUID == session);
		if (index > -1) {
			this.session[index].controllerIp = '';
			this.session[index].controllerOnline = false;
		} else throw new WsException("Session doesn't exist");
	}
}
