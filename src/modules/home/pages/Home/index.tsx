import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

import { useTitle } from '#shared/hooks/title';

export function Home() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle('Home');
  }, [setTitle]);

  return (
    <Box className="Pagina">
      <Box sx={{ mt: '1rem', padding: '1.5rem', width: '100%' }}>
        <Typography>Seja Bem-Vindo!</Typography>
      </Box>
    </Box>
  );
}
