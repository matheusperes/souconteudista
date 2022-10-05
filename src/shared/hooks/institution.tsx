import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { InstituicaoModal } from '#shared/components/Modal/InstituicaoModal';
import { api } from '#shared/services/axios';

import { useLoading } from './loading';
import { useToast } from './toast';

type InstitutionProviderProps = {
  children: ReactElement;
};
type Institution = { name: string; id: string };

type InstitutionContextData = {
  instituicao: Institution | null;
  updateInstitution: (inst: Institution) => void;
};

type ApiInstituicao = Institution | null;

const InstitutionContext = createContext<InstitutionContextData>({} as InstitutionContextData);

export function InstitutionProvider({ children }: InstitutionProviderProps) {
  const { startLoading, stopLoading } = useLoading();
  const { message } = useToast();

  const [openCreate, setOpenCreate] = useState(false);
  const [instituicao, setInstituicao] = useState<Institution | null>(null);

  const getInstituicao = useCallback(async () => {
    startLoading();
    try {
      const response = await api.get<ApiInstituicao>('/instituicoes/default/');

      if (response.data) {
        setInstituicao(response.data);
      } else {
        setOpenCreate(true);
      }
    } catch (error: any) {
      message({ mensagem: error.response.data || 'Erro interno do servidor', tipo: 'error' });
    } finally {
      stopLoading();
    }
  }, [message, startLoading, stopLoading]);

  useEffect(() => {
    const instituicaoLS = localStorage.getItem('@MycomParator:instituicao');
    if (instituicaoLS) {
      const objectInstitution = JSON.parse(instituicaoLS);
      setInstituicao(objectInstitution);
    } else {
      getInstituicao();
    }
  }, [getInstituicao]);

  const updateInstitution = useCallback((inst: Institution) => {
    localStorage.setItem('@MycomParator:instituicao', JSON.stringify(inst));
    setInstituicao(inst);
  }, []);

  const titleContextData = useMemo(() => {
    return { instituicao, updateInstitution };
  }, [instituicao, updateInstitution]);

  return (
    <InstitutionContext.Provider value={titleContextData}>
      <>
        <InstituicaoModal
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          updateDefaultInstituicao={(intituicao) => updateInstitution(intituicao)}
        />
        {children}
      </>
    </InstitutionContext.Provider>
  );
}

export function useInstitution() {
  const context = useContext(InstitutionContext);

  if (!context) {
    throw new Error('não pode usar o useInstitution fora do titleProvider');
  }
  return context;
}
