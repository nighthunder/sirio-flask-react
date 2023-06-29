import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Stack, Button } from '@mui/material';
import ProfessionalList from './ProfessionalList';
import '../styles.css';

interface ProfessionalType {
    id: number;
    description: string;
    situation: string;
}

interface Person {
  id: number;
  name: string;
  email: string;
  type: number | null;
  situation: string ;
}

const Form: React.FC = () => {
  const [type, setType] = useState<ProfessionalType[]>([]);
  const [formData, setFormData] = useState<Person>({
    id: 1,
    name: '',
    email: '',
    situation: '',
    type: null
  });

  useEffect(() => {
    fetchType();
  }, []);

  const fetchType = async () => {
    try {
      const response = await fetch('http://localhost:5000/type');
      const data = await response.json();
      setType(data);
    } catch (error) {
      console.error('Error fetching people:', error);
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

    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Form submitted successfully');

      } else {
        // Handle error response
        console.error('Failed to submit form');
      }
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
            id="name" 
            name="name"
            label="Name" 
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e)}
            />
            <FormControl variant="outlined" sx={{ flex: '1' }}>
            <InputLabel id="type-label">Tipo de profissional</InputLabel>
            <Select id="type" name="type" labelId="type-label" label="Type" onChange={(e) => handleChange(e)}>
                {type.map((t) => (
                    <MenuItem key={t.id} value={t.id}>{t.id} - {t.description}</MenuItem>
                ))}
                </Select>
            </FormControl>
            <TextField
            variant="outlined"
            label="Email"
            id="email" 
            name="email"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e)}
            />
            <FormControl variant="outlined" sx={{ flex: '1' }}>
            <InputLabel id="type-situation">Situação</InputLabel>
            <Select id="situation" name="situation" labelId="type-situation" label="Situation" onChange={(e) => handleChange(e)}>
                <MenuItem key="ativo" value="ativo">1 - ativo</MenuItem>
                <MenuItem key="inativo" value="ativo">2 - inativo</MenuItem>
            </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ flex: '1' }}>
            Adicionar
            </Button>
        </Stack>
        </form>
        <ProfessionalList {...formData}></ProfessionalList>
    </>
  );
};

export default Form;
