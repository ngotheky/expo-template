import * as React from 'react';
import RootSiblings from 'react-native-root-siblings';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import ModalizeCenterComponent from './ModalizeCenterComponent';
import { Themes } from '@/assets/themes';
import { wait } from '@/utils/helper';

let modalControl: any[] = [];

interface CustomModalizeProps extends ModalizeProps {
    isCenter?: boolean;
    className?: string;
}

const ModalizeManager = () => {
    const modalRef = React.createRef<Modalize>();

    const show = (id: string | number, element: any, props: CustomModalizeProps) => {
        if (!modalControl.find(e => e.id === id)) {
            const sibling = new RootSiblings(
                (
                    <Modalize
                        ref={modalRef}
                        onClosed={() => dismiss(id)}
                        withHandle={false}
                        scrollViewProps={{
                            scrollEnabled: false,
                            keyboardShouldPersistTaps: 'handled',
                        }}
                        {...props}
                        modalStyle={{
                            minHeight: props?.isCenter ? '100%' : 0,
                            backgroundColor: props?.isCenter ? 'transparent' : Themes.COLORS.white,
                        }}
                    >
                        {props?.isCenter ? (
                            <ModalizeCenterComponent className={props?.className} handleDismiss={() => dismiss(id)}>
                                {element}
                            </ModalizeCenterComponent>
                        ) : (
                            element
                        )}
                    </Modalize>
                ),
                () => {
                    modalRef?.current?.open();
                    const newRef = { ...modalRef };
                    modalControl.push({
                        id,
                        ref: newRef,
                        element: sibling,
                        props,
                    });
                },
            );
        } else {
            wait(200).then(() => {
                modalRef?.current?.open();
            });
        }
    };

    const dismiss = (id: any) => {
        const item = modalControl.find(e => e.id === id);
        if (item) {
            const { ref, element } = item;
            ref?.current?.close();
            // destroy id
            const arrFilter = modalControl.filter(e => e.id !== id);
            modalControl = [...arrFilter];
            wait(200).then(() => {
                element?.destroy();
            });
        }
    };

    const update = (id: any, component: any, props: any) => {
        const item = modalControl.find(e => e.id === id);
        if (item && item.element) {
            item.element.update(
                <Modalize ref={modalRef} onClosed={() => dismiss(id)} withHandle={false} {...item.props} {...props}>
                    {component}
                </Modalize>,
            );
        }
    };

    const dismissAll = () => {
        modalControl.forEach(item => {
            const { element } = item;
            element?.destroy?.();
        });
        modalControl = [];
    };

    const destroySpecificId = (id: any) => {
        const item = modalControl.find(e => e.id === id);
        if (item) {
            const { element } = item;
            element?.destroy?.();
            // destroy id
            const arrFilter = modalControl.filter(e => e.id !== id);
            modalControl = [...arrFilter];
        }
    };
    return { show, dismissAll, dismiss, update, destroySpecificId };
};

/**
 * ModalizeManager is a component that manages the display and control of modal dialogs using the Modalize library.
 * It provides methods to show, dismiss, update, and destroy modals.
 *
 * @returns {Object} An object containing methods to control modals:
 * - `show(id: string | number, element: any, props: CustomModalizeProps)`: Displays a modal with the given id, element, and properties.
 * - `dismiss(id: any)`: Dismisses the modal with the specified id.
 * - `update(id: any, component: any, props: any)`: Updates the modal with the specified id with a new component and properties.
 * - `dismissAll()`: Dismisses all currently displayed modals.
 * - `destroySpecificId(id: any)`: Destroys the modal with the specified id.
 */

export default ModalizeManager;
