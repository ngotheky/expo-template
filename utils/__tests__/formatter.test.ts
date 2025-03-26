import { formatNumber } from '../formatter';

describe('formatNumber', () => {
    it('should format a number with default format', () => {
        expect(formatNumber(10000.229323)).toBe('10,000.23');
    });

    it('should format a string number with default format', () => {
        expect(formatNumber('10000.229323')).toBe('10,000.23');
    });

    it('should format a number with a custom format', () => {
        expect(formatNumber(10000.229323, '0,0.000')).toBe('10,000.229');
    });

    it('should format a string number with a custom format', () => {
        expect(formatNumber('10000.229323', '0,0.000')).toBe('10,000.229');
    });

    it('should return "0" when value is undefined', () => {
        expect(formatNumber(undefined)).toBe('0');
    });

    it('should return "0" when value is null', () => {
        expect(formatNumber(null as any)).toBe('0');
    });

    it('should return "0" when value is an empty string', () => {
        expect(formatNumber('')).toBe('0');
    });
});
