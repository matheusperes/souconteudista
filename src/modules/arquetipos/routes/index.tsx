import { Route, Routes } from 'react-router-dom';

import { ListArquetipos } from '../pages/ListArquetipos';

export function RouterArquetipos() {
  return (
    <Routes>
      <Route path="/" element={<ListArquetipos />} />
    </Routes>
  );
}
