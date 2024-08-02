import { AxiosInstance } from 'axios';
import useAxios from './useAxios';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export interface TokenInputs {
  name: string;
  numberId: string;
}

export default function useTokens() {
  const axios: AxiosInstance = useAxios();
  const [name, setName] = useState('');
  const [numberId, setNumberId] = useState('');
  const [token, setToken] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TokenInputs): Promise<void> => {
      const payload = {
        name: data.name,
        number: data.numberId,
      };

      try {
        const response = await axios.post(`/token`, payload);
        return response.data;
      } catch (error: any) {
        console.log('useTokens.useMutation.error', error.response.data, error.message);
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Token generado exitosamente');
      setToken('');
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ name, numberId });
  };

  return {
    name,
    setName,
    numberId,
    setNumberId,
    isPending,
    handleSubmit,
    token,
  }
}