import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
	catch(exception: WsException, host: ArgumentsHost) {
		const args = host.getArgs();
		if ('function' === typeof args[args.length - 1]) {
			const ACKCallback = args.pop();
			ACKCallback({
				error: exception.message,
				stack: exception.stack,
				name: exception.name,
			});
		}
	}
}
