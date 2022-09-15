import { Route, Routes } from 'react-router-dom';

import { ListObras } from '../pages/ListObras';

export function RouterObras() {
  return (
    <Routes>
      <Route path="/" element={<ListObras />} />
    </Routes>
  );
}
