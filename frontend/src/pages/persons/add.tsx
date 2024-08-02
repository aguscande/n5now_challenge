import { PersonsAddForm } from "../../components/forms/persons";

export default function PersonsPageAdd() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Agregar Persona</h3>
      </div>

      <PersonsAddForm />
    </div>
  );
}