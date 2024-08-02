import { AxiosInstance, AxiosResponse } from 'axios';
import useAxios from './useAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Person } from '../types/person';

/* const mockData: Person[] = [
  { id: 1, name: 'Snow', email: 'Jon@gmail.com' },
  { id: 2, name: 'Lannister', email: 'Cersei@gmail.com' },
  { id: 3, name: 'Lannister', email: 'Jaime@gmail.com' },
  { id: 4, name: 'Stark', email: 'Arya@gmail.com' },
  { id: 5, name: 'Targaryen', email: 'Daenerys@gmail.com' },
  { id: 6, name: 'Melisandre', email: 'null@gmail.com' },
  { id: 7, name: 'Clifford', email: 'Ferrara@gmail.com' },
  { id: 8, name: 'Frances', email: 'Rossini@gmail.com' },
  { id: 9, name: 'Roxie', email: 'Harvey@gmail.com' },
]; */

export default function usePersons() {
  const axios: AxiosInstance = useAxios();
  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['personsHook'],
    queryFn: async (): Promise<Person[]> => {
      const response: AxiosResponse<Person[]> = await axios.get(`/persons`);
      return response.data;
    },
  });
  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      try {
        const response = await axios.delete(`/persons/${id}`);
        return response.data;
      } catch (error: any) {
        console.log('usePersons.useMutation.error', error.response.data, error.message);
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Persona eliminada exitosamente');
      refetch();
    },
  });

  return {
    info: data!,
    isPending,
    isError,
    refetch,
    mutate,
    isPendingDelete,
  };
}