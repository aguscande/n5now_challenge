import { useParams } from "react-router-dom";
import { OfficialsEditForm } from "../../components/forms/officials";

export default function OfficialsPageEdit() {
  const { id } = useParams();

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Editar Oficial #{id}</h3>
      </div>

      <OfficialsEditForm />
    </div>
  );
}