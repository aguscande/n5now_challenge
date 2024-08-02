import { TokensForm } from "../components/forms/tokens";

export default function TokensPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-4'>
        <h3 className='font-bold text-2xl italic'>Tokens</h3>
      </div>

      <TokensForm />
    </div>
  );
}
