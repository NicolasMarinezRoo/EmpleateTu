import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function validationMiddleware(req: Request, res: Response, next: NextFunction): any {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array()})
    }
    next()
}