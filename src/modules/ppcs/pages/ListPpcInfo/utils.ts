import { InfoPpcs } from '.';

type DisciplimaModulo = {
  id: string;
  name: string;
  creditos: number;
};

type Modulo = {
  modulo: number;
  disciplinas: DisciplimaModulo[];
};

type Semestre = {
  semestre: number;
  modulos: Modulo[];
};

export function getSemestres(ppc: InfoPpcs) {
  const semestres: Semestre[] = [];
  for (let semestre = 1; semestre <= ppc.quantSemestres; semestre += 1) {
    const numeroModulo = [semestre * 2 - 1, semestre * 2];

    const modulos = numeroModulo.map<Modulo>((modulo) => {
      const disciplinas = ppc.ppcDisciplinaVersoes.filter((versao) => {
        if (versao.modulo === modulo) {
          return true;
        }
        return false;
      });

      return {
        disciplinas: disciplinas.map<DisciplimaModulo>((disciplina) => {
          return {
            id: disciplina.id,
            name: disciplina.disciplinaVersao?.disciplina_versao_nome,
            creditos: disciplina.disciplinaVersao?.credito_quantidade,
          };
        }),
        modulo,
      };
    });

    semestres.push({
      semestre,
      modulos,
    });
  }
  return semestres;
}
