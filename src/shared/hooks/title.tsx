import { createContext, ReactElement, useCallback, useContext, useMemo, useState } from 'react';

type TitleContextData = {
  setTitle: (title: string) => void;
  title: string;
};

type TitleProviderProps = {
  children: ReactElement;
};

const TitleContext = createContext<TitleContextData>({} as TitleContextData);

export function TitleProvider({ children }: TitleProviderProps) {
  const [title, setTitle] = useState('');

  const updateTitle = useCallback((newTitle: string) => {
    document.title = `DiffGenius ${newTitle}`;
    setTitle(newTitle);
  }, []);

  const titleContextData = useMemo(() => {
    return { title, setTitle: updateTitle };
  }, [title, updateTitle]);

  return <TitleContext.Provider value={titleContextData}>{children}</TitleContext.Provider>;
}

export function useTitle() {
  const context = useContext(TitleContext);

  if (!context) {
    throw new Error('não pode usar o useTitle fora do titleProvider');
  }
  return context;
}
