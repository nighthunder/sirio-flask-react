import React, { useEffect, useState } from 'react';
import { MenuItem, FormControl, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import '../../styles.css';
import './styles.css';
import api from '../../services/api';
import  { User } from "../../types/User";
import  { UserType } from "../../types/UserType";
import  { Situation } from "../../types/Situation";
import  { UserWithType } from "../../types/UserWithType";
import  { UserWithSituation } from "../../types/UserWithSituation";
import  { ChildProps } from "../../types/ChildProps";

const ListUsers: React.FC<ChildProps> = ({ reloadKey }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [type, setType] = useState<UserType[]>([]);
  const [situations, setSituations] = useState<Situation[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState<UserWithType>({});
  const [formData2, setFormData2] = useState<UserWithSituation>({});

  useEffect(() => {
    fetchPeople();
    fetchType();
    fetchSituations();
    console.log("it fetched again");
  }, [reloadKey]);

  const fetchPeople = async () => {
    try {
      await api.get('/users').then(response => {
        console.log( "Users:"+ response.data);
        const data = response.data
        setUsers(data);
      }).catch(error => {
        console.error(error);
      });
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchType = async () => {
    try {
      await api.get('/types').then(response => {
        //console.log(response.data);
        const data = response.data;
        setType(data); 
      }).catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.error('Error fetching type:', error);
    }
  };

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  
  const handleSelectChange = async (e: any, person_id: number) => {
    const { name, value } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
      ["id"]: person_id
    }));
    //console.log(`form data: name: ${name} and value: ${value}` );

    const params = {
      "id": person_id,
      "type": value
    }

    try {

      //console.log("user and type change:", JSON.stringify(params));
      await api.post('/usertype', JSON.stringify(params)).then(response => {
        console.log(response.data);
        const data = response.data;
        console.log("Correctly submitted user and type change!");
      }).catch(error => {
        console.error(error);
      });

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSelectSituationsChange = async (e: any, person_id: number) => {
    const { name, value } = e.target;

    setFormData2((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
      ["id"]: person_id
    }));
    console.log(`form data: field name: ${name} and value: ${value}` );

    const params = {
      "id": person_id,
      "situation": value
    }

    try {

      console.log("user and type change:", JSON.stringify(params));
      await api.post('/usersituation', JSON.stringify(params)).then(response => {
        console.log(response.data);
        const data = response.data;
        console.log("Correctly submitted user and situation change!");
      }).catch(error => {
        console.error(error);
      });

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedPeople = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Fullname:</TableCell>
                <TableCell>Phone:</TableCell>
                <TableCell>Class:</TableCell>
                <TableCell>Email:</TableCell>
                <TableCell>Status:</TableCell>
                <TableCell>Creation date:</TableCell>
                <TableCell>Update date:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPeople.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.firstname} {person.lastname}</TableCell>
                <TableCell>{person.phone}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" sx={{ flex: '5' }}>
                    <Select id="type" name="type" labelId="type" label="Class" value = {formData!["id"] === person.id ? formData!["type"]: person.type } onChange={(e) => handleSelectChange(e, person.id)}>
                      {type.map((t) => (
                        <MenuItem key={t.id} value={t.id}>{t.description}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>
                  <Select id="situation" name="situation" labelId="situation" label="Situation" value = {formData2!["id"] === person.id ? formData2!["situation"]: person.situation } onChange={(e) => handleSelectSituationsChange(e, person.id)}>
                    {situations.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.description}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>{person.created_at}</TableCell>
                <TableCell>{person.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ListUsers;
