import numeral from 'numeral';

/**
 * Formats a number or string into a specified format.
 *
 * @param value - The number or string to format. If undefined, it defaults to "0".
 * @param format - The format pattern to apply. Defaults to "0,0.[00]" example: 10000.229323 -> 10,000.23.
 * @returns The formatted number as a string http://numeraljs.com/.
 */
export const formatNumber = (value: number | string | undefined, format = '0,0.[00]') => {
    if (!value) return '0';
    return numeral(value).format(format);
};
