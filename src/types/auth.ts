import { Role } from '../config/auth-constants';

export default interface User {
  id: string;
  email: string;
  role: Role;
}
