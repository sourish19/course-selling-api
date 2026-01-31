import type { User } from '../generated/prisma/client';

const sanatizeUser = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

export default sanatizeUser;
