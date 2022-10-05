import { Route, Routes } from 'react-router-dom';

import { ListInstituicoes } from '../pages/ListInstituicoes';

export function RouterInstituicao() {
  return (
    <Routes>
      <Route path="/" element={<ListInstituicoes />} />
    </Routes>
  );
}
