import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { Person } from "../types/person";

export interface EditPersonInputs {
  name: string;
  email: string;
}

export default function useEditPerson() {
  const axios: AxiosInstance = useAxios();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const { isPending: isPendingLoad, isError, data } = useQuery({
    queryKey: ['useEditPersonQuery'],
    queryFn: async (): Promise<Person> => {
      const response: AxiosResponse<Person> = await axios.get(`/persons/${id}`);
      return response.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EditPersonInputs): Promise<void> => {
      try {
        const response = await axios.put(`/persons/${id}`, data);
        return response.data;
      } catch (error: any) {
        console.log('useEditPerson.useMutation.error', error.response.data, error.message);
        alert("Error al editar persona");
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Persona editada exitosamente');
      setEmailError('');
    },
  });

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    mutate({ name, email });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail: string = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  };

  useEffect((): void => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
    }
  }, [data]);

  return {
    name,
    setName,
    email,
    setEmail,
    emailError,
    setEmailError,
    isPending,
    handleSubmit,
    handleEmailChange,

    isPendingLoad,
    isError,
  }
}