import { z } from 'zod';

export const CardSchema = z.string().min(16).max(19).regex(/^\d+$/, {
  message: 'Card must contain only digits',
});
