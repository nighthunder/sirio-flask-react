import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Stack, Button } from '@mui/material';
import ListUsersTypes from '../ListUsersTypes/ListUsersTypes';
import { Situation } from '../../types/Situation';
import { UserType } from '../../types/UserType';
import '../../styles.css';
import './styles.css';
import api from '../../services/api';

const Form: React.FC = () => {
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [type, setType] = useState<UserType[]>([]);
  const [situations, setSituations] = useState<Situation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserType>({
    id: 1,
    description: '',
    situation: ''
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    fetchType();
    fetchSituations();
  }, []);

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
      console.error('Error fetching people:', error);
    }
  };

  const fetchSituations = async () => {
    try {
      await api.get('/situations').then(response => {
        console.log(response.data);
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

    const { description, situation } = formData;
    const newErrors: string[] = [];
    let gotError : boolean = false;

    if (!description.trim()) {
      newErrors.push('Description is mandatory.');
      gotError = true;
    }

    if (!(typeof situation === 'number')) {
      newErrors.push('Situation is mandatory.');
      gotError = true;
    }

    setErrors(newErrors);

    if (gotError){
      return;
    }

    try {
      await api.post('/type', JSON.stringify(formData)).then(response => {
        console.log(response.data);
        const data = response.data;
        // Handle successful response
        console.log('Form submitted successfully');
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
            id="description" 
            name="description"
            label="Description" 
            value={formData.description}
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e) 
            }
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
          <ListUsersTypes reloadKey={reloadKey}></ListUsersTypes>
        )}
        
    </>
  );
};

export default Form;
