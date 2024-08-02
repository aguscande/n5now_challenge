import { useState } from "react";
import useAxios from "./useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export interface AddVehicleInputs {
  license_plate: string;
  brand: string;
  color: string;
  owner_id: string;
}

export default function useAddVehicle() {
  const axios: AxiosInstance = useAxios();
  const [license_plate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [owner_id, setOwnerId] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AddVehicleInputs): Promise<void> => {
      const payload = {
        ...data,
        owner_id: parseInt(data.owner_id, 10),
      };

      try {
        const response = await axios.post(`/vehicles`, payload);
        return response.data;
      } catch (error: any) {
        console.log('useAddVehicle.useMutation.error', error.response.data);
        alert("Error al crear vehículo: " + error.response.data.detail);
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Vehículo agregado exitosamente');
      setLicensePlate('');
      setBrand('');
      setColor('');
      setOwnerId('');
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate({ license_plate, brand, color, owner_id });
  };

  return {
    license_plate,
    setLicensePlate,
    brand,
    setBrand,
    color,
    setColor,
    owner_id,
    setOwnerId,
    isPending,
    handleSubmit,
  }
}