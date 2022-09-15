import { ReactElement } from 'react';

import { TitleProvider } from './title';
import { ToastProvider } from './toast';

type AppProviderProps = {
  children: ReactElement;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ToastProvider>
      <TitleProvider>{children}</TitleProvider>
    </ToastProvider>
  );
}
