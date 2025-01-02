import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

export const YYYYMMDD_JP = 'YYYY年MM月DD日';
export const YYYYMMDD = 'YYYY/MM/DD';
export const DDMM = 'DD/MM';

export const changeLocale = (locale: string): void => {
    dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * Formats a given date into a specified string format.
 *
 * @param {Date | string | number} date - The date to format. Can be a Date object, a string, or a number.
 * @param {string} [defaultFormat=YYYYMMDD] - The format string to use for formatting the date. Defaults to 'YYYY/MM/DD'.
 * @returns {string} The formatted date string. Returns an empty string if the date is invalid.
 */
export const formatDate = (date: Date | string | number, defaultFormat = YYYYMMDD) => {
    if (!date) return '';
    return `${dayjs(date).format(defaultFormat)}`;
};
