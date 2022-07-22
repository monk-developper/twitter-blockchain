import { useDisclosure } from '@chakra-ui/react';
import React from 'react';

type Context = {
  isWalletModal: boolean;
  handleOpenWalletModal: () => void;
  handleCloseWalletModal: () => void;

  isLogoutModal: boolean;
  handleOpenLogoutModal: () => void;
  handleCloseLogoutModal: () => void;

  isInputModal: boolean;
  handleOpenInputModal: () => void;
  handleCloseInputModal: () => void;
};

function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

const [useLayoutContext, SetUseLayoutContext] = createCtx<Context>();

const LayoutContextProvider = ({ children }: { children: React.ReactNode }) => {
  const ctx = useCtxMain();
  return <SetUseLayoutContext value={ctx}>{children}</SetUseLayoutContext>;
};

const useCtxMain = (): Context => {
  const {
    isOpen: isWalletModal,
    onOpen: handleOpenWalletModal,
    onClose: handleCloseWalletModal,
  } = useDisclosure();

  const {
    isOpen: isLogoutModal,
    onOpen: handleOpenLogoutModal,
    onClose: handleCloseLogoutModal,
  } = useDisclosure();

  const {
    isOpen: isInputModal,
    onOpen: handleOpenInputModal,
    onClose: handleCloseInputModal,
  } = useDisclosure();

  return {
    isWalletModal,
    handleOpenWalletModal,
    handleCloseWalletModal,

    isLogoutModal,
    handleOpenLogoutModal,
    handleCloseLogoutModal,

    isInputModal,
    handleOpenInputModal,
    handleCloseInputModal,
  };
};

// export const useLayoutContext = () => React.useContext(LayoutContext);

export { LayoutContextProvider, useLayoutContext };