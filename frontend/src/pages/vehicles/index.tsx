import VehiclesTable from "../../components/tables/vehiclesTable";

export default function VehiclesPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Vehículos</h3>
      </div>

      <VehiclesTable />
    </div>
  );
}