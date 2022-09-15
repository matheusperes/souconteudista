import { Route, Routes } from 'react-router-dom';

import { ListAutores } from '../pages/ListAutores';

export function RouterAutores() {
  return (
    <Routes>
      <Route path="/" element={<ListAutores />} />
    </Routes>
  );
}
