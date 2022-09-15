import { Route, Routes } from 'react-router-dom';

import { ListVersoes } from '../pages/ListVersoes';

export function RouterVersoes() {
  return (
    <Routes>
      <Route path="/" element={<ListVersoes />} />
    </Routes>
  );
}
