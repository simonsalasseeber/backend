import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
export declare class loggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
export declare function loggerGlobal(req: Request, res: Response, next: NextFunction): void;
