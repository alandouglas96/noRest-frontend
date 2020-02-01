

import "./style.css";


import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const apiFields = props.apiFields;
  const classes = useStyles();

  // const newRows = ApiFields.map((field) => {
  //   return { id: field.field_name,
  //    label: 'Population',
  //    minWidth: 170,
  //    align: 'right',
  //    format: value => value.toLocaleString(),}
  //  })

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {apiFields.map(field => <StyledTableCell style={{border: '1px solid black', backgroundColor: '#d8d8d8', color: 'black' }} align="center">{field.field_name}</StyledTableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow>
              {apiFields.map((row) => <StyledTableCell style={{border: '1px solid black'}}align="center">
                <div className="flex-column">
                  <div>Field type: {row.field_type}</div>
                  <div>Allow Null: {row.allow_null ? 'true' : 'false'}</div>
                </div>
                </StyledTableCell>)}
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}