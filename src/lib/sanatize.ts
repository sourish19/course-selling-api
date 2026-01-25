import type { User } from '../generated/prisma/client';

const sanatize_User = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

export default sanatize_User;
