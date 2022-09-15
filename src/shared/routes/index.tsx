import { Route, Routes } from 'react-router-dom';

import { RouterAreas } from '#modules/areas/routes';
import { RouterArquetipos } from '#modules/arquetipos/routes';
import { RouterAutores } from '#modules/autores/routes';
import { RouterCurso } from '#modules/cursos/routes';
import { RouterDisciplinas } from '#modules/disciplinas/routes';
import { RouterHome } from '#modules/home/routes';
import { RouterObras } from '#modules/obras/routes';
import { RouterVersoes } from '#modules/versoes/routes';

export function Router() {
  return (
    <Routes>
      <Route path="/*" element={<RouterHome />} />
      <Route path="/cursos/*" element={<RouterCurso />} />
      <Route path="/disciplinas/*" element={<RouterDisciplinas />} />
      <Route path="/areas/*" element={<RouterAreas />} />
      <Route path="/versoes/*" element={<RouterVersoes />} />
      <Route path="/autores/*" element={<RouterAutores />} />
      <Route path="/obras/*" element={<RouterObras />} />
      <Route path="/pedidos/*" element={<RouterArquetipos />} />
    </Routes>
  );
}
