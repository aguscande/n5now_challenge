import { useNavigate } from "react-router-dom";
import useAddPerson from "../../hooks/useAddPerson";
import useEditPerson from "../../hooks/useEditPerson";
import CircularProgress from '@mui/material/CircularProgress';


function PersonsForm({
  name,
  setName,
  email,
  emailError,
  isPending,
  handleSubmit,
  handleEmailChange,
  submitButtonText = "Agregar",
}: {
  name: string,
  setName: (name: string) => void,
  email: string,
  emailError: string,
  isPending: boolean,
  handleSubmit: (e: any) => void,
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
          Correo Electrónico:
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 border rounded"
          />
          {emailError && <span className="text-red-500 mt-1">{emailError}</span>}
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

export function PersonsAddForm() {
  const {
    name,
    setName,
    email,
    emailError,
    isPending,
    handleSubmit,
    handleEmailChange,
  } = useAddPerson();

  return (
    <PersonsForm
      name={name}
      setName={setName}
      email={email}
      emailError={emailError}
      isPending={isPending}
      handleSubmit={handleSubmit}
      handleEmailChange={handleEmailChange}
    />
  );
}

export function PersonsEditForm() {
  const navigate = useNavigate();
  const {
    name,
    setName,
    email,
    emailError,
    isPending,
    handleSubmit,
    handleEmailChange,
    isPendingLoad,
    isError,
  } = useEditPerson();

  if (isPendingLoad)
    return <CircularProgress />

  if (isError)
    return (
      <div className="flex flex-col">
        <h1>Error al cargar la persona</h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Volver
        </button>
      </div>
    )

  return (
    <PersonsForm
      name={name}
      setName={setName}
      email={email}
      emailError={emailError}
      isPending={isPending}
      handleSubmit={handleSubmit}
      handleEmailChange={handleEmailChange}
      submitButtonText="Editar"
    />
  );
}
