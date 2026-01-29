import { useRef, useCallback, useMemo, createElement, createRef, memo, forwardRef, useImperativeHandle, Fragment, RefObject } from 'react';
import usePatchElement from './usePatchElement';
import Modal from './Modal';
import { withInfo, withSuccess, withError, withWarn, withConfirm } from './modalConfig';

interface ModalInstance {
  destroy: () => void;
  update: (config: ModalConfig) => void;
}

interface ModalConfig {
  title?: string;
  content?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  [key: string]: unknown;
}

type ModalConfigFactory = (args: unknown) => ModalConfig;

interface ModalMethods {
  info: (args: unknown) => ModalInstance;
  success: (args: unknown) => ModalInstance;
  error: (args: unknown) => ModalInstance;
  warning: (args: unknown) => ModalInstance;
  confirm: (args: unknown) => ModalInstance;
}

interface ModalRef {
  current: {
    destroy: () => void;
    update: (config: ModalConfig) => void;
  } | null;
}

interface HolderRef {
  patchElement: (element: React.ReactElement) => (() => void) | undefined;
}

let modalCounter = 0;

const HolderComponent = memo(
  forwardRef<HolderRef>((_, ref) => {
    const [elements, patchElement] = usePatchElement();

    useImperativeHandle(
      ref,
      () => ({
        patchElement,
      }),
      []
    );

    return createElement(Fragment, null, elements);
  })
);

export default function useModal(): [ModalMethods, React.ReactElement] {
  const holderRef = useRef<HolderRef>(null);

  const createModalMethod = useCallback(
    (configFactory: ModalConfigFactory) => {
      return (args: unknown): ModalInstance => {
        modalCounter += 1;

        const modalRef: RefObject<ModalRef['current']> = createRef();
        let removePatch: (() => void) | undefined;

        const modalElement = createElement(Modal, {
          key: `modal-${modalCounter}`,
          config: configFactory(args),
          ref: modalRef,
          afterClose: () => {
            removePatch?.();
          },
        });

        removePatch = holderRef.current?.patchElement(modalElement);

        return {
          destroy: () => {
            modalRef.current?.destroy();
          },
          update: (config: ModalConfig) => {
            modalRef.current?.update(config);
          },
        };
      };
    },
    []
  );

  const modalMethods = useMemo<ModalMethods>(
    () => ({
      info: createModalMethod(withInfo),
      success: createModalMethod(withSuccess),
      error: createModalMethod(withError),
      warning: createModalMethod(withWarn),
      confirm: createModalMethod(withConfirm),
    }),
    [createModalMethod]
  );

  const holderElement = createElement(HolderComponent, {
    ref: holderRef,
  });

  return [modalMethods, holderElement];
}