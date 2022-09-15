import { Route, Routes } from 'react-router-dom';

import { FilteredVersao } from '#modules/versoes/pages/FilteredVersao';

import { FilteredVersoes } from '../pages/FilteredVersoes';
import { ListDisciplinas } from '../pages/ListDisciplinas';

export function RouterDisciplinas() {
  return (
    <Routes>
      <Route path="/" element={<ListDisciplinas />} />
      <Route path="/:id" element={<FilteredVersoes />} />
      <Route path="/:disciplina_id/versao/:id" element={<FilteredVersao />} />
    </Routes>
  );
}
