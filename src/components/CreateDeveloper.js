import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const LABELS = [
    {
        label: 'Name'
    },
    {
        label: 'Email'
    },
    {
        label: 'Phone Number'
    },
    {
        label: 'Location'
    },
    {
        label: 'Price per hour'
    },
    {
        label: 'Years or experience'
    }
]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CreateDeveloper() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Fill the developer info
                    </Typography>
                    {LABELS.map(({ label }) => (
                        <TextField
                            key={`${label}-label`}
                            label={label}
                            variant='outlined'
                        >
                        </TextField>
                    ))}
                </Box>
            </Modal>
        </div>
    );
}
