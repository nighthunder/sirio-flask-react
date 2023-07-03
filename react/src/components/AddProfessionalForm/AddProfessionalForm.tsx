import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem, Stack, Button } from '@mui/material';
import ProfessionalList from '../ProfessionalList/ProfessionalList';
import '../../styles.css';
import './styles.css';

interface ProfessionalType {
    id: number;
    description: string;
    situation: string;
}

interface Person {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: number | null;
  situation: string ;
}

const Form: React.FC = () => {
  const [reloadKey, setReloadKey] = useState<number>(0);
  const [type, setType] = useState<ProfessionalType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Person>({
    id: 1,
    name: '',
    email: '',
    phone: '',
    situation: '',
    type: null
  });
  const [errors, setErrors] = useState<string[]>([]);

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

    const { name, email, phone, situation, type } = formData;
    const newErrors: string[] = [];
    let gotError : boolean = false;

    if (!name.trim()) {
      newErrors.push('Nome é obrigatório.');
      gotError = true;
    }
    if (!email.trim()) {
      newErrors.push('Email é obrigatório.');
      gotError = true;
    }
    if (!phone.trim()) {
      newErrors.push('Telefone é obrigatório.');
      gotError = true;
    }
    if (!situation.trim()) {
      newErrors.push('Situação é obrigatório.');
      gotError = true;
    }
    if (!(typeof type === 'number')) {
      newErrors.push('Tipo de profissional é obrigatório.');
      gotError = true;
    }

    setErrors(newErrors);

    if (gotError){
      return;
    }

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
        setIsLoading(true);
        setReloadKey(prevKey => prevKey + 1);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); // 10 seconds

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
            label="Nome completo" 
            value = {formData.name}
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
            id="phone" 
            name="phone"
            label="Telefone" 
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
            placeholder="meuemail@sirio.com.br"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: '1' }}
            onChange={(e) => handleChange(e)}
            />
            <FormControl variant="outlined" sx={{ flex: '1' }}>
            <InputLabel id="type-situation">Situação</InputLabel>
            <Select id="situation" name="situation" labelId="type-situation" label="Situation" onChange={(e) => handleChange(e)}>
                <MenuItem key="ativo" value="ativo">1 - ativo</MenuItem>
                <MenuItem key="inativo" value="inativo">2 - inativo</MenuItem>
            </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ flex: '1' }}>
            Adicionar
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
          <ProfessionalList reloadKey={reloadKey}></ProfessionalList>
        )}
    </>
  );
};

export default Form;
