import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfProtectionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin || req.headers.referer;
    const allowedOrigin = process.env.ALLOWED_ORIGIN; 
    
    if (!origin || origin !== allowedOrigin) {
      throw new ForbiddenException('CSRF protection: Request from an unauthorized origin');
    }
    next();
  }
}
