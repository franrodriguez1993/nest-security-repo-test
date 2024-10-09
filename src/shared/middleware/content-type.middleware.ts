import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


/** FOR REQUEST **/

@Injectable()
export class ApplicationJSONMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type'];

    if (contentType !== 'application/json') {
      throw new BadRequestException('Invalid Content-Type.');
    }

    next();
  }
}

@Injectable()
export class MultiPartFormDataMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type'];

    if (contentType !== 'multipart/form-data') {
      throw new BadRequestException('Invalid Content-Type.');
    }

    next();
  }
}


/**  FOR RESPONSE  **/


@Injectable()
export class XContentTypeOptionsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Evitar que el navegador haga MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  }
}
