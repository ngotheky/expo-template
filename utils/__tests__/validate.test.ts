import {
    REGEX_EMAIL,
    REGEX_PHONE,
    REGEX_PASSWORD,
    REGEX_KATAKANA,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
} from '../validate';

describe('Validate', () => {
    describe('REGEX_EMAIL', () => {
        it('should validate correct email addresses', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.jp',
                'test+tag@example.org',
                'user_name@sub.domain.com',
                'firstname.lastname@company.com',
                'very.common@example.com',
                'simple@example.com',
            ];

            validEmails.forEach(email => {
                expect(REGEX_EMAIL.test(email)).toBe(true);
            });
        });

        it('should reject invalid email addresses', () => {
            const invalidEmails = [
                'plainaddress',
                '@missingdomain.com',
                'missing.domain@.com',
                'missing@domain',
                'spaces in@email.com',
                'email@',
                '@domain.com',
                'email@domain',
                'email..double.dot@example.com',
                'email@domain..com',
            ];

            invalidEmails.forEach(email => {
                expect(REGEX_EMAIL.test(email)).toBe(false);
            });
        });
    });

    describe('REGEX_PHONE', () => {
        it('should validate correct phone numbers', () => {
            const validPhones = [
                '123-456-7890',
                '(123) 456-7890',
                '123.456.7890',
                '123 456 7890',
                '1234567890',
                '+1 123 456 7890',
                '+81-123-456-7890',
                '+1-123-456-7890',
                '(123)456-7890',
            ];

            validPhones.forEach(phone => {
                expect(REGEX_PHONE.test(phone)).toBe(true);
            });
        });

        it('should reject invalid phone numbers', () => {
            const invalidPhones = [
                '123-45-6789', // Wrong format
                '12-345-6789', // Wrong format
                'abc-def-ghij', // Letters
                '123-456-78901', // Too many digits
                '12-34-567', // Too few digits
                '++1-123-456-7890', // Double plus
                '',
            ];

            invalidPhones.forEach(phone => {
                expect(REGEX_PHONE.test(phone)).toBe(false);
            });
        });
    });

    describe('REGEX_PASSWORD', () => {
        it('should validate passwords with alphanumeric characters', () => {
            const validPasswords = ['password123', 'PASSWORD', '123456789', 'AbC123', 'myPassword2023', 'TestUser123'];

            validPasswords.forEach(password => {
                expect(REGEX_PASSWORD.test(password)).toBe(true);
            });
        });

        it('should reject passwords with special characters', () => {
            const invalidPasswords = [
                'password!',
                'password@123',
                'test#password',
                'user$name',
                'pass%word',
                'test password', // Space
                'password-123', // Hyphen
                'password_123', // Underscore
                '',
            ];

            invalidPasswords.forEach(password => {
                expect(REGEX_PASSWORD.test(password)).toBe(false);
            });
        });
    });

    describe('REGEX_KATAKANA', () => {
        it('should validate katakana characters', () => {
            const validKatakana = [
                'アイウエオ',
                'カキクケコ',
                'サシスセソ',
                'タチツテト',
                'ナニヌネノ',
                'ハヒフヘホ',
                'マミムメモ',
                'ヤユヨ',
                'ラリルレロ',
                'ワヲン',
                'ガギグゲゴ',
                'ザジズゼゾ',
                'ダヂヅデド',
                'バビブベボ',
                'パピプペポ',
                'ァィゥェォ',
                'ッャュョ',
                'ヴ々',
            ];

            validKatakana.forEach(katakana => {
                expect(REGEX_KATAKANA.test(katakana)).toBe(true);
            });
        });

        it('should reject non-katakana characters', () => {
            const invalidKatakana = [
                'ひらがな', // Hiragana
                'English',
                '漢字', // Kanji
                '123',
                'アルファベットA',
                'カタカナ123',
                'test テスト',
                '',
            ];

            invalidKatakana.forEach(text => {
                expect(REGEX_KATAKANA.test(text)).toBe(false);
            });
        });
    });

    describe('Length Constants', () => {
        it('should have correct username length constraints', () => {
            expect(USERNAME_MIN_LENGTH).toBe(5);
            expect(USERNAME_MAX_LENGTH).toBe(8);
            expect(USERNAME_MIN_LENGTH).toBeLessThan(USERNAME_MAX_LENGTH);
        });

        it('should have correct password length constraints', () => {
            expect(PASSWORD_MIN_LENGTH).toBe(8);
            expect(PASSWORD_MAX_LENGTH).toBe(17);
            expect(PASSWORD_MIN_LENGTH).toBeLessThan(PASSWORD_MAX_LENGTH);
        });

        it('should have reasonable validation lengths', () => {
            expect(USERNAME_MIN_LENGTH).toBeGreaterThan(0);
            expect(USERNAME_MAX_LENGTH).toBeGreaterThan(0);
            expect(PASSWORD_MIN_LENGTH).toBeGreaterThan(0);
            expect(PASSWORD_MAX_LENGTH).toBeGreaterThan(0);

            // Ensure password is longer than username (common requirement)
            expect(PASSWORD_MIN_LENGTH).toBeGreaterThanOrEqual(USERNAME_MIN_LENGTH);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty strings', () => {
            expect(REGEX_EMAIL.test('')).toBe(false);
            expect(REGEX_PHONE.test('')).toBe(false);
            expect(REGEX_PASSWORD.test('')).toBe(false);
            expect(REGEX_KATAKANA.test('')).toBe(false);
        });

        it('should handle null and undefined inputs gracefully', () => {
            // Note: regex.test() converts null/undefined to string
            expect(REGEX_EMAIL.test(null as any)).toBe(false);
            expect(REGEX_EMAIL.test(undefined as any)).toBe(false);
            expect(REGEX_PHONE.test(null as any)).toBe(false);
            expect(REGEX_PHONE.test(undefined as any)).toBe(false);
        });

        it('should handle very long strings', () => {
            const longString = 'a'.repeat(1000);
            // Should not crash, though might not match
            expect(() => REGEX_EMAIL.test(longString)).not.toThrow();
            expect(() => REGEX_PHONE.test(longString)).not.toThrow();
            expect(() => REGEX_PASSWORD.test(longString)).not.toThrow();
            expect(() => REGEX_KATAKANA.test(longString)).not.toThrow();
        });
    });
});
