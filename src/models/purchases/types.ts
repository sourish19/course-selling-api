import type { Purchase } from '../../generated/prisma/client';

export type updatePurchaseDetails = Pick<Purchase, 'courseId'>;
