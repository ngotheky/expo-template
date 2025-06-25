// Mock dependencies
jest.mock('react-native-root-siblings', () => {
    return class RootSiblings {
        constructor(element: any, callback?: () => void) {
            if (callback) callback();
        }
        update() {
            return this;
        }
        destroy() {
            return this;
        }
    };
});

jest.mock('react-native-modalize', () => ({
    Modalize: class {
        open = jest.fn();
        close = jest.fn();
    },
}));

jest.mock('@/utils/helper', () => ({
    wait: jest.fn(() => Promise.resolve()),
}));

jest.mock('../../../base/modal/ModalizeCenterComponent', () => {
    const reactNative = jest.requireActual('react-native');
    return {
        __esModule: true,
        default: ({ children, handleDismiss }: any) => (
            <reactNative.View testID="mock-center-component">{children}</reactNative.View>
        ),
    };
});

import React from 'react';
import ModalizeManager from '../../../base/modal/ModalizeManager';
import { Modalize } from 'react-native-modalize';
import { wait } from '@/utils/helper';
import { View, Text } from 'react-native';

describe('ModalizeManager', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows modal with the given id and element', () => {
        const modalManager = ModalizeManager();
        const mockElement = <Text>Test Element</Text>;
        const mockProps = {};

        modalManager.show('test-modal', mockElement, mockProps);

        // Since we can't directly check state, we can check if dismiss works
        modalManager.dismiss('test-modal');
        expect(wait).toHaveBeenCalledWith(200);
    });

    it('dismisses modal with the given id', () => {
        const modalManager = ModalizeManager();
        const mockElement = <Text>Test Element</Text>;

        modalManager.show('test-modal', mockElement, {});
        modalManager.dismiss('test-modal');

        expect(wait).toHaveBeenCalledWith(200);
    });

    it('dismisses all modals', () => {
        const modalManager = ModalizeManager();

        modalManager.show('modal-1', <Text>Test 1</Text>, {});
        modalManager.show('modal-2', <Text>Test 2</Text>, {});

        modalManager.dismissAll();

        // Try to dismiss again - operations should still work without errors
        modalManager.dismiss('modal-1');
        modalManager.dismiss('modal-2');
    });

    it('destroys specific modal by id', () => {
        const modalManager = ModalizeManager();

        modalManager.show('modal-1', <Text>Test 1</Text>, {});
        modalManager.show('modal-2', <Text>Test 2</Text>, {});

        modalManager.destroySpecificId('modal-1');

        // modal-1 is destroyed, modal-2 should still exist
        modalManager.dismiss('modal-2');
        expect(wait).toHaveBeenCalledWith(200);
    });

    it('updates modal with new component and props', () => {
        const modalManager = ModalizeManager();

        modalManager.show('test-modal', <Text>Initial Content</Text>, {});

        const newComponent = <Text>Updated Content</Text>;
        const newProps = { adjustToContentHeight: true };

        modalManager.update('test-modal', newComponent, newProps);

        // Dismiss to confirm the modal still exists after update
        modalManager.dismiss('test-modal');
        expect(wait).toHaveBeenCalledWith(200);
    });

    it('handles center modal display properly', () => {
        const modalManager = ModalizeManager();
        const mockElement = <Text>Center Modal Content</Text>;

        modalManager.show('center-modal', mockElement, { isCenter: true });

        // Should still be dismissable
        modalManager.dismiss('center-modal');
        expect(wait).toHaveBeenCalledWith(200);
    });

    it('does nothing when trying to dismiss non-existent modal', () => {
        const modalManager = ModalizeManager();

        // Should not throw error
        expect(() => modalManager.dismiss('non-existent-modal')).not.toThrow();

        // wait should not be called for non-existent modals
        expect(wait).not.toHaveBeenCalled();
    });
});
