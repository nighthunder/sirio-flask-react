import React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Person {
  id: number;
  name: string;
  situation: string;
  type: string;
  email: string
}

interface PeopleListProps {
  people: Person[];
}

const ProfessionalList: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    fetchPeople();
    console.log("people", people);
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:5000/user');
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Situação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.name}</TableCell>
              <TableCell>{person.type}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.situation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfessionalList;