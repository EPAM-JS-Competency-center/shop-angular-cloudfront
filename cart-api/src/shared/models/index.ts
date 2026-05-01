import { Request } from 'express';

import { User } from '../../users';

export interface AppRequest extends Request {
  user?: User;
}
