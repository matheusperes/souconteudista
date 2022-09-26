import { Box, CardActionArea, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import Delete from '#shared/images/Delete.svg';
import Edit from '#shared/images/Edit.svg';

import { CardContent, CardStyled, BoxBruna } from './styles';

type ICursoCard = {
  curso: { id: string; name: string; cor: string; active: string };
  DeleteCurso: (curso_id: string) => void;
  updateCursoModal: (curso_id: string) => void;
};

export function CursoCard({ curso, DeleteCurso, updateCursoModal }: ICursoCard) {
  const navigate = useNavigate();

  return (
    <CardStyled
      sx={{ backgroundColor: curso.cor, borderColor: curso.cor }}
      onClick={() => navigate(`/cursos/${curso.id}/ppcs`)}
    >
      <BoxBruna>
        <CardContent>
          <CardActionArea sx={{ flex: 1, padding: '13px' }}>
            <Typography gutterBottom variant="h5" component="h3">
              {curso.name}
            </Typography>

            <Typography component="span">{curso.active}</Typography>
          </CardActionArea>

          <Box display="flex" justifyContent="flex-end" sx={{ padding: '1px 13px 13px 13px' }}>
            <IconButton
              onClick={async (e) => {
                e.stopPropagation();

                updateCursoModal(curso.id);
              }}
            >
              <img src={Edit} alt="Edit" />
            </IconButton>
            <IconButton
              onClick={async (e) => {
                e.stopPropagation();

                DeleteCurso(curso.id);
              }}
            >
              <img src={Delete} alt="Delete" />
            </IconButton>
          </Box>
        </CardContent>
      </BoxBruna>
    </CardStyled>
  );
}
