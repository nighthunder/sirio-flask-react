import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import '../styles.css';
interface Person {
    id: number;
    name: string;
    situation: string;
    phone: string;
    type: number | null;
    email: string;
}
interface ChildProps {
    reloadKey: number;
}
  
const PeopleList: React.FC<ChildProps> = ({ reloadKey }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchPeople();
    console.log("it fetched again")
  }, [reloadKey]);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:5000/user');
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPeople = people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Situação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPeople.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.id}</TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>{person.type}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.situation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={people.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PeopleList;
