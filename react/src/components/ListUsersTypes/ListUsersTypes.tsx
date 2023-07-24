import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import '../../styles.css';
import './styles.css';
import  { UserType } from "../../types/UserType";
import  { ChildProps } from "../../types/ChildProps";
import api from '../../services/api';
import { UserWithSituation } from '../../types/UserWithSituation';
import { Situation } from '../../types/Situation';
import { MenuItem, Select } from '@mui/material';

const UserTypeList: React.FC<ChildProps> = ({ reloadKey }) => {
  const [type, setType] = useState<UserType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [situations, setSituations] = useState<Situation[]>([]);
  const [formData2, setFormData2] = useState<UserWithSituation>({});

  useEffect(() => {
    fetchType();
    fetchSituations();
    console.log("it fetched again")
  }, [reloadKey]);

  const fetchType = async () => {
    try {
      await api.get('/types').then(response => {
        console.log(response.data);
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

  


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectSituationsChange = async (e: any, type_id: number) => {
    const { name, value } = e.target;

    setFormData2((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
      ["id"]: type_id
    }));
    console.log(`form data: field name: ${name} and value: ${value}` );

    const params = {
      "id": type_id,
      "situation": value
    }

    try {

      console.log("user and type change:", JSON.stringify(params));
      await api.post('/typesituation', JSON.stringify(params)).then(response => {
        console.log(response.data);
        const data = response.data;
        console.log("Correctly submitted type and situation change!");
      }).catch(error => {
        console.error(error);
      });

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const paginatedPeople = type.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Description:</TableCell>
                <TableCell>Status:</TableCell>
                <TableCell>Creation date:</TableCell>
                <TableCell>Update date:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPeople.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.description}</TableCell>
                <TableCell>
                  <Select id="situation" name="situation" labelId="situation" label="Situation" value = {formData2!["id"] === type.id ? formData2!["situation"]: type.situation } onChange={(e) => handleSelectSituationsChange(e, type.id)}>
                    {situations.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.description}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>{type.created_at}</TableCell>
                <TableCell>{type.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={type.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default UserTypeList;
