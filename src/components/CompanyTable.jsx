import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import {Box, Toolbar, Typography} from '@mui/material';
import {getCompanyData} from '../company-data-generator';

function CompanyTable() {
  let [rows, setRows] = useState([]);
  let [rowsPerPage, setRowsPerPage] = useState(10);
  let [page, setPage] = useState(0);

  useEffect(() => {
    rows = getCompanyData();
    // rows = rows.filter(r => r.id<page * rowsPerPage + rowsPerPage)
    console.log(page)
    setRows(rows);
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log("page flipped");
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0);
  }

  return (
    <Box mt={20} sx={{width: '100%'}}>
      <Paper sx={{width: '100%', mb: 2}}>
        <Toolbar
          sx={{
            pl: {sm: 2},
            pr: {xs: 1, sm: 1},
          }}
        >
          <Typography
            sx={{flex: '1 1 100%'}}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Customer bank details
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table
            sx={{minWidth: 500}}
          >
            <TableHead>
              <TableRow>
                <TableCell width='20%' sx={{fontWeight: 'bold'}}>Company Name</TableCell>
                <TableCell width='20%' align='right' sx={{fontWeight: 'bold'}}>What they do</TableCell>
                <TableCell width='30%' align='right' sx={{fontWeight: 'bold'}}>Currency</TableCell>
                <TableCell width='30%' align='right' sx={{fontWeight: 'bold'}}>Routing number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {/* <TableCell align="right">{row.id}</TableCell> */}
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.currency}</TableCell>
                  <TableCell align="right">{row.routingNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination 
          rowsPerPageOptions={[10, 20 ,25, 50]}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onRowsPerPageChange={handleRowsPerPageChange}
          onPageChange={handleChangePage}
           />
      </Paper>
    </Box>
  );
}

export default CompanyTable;