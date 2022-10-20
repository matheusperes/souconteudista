import { Route, Routes } from 'react-router-dom';

import { FilteredAutor } from '../pages/FilteredAutor';
import { ListAutores } from '../pages/ListAutores';

export function RouterAutores() {
  return (
    <Routes>
      <Route path="/" element={<ListAutores />} />
      <Route path="/:id" element={<FilteredAutor />} />
    </Routes>
  );
}
