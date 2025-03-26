import yupValidate from '../yupValidate';
import i18next from 'i18next';

describe('yupValidate', () => {
    describe('name', () => {
        it('should validate valid name', async () => {
            const validNames = ['abcde', 'abcdefgh', '12345', '12345678'];
            for (const name of validNames) {
                const schema = yupValidate.name();
                const result = await schema.isValid(name);
                expect(result).toBe(true);
            }
        });

        it('should reject invalid name', async () => {
            const invalidNames = ['', 'abcd', 'abcdefghi', 'abc de', ' abc', 'abc '];
            for (const name of invalidNames) {
                const schema = yupValidate.name();
                const result = await schema.isValid(name);
                expect(result).toBe(false);
            }
        });
    });

    describe('email', () => {
        it('should validate valid email', async () => {
            const validEmails = [
                'test@example.com',
                'test.name@example.com',
                'test+name@example.com',
                'test@sub.example.com',
                'test@example.co.uk',
            ];
            for (const email of validEmails) {
                const schema = yupValidate.email();
                const result = await schema.isValid(email);
                expect(result).toBe(true);
            }
        });

        it('should reject invalid email', async () => {
            const invalidEmails = ['', 'test@', '@example.com', 'test@.com', 'test@com.', 'test@example.com.'];
            for (const email of invalidEmails) {
                const schema = yupValidate.email();
                const result = await schema.isValid(email);
                expect(result).toBe(false);
            }
        });
    });

    describe('phone', () => {
        it('should validate valid phone number', async () => {
            const validPhones = ['123-456-7890', '(123) 456-7890', '123.456.7890', '1234567890'];
            for (const phone of validPhones) {
                const schema = yupValidate.phone();
                const result = await schema.isValid(phone);
                expect(result).toBe(true);
            }
        });

        it('should reject invalid phone number', async () => {
            const invalidPhones = ['', '123', '123-456', 'abc-123-4567'];
            for (const phone of invalidPhones) {
                const schema = yupValidate.phone();
                const result = await schema.isValid(phone);
                expect(result).toBe(false);
            }
        });
    });

    describe('password', () => {
        it('should validate valid password', async () => {
            const validPasswords = ['password123', 'Password123', '12345678', 'abcdefgh'];
            for (const password of validPasswords) {
                const schema = yupValidate.password();
                const result = await schema.isValid(password);
                expect(result).toBe(true);
            }
        });

        it('should reject invalid password', async () => {
            const invalidPasswords = ['', 'pass', 'password123!', 'password 123', 'password123password123'];
            for (const password of invalidPasswords) {
                const schema = yupValidate.password();
                const result = await schema.isValid(password);
                expect(result).toBe(false);
            }
        });

        it('should validate password confirmation', async () => {
            const schema = yupValidate.password('password');
            const result = await schema.isValid('password123');
            expect(result).toBe(true);
        });

        it('should reject password confirmation mismatch', async () => {
            const schema = yupValidate.password('password');
            const result = await schema.isValid('different123');
            expect(result).toBe(false);
        });

        it('should validate new password is different from current', async () => {
            const schema = yupValidate.password('currentPassword', false);
            const result = await schema.isValid('newPassword123');
            expect(result).toBe(true);
        });

        it('should reject new password same as current', async () => {
            const schema = yupValidate.password('currentPassword', false);
            const result = await schema.isValid('currentPassword');
            expect(result).toBe(false);
        });
    });

    describe('birthday', () => {
        it('should validate birthday', async () => {
            const schema = yupValidate.birthday();
            const result = await schema.isValid('1990-01-01');
            expect(result).toBe(true);
        });

        it('should reject empty birthday', async () => {
            const schema = yupValidate.birthday();
            const result = await schema.isValid('');
            expect(result).toBe(false);
        });
    });

    describe('labelPicker', () => {
        it('should validate labelPicker', async () => {
            const schema = yupValidate.labelPicker();
            const result = await schema.isValid('selected');
            expect(result).toBe(true);
        });

        it('should reject empty labelPicker', async () => {
            const schema = yupValidate.labelPicker();
            const result = await schema.isValid('');
            expect(result).toBe(false);
        });
    });

    describe('policy', () => {
        it('should validate policy', async () => {
            const schema = yupValidate.policy();
            const result = await schema.isValid('accepted');
            expect(result).toBe(true);
        });

        it('should reject empty policy', async () => {
            const schema = yupValidate.policy();
            const result = await schema.isValid('');
            expect(result).toBe(false);
        });
    });

    describe('postalCode', () => {
        it('should validate postalCode', async () => {
            const schema = yupValidate.postalCode();
            const result = await schema.isValid('12345');
            expect(result).toBe(true);
        });

        it('should reject empty postalCode', async () => {
            const schema = yupValidate.postalCode();
            const result = await schema.isValid('');
            expect(result).toBe(false);
        });
    });

    describe('fax', () => {
        it('should validate valid fax number', async () => {
            const validFaxNumbers = [
                '+1-234-567-8900',
                '+81-3-1234-5678',
                '+44-20-7123-4567',
                '123-456-7890',
                '1234567890',
                '+1 234 567 8900',
                '+81 3 1234 5678',
                '+44 20 7123 4567',
                '123 456 7890',
                '+1.234.567.8900',
                '+81.3.1234.5678',
                '+44.20.7123.4567',
                '123.456.7890',
            ];

            for (const fax of validFaxNumbers) {
                const schema = yupValidate.fax();
                const result = await schema.isValid(fax);
                expect(result).toBe(true);
            }
        });

        it('should reject invalid fax number', async () => {
            const invalidFaxNumbers = [
                '',
                'abc',
                '123',
                '123-456',
                '123-456-789',
                '+1-234-567',
                '+1-234-567-89',
                '+1-234-567-89000',
                '123-abc-7890',
                '+1-234-567-abc',
            ];

            for (const fax of invalidFaxNumbers) {
                const schema = yupValidate.fax();
                const result = await schema.isValid(fax);
                expect(result).toBe(false);
            }
        });
    });
});
