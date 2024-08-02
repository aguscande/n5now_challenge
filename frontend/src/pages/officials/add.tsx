import { OfficialsAddForm } from "../../components/forms/officials";

export default function OfficialsPageAdd() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Agregar Oficial</h3>
      </div>

      <OfficialsAddForm />
    </div>
  );
}