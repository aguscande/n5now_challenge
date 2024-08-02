import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { Official } from "../types/official";

export interface EditOfficialInputs {
  name: string;
  numberId: string;
}

export default function useEditOfficial() {
  const axios: AxiosInstance = useAxios();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [numberId, setNumberId] = useState('');

  const { isPending: isPendingLoad, isError, data } = useQuery({
    queryKey: ['useEditOfficialQuery'],
    queryFn: async (): Promise<Official> => {
      const response: AxiosResponse<Official> = await axios.get(`/officials/${id}`);
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EditOfficialInputs): Promise<void> => {
      const payload = {
        ...data,
        number: data.numberId,
      };

      try {
        const response = await axios.put(`/officials/${id}`, payload);
        return response.data;
      } catch (error: any) {
        console.log('useEditOfficial.useMutation.error', error.response.data, error.message);
        alert("Error al editar oficial");
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Oficial editado exitosamente');
    },
  });

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    mutate({ name, numberId });
  };

  useEffect((): void => {
    if (data) {
      setName(data.name);
      setNumberId(String(data.number));
    }
  }, [data]);

  return {
    name,
    setName,
    numberId,
    setNumberId,
    isPending,
    handleSubmit,

    isPendingLoad,
    isError,
  }
}