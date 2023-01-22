import { Injectable, LoggerService } from '@nestjs/common';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { RootLogger } from './root-logger';
@Injectable()
export class RequestLogger implements LoggerService {
	constructor(
		private readonly ac: AsyncContext<string, any>,
		private readonly rootLogger: RootLogger
	) {}

	private get logger() {
		let traceId = '';
		try {
			traceId = this.ac.get('traceId');
		} catch (err) {
			this.rootLogger.warn('Async context not available');
		}

		return this.rootLogger.child({
			traceId,
		});
	}

	info(message: any, ...optionalParams: any[]) {
		this.log(message, ...optionalParams);
	}

	/**
	 * Write a 'log' level log. equivalent to info
	 */
	log(message: any, ...optionalParams: any[]) {
		this.logger.info(message, ...optionalParams);
	}

	/**
	 * Write an 'error' level log.
	 */
	error(message: any, ...optionalParams: any[]) {
		this.logger.error(message, ...optionalParams);
	}

	/**
	 * Write a 'warn' level log.
	 */
	warn(message: any, ...optionalParams: any[]) {
		this.logger.warn(message, ...optionalParams);
	}

	/**
	 * Write a 'debug' level log.
	 */
	debug(message: any, ...optionalParams: any[]) {
		this.logger.debug(message, ...optionalParams);
	}

	/**
	 * Write a 'verbose' level log.
	 */
	trace(message: any, ...optionalParams: any[]) {
		this.logger.trace(message, ...optionalParams);
	}
}
