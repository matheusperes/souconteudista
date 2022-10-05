import { ReactElement } from 'react';

import { InstitutionProvider } from './institution';
import { LoadingProvider } from './loading';
import { TitleProvider } from './title';
import { ToastProvider } from './toast';

type AppProviderProps = {
  children: ReactElement;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ToastProvider>
      <LoadingProvider>
        <TitleProvider>
          <InstitutionProvider>{children}</InstitutionProvider>
        </TitleProvider>
      </LoadingProvider>
    </ToastProvider>
  );
}
