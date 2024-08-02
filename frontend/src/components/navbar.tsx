import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const sameStyle = 'rounded-md px-3 py-2 text-sm font-medium';

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to="/" className={clsx(sameStyle, {
                  'bg-gray-600 text-white font-bold': location.pathname === '/' || location.pathname.includes('persons'),
                  'text-gray-300 hover:bg-gray-700 hover:text-white': location.pathname !== '/' && !location.pathname.includes('persons'),
                })}>Personas</Link>
                <Link to="/vehicles" className={clsx(sameStyle, {
                  'bg-gray-600 text-white font-bold': location.pathname.includes('vehicle'),
                  'text-gray-300 hover:bg-gray-700 hover:text-white': !location.pathname.includes('vehicle'),
                })}>Vehículos</Link>
                <Link to="/officials" className={clsx(sameStyle, {
                  'bg-gray-600 text-white font-bold': location.pathname.includes('officials'),
                  'text-gray-300 hover:bg-gray-700 hover:text-white': !location.pathname.includes('officials'),
                })}>Oficiales</Link>
                <Link to="/tokens" className={clsx(sameStyle, {
                  'bg-gray-600 text-white font-bold': location.pathname.includes('tokens'),
                  'text-gray-300 hover:bg-gray-700 hover:text-white': !location.pathname.includes('tokens'),
                })}>Tokens</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
