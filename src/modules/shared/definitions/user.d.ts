import { User } from './user.definition'
declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
}
