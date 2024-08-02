import { CircularProgress } from "@mui/material";
import useAddVehicle from "../../hooks/useAddVehicle";
import useEditVehicle from "../../hooks/useEditVehicle";
import { useNavigate } from "react-router-dom";

function VehiclesForm({
  license_plate,
  setLicensePlate,
  brand,
  setBrand,
  color,
  setColor,
  personId,
  setPersonId,
  isPending,
  handleSubmit,
  submitButtonText = "Agregar",
}: {
  license_plate: string,
  setLicensePlate: (license_plate: string) => void,
  brand: string,
  setBrand: (brand: string) => void,
  color: string,
  setColor: (color: string) => void,
  personId: string,
  setPersonId: (personId: string) => void,
  isPending: boolean,
  handleSubmit: (e: any) => void,
  submitButtonText?: string,
}) {
  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="border border-black p-8 flex flex-col space-y-4 rounded-md"
      >
        <label className="flex flex-col">
          Patente:
          <input
            type="text"
            placeholder="Patente"
            value={license_plate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Marca:
          <input
            type="text"
            placeholder="Marca"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Color:
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          ID Persona:
          <input
            type="number"
            placeholder="ID Persona"
            value={personId}
            onChange={(e) => setPersonId(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white font-bold rounded"
          disabled={isPending}
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  )
}

export function VehiclesAddForm() {
  const {
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
  } = useAddVehicle();

  return (
    <VehiclesForm
      license_plate={license_plate}
      setLicensePlate={setLicensePlate}
      brand={brand}
      setBrand={setBrand}
      color={color}
      setColor={setColor}
      personId={owner_id}
      setPersonId={setOwnerId}
      isPending={isPending}
      handleSubmit={handleSubmit}
    />
  )
}

export function VehiclesEditForm() {
  const navigate = useNavigate();
  const {
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
  } = useEditVehicle();

  if (isPendingLoad)
    return <CircularProgress />

  if (isError)
    return (
      <div className="flex flex-col">
        <h1>Error al cargar vehículo</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Volver
        </button>
      </div>
    )

  return (
    <VehiclesForm
      license_plate={license_plate}
      setLicensePlate={setLicensePlate}
      brand={brand}
      setBrand={setBrand}
      color={color}
      setColor={setColor}
      personId={owner_id}
      setPersonId={setOwnerId}
      isPending={isPending}
      handleSubmit={handleSubmit}
      submitButtonText="Editar"
    />
  )
}
