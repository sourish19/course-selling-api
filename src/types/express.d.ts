import type USER from './auth';

declare global {
  namespace Express {
    export interface Request {
      user: USER;
    }
  }
}
