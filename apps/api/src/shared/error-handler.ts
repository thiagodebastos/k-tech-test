import { InternalServerErrorException, Logger } from '@nestjs/common';

/**
 * A reusable error handling utility for logging and throwing consistent errors
 */
export class ErrorHandler {
  private static logger = new Logger('ErrorHandler');

  static handleError(error: any, message: string, errorCode?: string) {
    // log the error details internally
    this.logger.error(`${message} :`, error.stack || error.message);

    throw new InternalServerErrorException({
      message,
      errorCode: errorCode || 'INTERNAL_SERVER_ERROR',
    });
  }
}
