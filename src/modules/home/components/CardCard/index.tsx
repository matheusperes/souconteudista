import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

import { CardContent, CardStyled, BoxBruna } from './styles';

type ICardCard = {
  card: {
    id: string;
    name: string;
    cor: string;
    description: string;
    descriptionGreen: string;
    titulo: string;
  };
};

export function CardCard({ card }: ICardCard) {
  return (
    <CardStyled sx={{ backgroundColor: card.cor, borderColor: card.cor }}>
      <BoxBruna>
        <CardContent>
          <Box sx={{ marginLeft: 'auto', mt: '0.5rem', mr: '10px' }}>
            <Typography sx={{ color: '#35353F' }}>{card.titulo}</Typography>
          </Box>
          <Box sx={{ flex: 1, padding: '13px' }}>
            <Typography gutterBottom variant="h5" component="h3">
              {card.name}
            </Typography>

            <Typography component="span">{card.description}</Typography>

            <Typography sx={{ mt: '0.5rem', fontWeight: 'bold', color: 'green' }}>
              {card.descriptionGreen}
            </Typography>
          </Box>
        </CardContent>
      </BoxBruna>
    </CardStyled>
  );
}
