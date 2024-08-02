import { Delete } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useState } from 'react';

export default function DeleteModal({
  rowId,
  title,
  content,
  handleDelete,
}: {
  rowId: number,
  title: string,
  content: string,
  handleDelete: (id: number) => void,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndDelete = () => {
    handleDelete(rowId);
    setOpen(false);
  }

  return (
    <Fragment>
      <Tooltip title='Borrar'>
        <IconButton onClick={handleClickOpen}>
          <Delete />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleCloseAndDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
