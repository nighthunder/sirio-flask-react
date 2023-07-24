import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Stack, Button } from '@mui/material';
import ListUsers from '../ListUsers/ListUsers';
import '../../styles.css';
import './styles.css';
import api from '../../services/api';
import  { User } from "../../types/User";
import  { UserType } from "../../types/UserType";
import  { Situation } from "../../types/Situation";

const Form: React.FC = () => {
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [type, setType] = useState<UserType[]>([]);
  const [situations, setSituations] = useState<Situation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    id: 1,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    situation: '',
    type: null,
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchType();
    fetchSituations();
  }, []);

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
      console.error('Error fetching types:', error);
    }
  };

  const fetchSituations = async () => {
    try {
      await api.get('/situations').then(response => {
        //console.log(response.data);
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("dados", formData)

    const { firstname, lastname, email, phone, situation, type } = formData;
    const newErrors: string[] = [];
    let gotError : boolean = false;

    if (!firstname.trim()) {
      newErrors.push('First name is mandatory.');
      gotError = true;
    }
    if (!lastname.trim()) {
      newErrors.push('Last name is mandatory.');
      gotError = true;
    }
    if (!email.trim()) {
      newErrors.push('Email is mandatory.');
      gotError = true;
    }
    if (!phone.trim()) {
      newErrors.push('Phone is mandatory.');
      gotError = true;
    }
    if (!(typeof situation === 'number')) {
      newErrors.push('Situation is mandatory.');
      gotError = true;
    }
    if (!(typeof type === 'number')) {
      newErrors.push('Professional type is mandatory.');
      gotError = true;
    }

    setErrors(newErrors);

    if (gotError){
      return;
    }

    try {
      await api.post('/user', JSON.stringify(formData)).then(response => {
        console.log(response.data);
        const data = response.data;
        //setUsers(data); 
        
        //console.log('Form submitted successfully');
        setIsLoading(true);
        setReloadKey(prevKey => prevKey + 1);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // 10 seconds
      }).catch(error => {
        console.error(error);
      });
      
    } catch (error) {
      console.error('An error occurred', error);
    } 
  };

  return (
    <>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
            variant="outlined"
            id="firstname" 
            name="firstname"
            label="First name" 
            value = {formData.firstname}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e)}
            />
            <TextField
            variant="outlined"
            id="lastname" 
            name="lastname"
            label="Last name" 
            value = {formData.lastname}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e)}
            />
            <FormControl variant="outlined" sx={{ flex: '1' }}>
            <InputLabel id="type-label">User class:</InputLabel>
            <Select id="type" name="type" labelId="type-label" label="Type" onChange={(e) => handleChange(e)}>
                {type.map((t) => (
                    <MenuItem key={t.id} value={t.id}>{t.description}</MenuItem>
                ))}
                </Select>
            </FormControl>
            <TextField
            variant="outlined"
            id="phone" 
            name="phone"
            label="Phone" 
            placeholder="(XX) XXXX-XXXX"
            value = {formData.phone}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e)}
            />
            <TextField
            variant="outlined"
            label="Email"
            id="email" 
            name="email"
            value = {formData.email}
            placeholder="meuemail@domain.com.br"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e)}
            />
            <FormControl variant="outlined" sx={{ flex: '1' }}>
            <InputLabel id="type-situation">Situation</InputLabel>
            <Select id="situation" name="situation" labelId="type-situation" label="Situation" onChange={(e) => handleChange(e)}>
                {situations?.map((situation: any) => (
                  <MenuItem key={situation.id} value={situation.id}>{situation.description}&nbsp;</MenuItem>
                ))}
            </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ flex: '1' }}>
            Add
            </Button>
        </Stack>
        </form>
        {errors.length > 0 && (
          <div>
            <div className='error'>
              {errors.map((error, index) => (
                <span key={index}>{error}&nbsp;</span>
              ))}
            </div>
          </div>
        )}
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh'}}>
            <CircularProgress />
          </div>
        ) : (
          <ListUsers reloadKey={reloadKey}></ListUsers>
        )}
    </>
  );
};

export default Form;
