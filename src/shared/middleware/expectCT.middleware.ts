import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExpectCTMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set the Expect-CT header with enforcement and a max-age of 30 days (2592000 seconds)
    res.setHeader(
      'Expect-CT',
      'enforce, max-age=2592000'
    );
    next(); // Continue to the next middleware/route handler
  }
}

//'enforce, max-age=2592000, report-uri="https://your-report-uri.com/report"'