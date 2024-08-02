import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useTokens from "../../hooks/useTokens";
import { IconButton } from '@mui/material';

export function TokensForm() {
  const {
    name,
    setName,
    numberId,
    setNumberId,
    isPending,
    handleSubmit,
    token,
  } = useTokens();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(numberId);
    alert('Copied to clipboard!');
  };

  return (
    <div className="flex flex-col space-y-4">
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
          Obtener Token
        </button>
      </form>

      {token && (
        <div className="border border-black p-8 flex flex-col space-y-4 rounded-md">
          <h3 className="font-bold text-lg">Token</h3>
          <div className='flex flex-row space-x-2 items-center'>
            <span>{numberId}</span>

            <IconButton onClick={copyToClipboard}>
              <ContentCopyIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  )
}