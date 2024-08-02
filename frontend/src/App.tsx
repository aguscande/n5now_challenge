import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/navbar";

import PersonsPage from "./pages/persons/index";
import PersonsPageAdd from "./pages/persons/add";
import PersonsPageEdit from "./pages/persons/edit";

import VehiclesPage from "./pages/vehicles/index";
import VehiclesPageAdd from "./pages/vehicles/add";
import VehiclesPageEdit from "./pages/vehicles/edit";

import OfficialsPage from "./pages/officials/index";
import OfficialsPageAdd from "./pages/officials/add";
import OfficialsPageEdit from "./pages/officials/edit";

import TokensPage from "./pages/tokens";


export const queryClient: QueryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
});

function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PersonsPage />} />

            <Route path="/persons">
              <Route index element={<PersonsPage />} />
              <Route path=":id" element={<PersonsPageEdit />} />
              <Route path="add" element={<PersonsPageAdd />} />
            </Route>

            <Route path="/vehicles">
              <Route index element={<VehiclesPage />} />
              <Route path=":id" element={<VehiclesPageEdit />} />
              <Route path="add" element={<VehiclesPageAdd />} />
            </Route>

            <Route path="/officials">
              <Route index element={<OfficialsPage />} />
              <Route path=":id" element={<OfficialsPageEdit />} />
              <Route path="add" element={<OfficialsPageAdd />} />
            </Route>

            <Route path="/tokens" element={<TokensPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
