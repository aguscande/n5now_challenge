import { AxiosInstance, AxiosResponse } from 'axios';
import useAxios from './useAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Vehicle } from '../types/vehicle';

/* const mockData: Vehicle[] = [
  { id: 1, license_plate: 'Snow', brand: 'BMW', color: 'red', owner_id: 1 },
  { id: 2, license_plate: 'Lannister', brand: 'BMW', color: 'red', owner_id: 1 },
  { id: 3, license_plate: 'Lannister', brand: 'BMW', color: 'red', owner_id: 2 },
  { id: 4, license_plate: 'Stark', brand: 'BMW', color: 'red', owner_id: 3 },
  { id: 5, license_plate: 'Targaryen', brand: 'BMW', color: 'red', owner_id: 6 },
  { id: 6, license_plate: 'Melisandre', brand: 'BMW', color: 'red', owner_id: 61 },
  { id: 7, license_plate: 'Clifford', brand: 'BMW', color: 'red', owner_id: 71 },
  { id: 8, license_plate: 'Frances', brand: 'BMW', color: 'red', owner_id: 83 },
  { id: 9, license_plate: 'Roxie', brand: 'BMW', color: 'red', owner_id: 99 },
]; */

export default function useVehicles() {
  const axios: AxiosInstance = useAxios();
  const { isPending, isError, data, refetch } = useQuery({
    queryKey: ['vehiclesHook'],
    queryFn: async (): Promise<Vehicle[]> => {
      const response: AxiosResponse<Vehicle[]> = await axios.get(`/vehicles`);
      return response.data;
    },
  });
  const { mutate, isPending: isPendingDelete } = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      try {
        const response = await axios.delete(`/vehicles/${id}`);
        return response.data;
      } catch (error: any) {
        console.log('useVehicles.useMutation.error', error.response.data, error.message);
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Vehículo eliminado exitosamente');
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