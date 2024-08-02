import PersonsTable from "../../components/tables/personsTable";

export default function PersonsPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Personas</h3>
      </div>

      <PersonsTable />
    </div>
  );
}
