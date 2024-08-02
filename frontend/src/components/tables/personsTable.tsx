import {
  DataGrid,
  GridAddIcon,
  GridColDef,
  GridRowParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import usePersons from '../../hooks/usePersons';
import CustomNoRowsOverlay from './emptyTableLogo';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import { Edit as EditIcon } from "@mui/icons-material";
import DeleteModal from '../modals/delete';
import { useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const columns = (deleteModal: any, editModal: any): GridColDef[] => ([
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
  { field: 'email', headerName: 'Correo Electrónico', flex: 1 },
  {
    field: "actions",
    type: "actions",
    flex: 0.5,
    getActions: (params: GridRowParams<any>) => [
      editModal(params.id),
      deleteModal(params.id),
    ],
  },
]);

export default function PersonsTable() {
  const {
    info: rows,
    isPending,
    mutate,
    isPendingDelete,
  } = usePersons();
  const navigate: NavigateFunction = useNavigate();

  const tools = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button onClick={() => navigate(`/persons/add`)}>
        <GridAddIcon />
        <Typography variant='button'>Agregar</Typography>
      </Button>
    </GridToolbarContainer>
  );
  const editModal = useCallback(
    (rowId: number) => (
      <Tooltip title='Editar'>
        <IconButton onClick={() => navigate(`/persons/${rowId}`)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    ), []
  );
  const deleteModal = useCallback(
    (rowId: number) => (
      <DeleteModal
        rowId={rowId}
        title={`Eliminar Persona ${rowId}`}
        content="Desea eliminar esta persona? Recuerde que si esta persona tiene vehículos, estos serán eliminados."
        handleDelete={mutate}
      />
    ), [mutate]
  );

  return (
    <div className='w-11/12'>
      <DataGrid
        rows={rows}
        columns={columns(deleteModal, editModal)}
        loading={isPending || isPendingDelete}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
          toolbar: tools,
        }}
        pageSizeOptions={[20, 40]}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  );
}