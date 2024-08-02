import { VehiclesAddForm } from "../../components/forms/vehicles";

export default function VehiclesPageAdd() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Agregar Vehículo</h3>
      </div>

      <VehiclesAddForm />
    </div>
  );
}