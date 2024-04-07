import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class loggerMiddleware implements NestMiddleware{
    use(req: Request, res:Response, next: NextFunction) {
        console.log(`Estas en la ruta ${req.url}`);
        next();
    }
}

export function loggerGlobal(req: Request, res:Response, next: NextFunction) {
    console.log(`Estas en la ruta ${req.url}`)
    next();
}