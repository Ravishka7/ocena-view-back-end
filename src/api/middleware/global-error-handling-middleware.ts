import {Request, Response, NextFunction} from 'express';

const globalErrorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log(error);
    if (error.name === 'ValidationError') {
        return res.status(400).send({
            message: error.message,
        });
    }
    if (error.name === 'NotFoundError') {
        return res.status(404).send({
            message: error.message,
        });
    }
    res.status(500).send();
};

export default globalErrorHandlingMiddleware;