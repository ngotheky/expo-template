import { formatDate, YYYYMMDD } from '../date';
import dayjs from 'dayjs';

describe('formatDate', () => {
    it('should format a Date object to the default format', () => {
        const date = new Date(2023, 9, 5); // October 5, 2023
        const formattedDate = formatDate(date);
        expect(formattedDate).toBe(dayjs(date).format(YYYYMMDD));
    });

    it('should format a date string to the default format', () => {
        const dateString = '2023-10-05';
        const formattedDate = formatDate(dateString);
        expect(formattedDate).toBe(dayjs(dateString).format(YYYYMMDD));
    });

    it('should format a timestamp to the default format', () => {
        const timestamp = 1696483200000; // October 5, 2023
        const formattedDate = formatDate(timestamp);
        expect(formattedDate).toBe(dayjs(timestamp).format(YYYYMMDD));
    });

    it('should return an empty string for an invalid date', () => {
        const invalidDate = '';
        const formattedDate = formatDate(invalidDate);
        expect(formattedDate).toBe('');
    });

    it('should format a date to a specified format', () => {
        const date = new Date(2023, 9, 5); // October 5, 2023
        const customFormat = 'YYYY年MM月DD日';
        const formattedDate = formatDate(date, customFormat);
        expect(formattedDate).toBe(dayjs(date).format(customFormat));
    });
});
