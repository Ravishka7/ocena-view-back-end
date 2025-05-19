import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../../domain/errors/forbidden-error";


export const isAutherized = (req: Request, res: Response, next: NextFunction) => {
    if (!req?.auth.userId) {
        throw new ForbiddenError ("Forbidden");
    }
    next();
}