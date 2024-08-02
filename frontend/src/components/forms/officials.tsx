import { CircularProgress } from "@mui/material";
import useAddOfficial from "../../hooks/useAddOfficial";
import useEditOfficial from "../../hooks/useEditOfficial";
import { useNavigate } from "react-router-dom";

function OfficialsForm({
  name,
  setName,
  numberId,
  setNumberId,
  isPending,
  handleSubmit,
  submitButtonText = "Agregar",
}: {
  name: string,
  setName: (name: string) => void,
  numberId: string,
  setNumberId: (e: any) => void,
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
          Nombre:
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </label>

        <label className="flex flex-col">
          Número Único Identificatorio:
          <input
            type="number"
            placeholder="Número Único Identificatorio"
            value={numberId}
            onChange={(e) => setNumberId(e.target.value)}
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

export function OfficialsAddForm() {
  const {
    name,
    setName,
    numberId,
    setNumberId,
    isPending,
    handleSubmit,
  } = useAddOfficial();

  return (
    <OfficialsForm
      name={name}
      setName={setName}
      numberId={numberId}
      setNumberId={setNumberId}
      isPending={isPending}
      handleSubmit={handleSubmit}
    />
  )
}

export function OfficialsEditForm() {
  const navigate = useNavigate();
  const {
    name,
    setName,
    numberId,
    setNumberId,
    isPending,
    handleSubmit,
    isPendingLoad,
    isError,
  } = useEditOfficial();

  if (isPendingLoad)
    return <CircularProgress />

  if (isError)
    return (
      <div className="flex flex-col">
        <h1>Error al cargar la oficial</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Volver
        </button>
      </div>
    )

  return (
    <OfficialsForm
      name={name}
      setName={setName}
      numberId={numberId}
      setNumberId={setNumberId}
      isPending={isPending}
      handleSubmit={handleSubmit}
      submitButtonText="Editar"
    />
  )
}
