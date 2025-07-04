import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const now = new Date();
    const startAt = process.hrtime();
    const userAgent = request.get("user-agent") || "";
    this.logger.log(
      `${now.valueOf()} start ${method} ${originalUrl} - ${userAgent} ${ip} - Token: ${
        request.headers.authorization || null
      } - Request body: ${JSON.stringify(request.body || {})}`
    );
    response.on("finish", () => {
      const { statusCode } = response;
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      this.logger.log(`
        ${now.valueOf()} finish ${method} ${originalUrl} ${statusCode}
        ${Math.round(responseTime)}ms - ${userAgent} ${ip}
        - Token: ${request.headers.authorization || 'None'}
        - Request body: ${JSON.stringify(request.body || {})}
      `);
    });
    next();
  }
}