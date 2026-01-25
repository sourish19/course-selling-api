import { Role } from '../config/auth-constants';

export default interface USER {
  id: string;
  email: string;
  role: Role;
}
