import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, ReactElement, useCallback, useContext, useMemo, useState } from 'react';

type LoadingContextData = {
  startLoading: () => void;
  stopLoading: () => void;
};

type LoadingProviderProps = {
  children: ReactElement;
};

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [open, setOpen] = useState(false);

  const startLoading = useCallback(() => {
    setOpen(true);
  }, []);

  const stopLoading = useCallback(() => {
    setOpen(false);
  }, []);

  const loadingContextData = useMemo<LoadingContextData>(() => {
    return { startLoading, stopLoading };
  }, [startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={loadingContextData}>
      {children}

      <Backdrop sx={{ color: '#fff', zIndex: 10000 }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('não pode usar o useLoading fora do loadProvider');
  }
  return context;
}
