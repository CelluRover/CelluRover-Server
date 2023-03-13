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

	public async createSession() {
		this.session.push({
			sessionUUID: uuidv4(),
			robotIp: '',
			controllerIp: '',
			robotOnline: false,
			controllerOnline: false,
		});
	}

	public async robotJoin(ip: string, session: string) {
		const index = this.session.findIndex((p) => p.sessionUUID == session);
		if (index > -1) {
			this.session[index].robotIp = ip;
			this.session[index].robotOnline = true;
		} else throw new WsException("Session doesn't exist");
	}

	public async robotEnd(session: string) {
		const index = this.session.findIndex((p) => p.sessionUUID == session);
		if (index > -1) {
			this.session[index].robotIp = "";
			this.session[index].robotOnline = false;
		} else throw new WsException("Session doesn't exist");
	}

	public async controllerJoin(ip: string, session: string) {
		const index = this.session.findIndex((p) => p.sessionUUID == session);
		if (index > -1) {
			this.session[index].controllerIp = ip;
			this.session[index].controllerOnline = true;
		} else throw new WsException("Session doesn't exist");
	}

	public async controllerEnd(ip: string, session: string) {
		const index = this.session.findIndex((p) => p.sessionUUID == session);
		if (index > -1) {
			this.session[index].controllerIp = "";
			this.session[index].controllerOnline = false;
		} else throw new WsException("Session doesn't exist");
	}
}
