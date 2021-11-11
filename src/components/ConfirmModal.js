import {
    Dialog,
    DialogActions,
    DialogTitle,
    Button,
} from '@mui/material';

const ConfirmModal = ({ title, confirmButtonText, isOpen, onConfirm, onClose }) => (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onConfirm}>
                {confirmButtonText}
            </Button>
        </DialogActions>
    </Dialog>
);

export default ConfirmModal;
