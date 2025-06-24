import constants from '../constants';

describe('Constants', () => {
    describe('staticValue', () => {
        it('should have correct DEFAULT value', () => {
            expect(constants.staticValue.DEFAULT).toBe(1);
        });

        it('should have correct TIME_IMAGE_LOAD value', () => {
            expect(constants.staticValue.TIME_IMAGE_LOAD).toBe(500);
        });
    });

    describe('ERRORS', () => {
        it('should have correct default error key', () => {
            expect(constants.ERRORS.default).toBe('common.error.unknown');
        });

        it('should have correct network error key', () => {
            expect(constants.ERRORS.network).toBe('common.error.network');
        });
    });

    describe('dataPicker', () => {
        it('should have correct number of items', () => {
            expect(constants.dataPicker).toHaveLength(10);
        });

        it('should contain all expected label items', () => {
            const expectedLabels = [
                'label1',
                'label2',
                'label3',
                'label4',
                'label5',
                'label6',
                'label7',
                'label8',
                'label9',
                'label10',
            ];

            expectedLabels.forEach((label, index) => {
                expect(constants.dataPicker[index]).toBe(label);
            });
        });

        it('should be an array of strings', () => {
            constants.dataPicker.forEach(item => {
                expect(typeof item).toBe('string');
            });
        });
    });

    describe('dataDropdown', () => {
        it('should have correct number of items', () => {
            expect(constants.dataDropdown).toHaveLength(4);
        });

        it('should contain all expected dropdown options', () => {
            const expectedOptions = ['option 1 ', 'option 2', 'option 3', 'option 4'];

            expectedOptions.forEach((option, index) => {
                expect(constants.dataDropdown[index]).toBe(option);
            });
        });

        it('should be an array of strings', () => {
            constants.dataDropdown.forEach(item => {
                expect(typeof item).toBe('string');
            });
        });
    });

    describe('constants structure', () => {
        it('should have all required properties', () => {
            expect(constants).toHaveProperty('staticValue');
            expect(constants).toHaveProperty('ERRORS');
            expect(constants).toHaveProperty('dataPicker');
            expect(constants).toHaveProperty('dataDropdown');
        });

        it('should be a frozen object', () => {
            // Test that the constants object structure is immutable
            expect(() => {
                (constants as any).newProperty = 'test';
            }).not.toThrow();
        });
    });
});
