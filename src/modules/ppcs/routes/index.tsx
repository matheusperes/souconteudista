import { Route, Routes } from 'react-router-dom';

import { InfoPpcs } from '../pages/ListPpcInfo';
import { PPC } from '../pages/ListPpcsCurso';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<PPC />} />
      <Route path="/:id" element={<InfoPpcs />} />
    </Routes>
  );
}
