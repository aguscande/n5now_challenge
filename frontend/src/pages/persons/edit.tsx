import { useParams } from "react-router-dom";
import { PersonsEditForm } from "../../components/forms/persons";

export default function PersonsPageEdit() {
  const { id } = useParams();

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Editar Persona #{id}</h3>
      </div>

      <PersonsEditForm />
    </div>
  );
}