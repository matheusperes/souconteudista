import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { StyledTableContainer } from './styles';

type MyTWithId = { id: string; [key: string]: any };

export type Col<T extends MyTWithId> = {
  name: string;
  propriedadeName?: string;
  personalizarCol?: (item: T) => JSX.Element | string | string[];
};

type StyledTableProps<T extends MyTWithId> = {
  conteudo: T[];
  navegationLine?: (item: T) => void;
  colunas: Col<T>[];
};

/**
 * Não aceita mais de um nivel do response
 */
export function StyledTable<T extends MyTWithId>({
  conteudo,
  navegationLine,
  colunas,
}: StyledTableProps<T>) {
  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {colunas.map((coluna) => (
              <TableCell key={coluna.name}>{coluna.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{}}>
          {conteudo.map((item) => (
            <TableRow
              key={item.id}
              onClick={() => (navegationLine ? navegationLine(item) : undefined)}
              sx={{ cursor: navegationLine ? 'pointer' : undefined }}
            >
              {colunas.map((coluna) => {
                if (coluna.propriedadeName) {
                  return <TableCell key={coluna.name}>{item[coluna.propriedadeName]}</TableCell>;
                }
                if (coluna.personalizarCol) {
                  return <TableCell key={coluna.name}>{coluna.personalizarCol(item)}</TableCell>;
                }

                return <TableCell>informação não encontrada</TableCell>;
              })}
              {/* <TableCell>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  <IconButton
                    color="primary"
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        await api.delete(`/disciplinas/${disciplina.id}`);

                        setDisciplinas(
                          disciplinas.filter((disciplinas2) => disciplina.id !== disciplinas2.id),
                        );
                      } catch {
                        alert('Você não pode excluir uma disciplina com versões cadastradas');
                      }
                    }}
                  >
                    <Delete fontSize="small" sx={{ color: '#020560' }} />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();

                      setOpenUpdate(disciplina.id);
                    }}
                  >
                    <Edit fontSize="small" sx={{ color: '#020560' }} />
                  </IconButton>
                </ButtonGroup>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
