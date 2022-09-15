import { Snackbar, Alert, AlertColor } from '@mui/material';
import { createContext, ReactElement, useCallback, useContext, useMemo, useState } from 'react';

type MessageProps = {
  mensagem: string;
  tipo: AlertColor;
};

type ToastContextData = {
  message: (data: MessageProps) => void;
};

type ToastProviderProps = {
  children: ReactElement;
};

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<AlertColor>('error');

  const toast = useCallback(({ mensagem, tipo }: MessageProps) => {
    setMessage(mensagem);
    setType(tipo);
    setOpen(true);
  }, []);

  const toastContextData = useMemo(() => {
    return { message: toast };
  }, [toast]);

  return (
    <ToastContext.Provider value={toastContextData}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('não pode usar o useToast fora do titleProvider');
  }
  return context;
}
