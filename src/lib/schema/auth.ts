import { z } from 'zod';

import { AuthFormProps } from '@/components/AuthForm';

export const authSchema = (variant: AuthFormProps['variant']) =>
  z.object({
    email: z.string().email(),
    password: z.string().superRefine((val, ctx) => {
      if (variant === 'signin') return z.NEVER;

      const hasUpperCaseAndLowerCase = /[a-z]/.test(val) && /[A-Z]/.test(val);
      const hasNumberOrSymbol = /\d/.test(val) || /[!@#$%^&*]/.test(val);

      if (val.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          message: 'Must be at least 8 characters long',
          minimum: 8,
          inclusive: true,
          type: 'string',
        });
      }

      if (!hasUpperCaseAndLowerCase) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Must contain at least one uppercase and lowercase letter',
        });
      }

      if (!hasNumberOrSymbol) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Must contain at least one number or symbol',
        });
      }
    }),
  });
