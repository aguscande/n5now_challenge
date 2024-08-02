import OfficialsTable from "../../components/tables/officialsTable";

export default function OfficialsPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Oficiales</h3>
      </div>

      <OfficialsTable />
    </div>
  );
}