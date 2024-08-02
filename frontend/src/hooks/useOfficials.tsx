import { AxiosInstance, AxiosResponse } from 'axios';
import useAxios from './useAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Official } from '../types/official';

/* const mockData: Official[] = [
  { id: 1, name: 'Snow', number: 123 },
  { id: 2, name: 'Lannister', number: 5125 },
  { id: 3, name: 'Lannister', number: 561 },
  { id: 4, name: 'Stark', number: 61 },
  { id: 5, name: 'Targaryen', number: 611 },
  { id: 6, name: 'Melisandre', number: 65 },
  { id: 7, name: 'Clifford', number: 95 },
  { id: 8, name: 'Frances', number: 159 },
  { id: 9, name: 'Roxie', number: 357 },
]; */

export default function useOfficials() {
  const axios: AxiosInstance = useAxios();
  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['officialsHook'],
    queryFn: async (): Promise<Official[]> => {
      const response: AxiosResponse<Official[]> = await axios.get(`/officials`);
      return response.data;
    },
  });
  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      try {
        const response = await axios.delete(`/officials/${id}`);
        return response.data;
      } catch (error: any) {
        console.log('useOfficials.useMutation.error', error.response.data, error.message);
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Oficial eliminado exitosamente');
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