import { useState } from "react";
import useAxios from "./useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface AddPersonInputs {
  name: string;
  email: string;
}

export default function useAddPerson() {
  const axios: AxiosInstance = useAxios();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddPersonInputs): Promise<void> => {
      try {
        const response = await axios.post(`/persons`, data);
        return response.data;
      } catch (error: any) {
        console.log('useAddPerson.useMutation.error', error.response.data, error.message);
        alert("Error al crear persona");
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Persona agregada exitosamente');
      setName('');
      setEmail('');
      setEmailError('');
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ name, email });
  };

  const validateEmail = (email: string) => {
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
  }
}