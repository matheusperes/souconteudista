import { Route, Routes } from 'react-router-dom';

import { FilteredDisciplinas } from '../pages/FilteredDisciplinas';
import { ListAreas } from '../pages/ListAreas';

export function RouterAreas() {
  return (
    <Routes>
      <Route path="/" element={<ListAreas />} />
      <Route path="/:id" element={<FilteredDisciplinas />} />
    </Routes>
  );
}
