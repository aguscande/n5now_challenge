import { useState } from "react";
import useAxios from "./useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface AddOfficialInputs {
  name: string;
  numberId: string;
}

export default function useAddOfficial() {
  const axios: AxiosInstance = useAxios();
  const [name, setName] = useState('');
  const [numberId, setNumberId] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddOfficialInputs): Promise<void> => {
      const payload = {
        ...data,
        number: data.numberId,
      };

      try {
        const response = await axios.post(`/officials`, payload);
        return response.data;
      } catch (error: any) {
        console.log('useAddOfficial.useMutation.error', error.response.data, error.message);
        alert("Error al crear oficial");
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Oficial agregado exitosamente');
      setName('');
      setNumberId('');
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
  }
}