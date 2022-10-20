import { styled, TableContainer } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)`
  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    background: #e5e5e5;
    border-collapse: separate;
    min-width: 650px;
    tr {
      box-shadow: none;
    }

    th {
      color: #000;
      font-weight: 400;
      padding: 1rem 2rem;
      line-height: 1.5rem;
      text-align: center;

      &:first-of-type {
        text-align: left;
      }
    }

    td {
      border: 0;
      background: #f4f4f4;
      color: #000;
      box-shadow: 0px 5px rgba(164, 163, 163, 0.45);
      text-align: center;

      &:first-of-type {
        text-align: left;
        border-radius: 10px 0 0 10px;
      }

      &:last-child {
        border-radius: 10px 10px 10px 10px;
      }
    }
  }
`;
