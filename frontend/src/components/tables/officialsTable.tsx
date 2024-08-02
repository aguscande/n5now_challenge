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
import CustomNoRowsOverlay from './emptyTableLogo';
import useOfficials from '../../hooks/useOfficials';
import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { Edit as EditIcon } from "@mui/icons-material";
import DeleteModal from '../modals/delete';

const columns = (deleteModal: any, editModal: any): GridColDef[] => ([
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
  { field: 'number', headerName: 'Identificador Único', type: 'number', flex: 1 },
  {
    field: "actions",
    type: "actions",
    flex: 2.5,
    getActions: (params: GridRowParams<any>) => [
      editModal(params.id),
      deleteModal(params.id),
    ],
  },
]);

export default function OfficialsTable() {
  const {
    info: rows,
    isPending,
    mutate,
    isPendingDelete,
  } = useOfficials();
  const navigate: NavigateFunction = useNavigate();

  const tools = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Button onClick={() => navigate(`/officials/add`)}>
        <GridAddIcon />
        <Typography variant='button'>Agregar</Typography>
      </Button>
    </GridToolbarContainer>
  );
  const editModal = useCallback(
    (rowId: number) => (
      <Tooltip title='Editar'>
        <IconButton onClick={() => navigate(`/officials/${rowId}`)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
    ), []
  );
  const deleteModal = useCallback(
    (rowId: number) => (
      <DeleteModal
        rowId={rowId}
        title={`Eliminar Oficial ${rowId}`}
        content="Desea eliminar este oficial?"
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