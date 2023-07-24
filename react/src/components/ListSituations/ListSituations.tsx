import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import '../../styles.css';
import './styles.css';
import  { ChildProps } from "../../types/ChildProps";
import api from '../../services/api';
import { UserWithSituation } from '../../types/UserWithSituation';
import { Situation } from '../../types/Situation';

const UserTypeList: React.FC<ChildProps> = ({ reloadKey }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [situations, setSituations] = useState<Situation[]>([]);

  useEffect(() => {
    fetchSituations();
    console.log("it fetched again")
  }, [reloadKey]);

  const fetchSituations = async () => {
    try {
      await api.get('/situations').then(response => {
        //console.log("Shituations",response.data);
        const data = response.data;
        setSituations(data); 
      }).catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.error('Error fetching situations:', error);
    }
  };

  


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPeople = situations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Description:</TableCell>
                <TableCell>Creation date:</TableCell>
                <TableCell>Update date:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPeople.map((situation) => (
              <TableRow key={situation.id}>
                <TableCell>{situation.description}</TableCell>
                <TableCell>{situation.created_at}</TableCell>
                <TableCell>{situation.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={situations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default UserTypeList;
