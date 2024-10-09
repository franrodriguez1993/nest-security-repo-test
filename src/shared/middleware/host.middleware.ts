import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class HostMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let host = ""
    const hHost = req.headers['host'];
    const xHost = req.headers['x-forwarded-host'] // si tengo un proxy o PM2.
    hHost && (host = hHost);
    xHost && (host = xHost);

    // Definir los hosts permitidos
    const allowedHost = process.env.ALLOWED_HOST.split(",")
    
    // Verificar si el host coincide con el esperado

    if (host && allowedHost.includes(host)) {
      next(); // Continúa la solicitud si el Host es válido
    } else {
      throw new UnauthorizedException('Invalid Host header');
    }
  }
}
