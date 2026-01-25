import type { CookieOptions } from 'express';

import { ENV } from './env';

const cookie_Options: CookieOptions = {
  sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: ENV.NODE_ENV === 'production',
  httpOnly: true,
  path: '/',
  maxAge: 15 * 24 * 60 * 60 * 1000, // 15d
};

export default cookie_Options;
