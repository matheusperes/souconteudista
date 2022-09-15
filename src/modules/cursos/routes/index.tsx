import { Route, Routes } from 'react-router-dom';

import { FilteredCompetencia } from '#modules/competencias/pages/FilteredCompetencia';
import { FilteredPerfil } from '#modules/perfis/pages/FilteredPerfil';
import { InfoPpcs } from '#modules/ppcs/pages/ListPpcInfo';
import { PPC } from '#modules/ppcs/pages/ListPpcsCurso';

import { ListCursos } from '../pages/ListCursos';

export function RouterCurso() {
  return (
    <Routes>
      <Route path="/" element={<ListCursos />} />
      <Route path="/:curso_id/ppcs" element={<PPC />} />
      <Route path="/:curso_id/ppcs/:id" element={<InfoPpcs />} />
      <Route path="/:curso_id/ppcs/:ppc_id/competencia/:id" element={<FilteredCompetencia />} />
      <Route path="/:curso_id/ppcs/:ppc_id/perfil/:id" element={<FilteredPerfil />} />
    </Routes>
  );
}
