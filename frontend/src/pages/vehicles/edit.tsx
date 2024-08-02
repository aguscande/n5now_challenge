import { useParams } from "react-router-dom";
import { VehiclesEditForm } from "../../components/forms/vehicles";

export default function VehiclesPageEdit() {
  const { id } = useParams();

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Editar Vehículo #{id}</h3>
      </div>

      <VehiclesEditForm />
    </div>
  );
}