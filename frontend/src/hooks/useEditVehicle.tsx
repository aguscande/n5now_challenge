import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosInstance, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { Vehicle } from "../types/vehicle";

export interface EditVehicleInputs {
  license_plate: string;
  brand: string;
  color: string;
  owner_id: string;
}

export default function useEditVehicle() {
  const axios: AxiosInstance = useAxios();
  const { id } = useParams();
  const [license_plate, setLicensePlate] = useState('');
  const [brand, setBrand] = useState('');
  const [color, setColor] = useState('');
  const [owner_id, setOwnerId] = useState('');

  const { isPending: isPendingLoad, isError, data } = useQuery({
    queryKey: ['useEditVehicleQuery'],
    queryFn: async (): Promise<Vehicle> => {
      const response: AxiosResponse<Vehicle> = await axios.get(`/vehicles/${id}`);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EditVehicleInputs): Promise<void> => {
      const payload = {
        ...data,
        owner_id: parseInt(data.owner_id, 10),
      };

      try {
        const response = await axios.put(`/vehicles/${id}`, payload);
        return response.data;
      } catch (error: any) {
        console.log('useEditVehicle.useMutation.error', error.response.data, error.message);
        alert("Error al editar vehículo: " + error.response.data.detail);
        throw error;
      }
    },
    onSuccess: (): void => {
      alert('Vehículo editado exitosamente');
    },
  });

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    mutate({ license_plate, brand, color, owner_id });
  };

  useEffect((): void => {
    if (data) {
      setLicensePlate(data.license_plate);
      setBrand(data.brand);
      setColor(data.color);
      setOwnerId(String(data.owner_id));
    }
  }, [data]);

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

    isPendingLoad,
    isError,
  }
}