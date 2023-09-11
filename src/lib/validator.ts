import { ZodString, z } from 'zod';

export const EmailValidator = z
    .string({ required_error: 'Email is required' })
    .trim()
    .email({ message: 'Invalid email ID' })
    .toLowerCase();

function generatePasswordValidator(fieldName: string = 'Password'): ZodString {
    return z
        .string({ required_error: `${fieldName} is required` })
        .trim()
        .min(6, { message: `${fieldName} should contain at least 6 character` })
        .max(25, { message: `${fieldName} should contain no more than 25 characters` });
}

// Login | Create new superuser valdidator
export const AdminCredentials = z
    .object({
        email: EmailValidator,
        password: generatePasswordValidator()
    })
    .strict({ message: 'Credentials required' });

export const PasswordUpdationCredentials = z
    .object({
        newPassword: generatePasswordValidator('New password'),
        confirmPassword: generatePasswordValidator('Confirm password')
    })
    .strict()
    .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
        message: "Passwords don't match"
    });
