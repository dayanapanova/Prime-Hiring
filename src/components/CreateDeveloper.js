import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const LABELS = [
    {
        label: 'Name',
        width: 'true'
    },
    {
        label: 'Email',
        width: 'true'
    },
    {
        label: 'Phone Number',
        width: 'true'
    },
    {
        label: 'Location',
        width: 'false'
    },
    {
        label: 'Price per hour',
        width: 'false'
    },
    {
        label: 'Years or experience',
        width: 'false'
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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


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
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                        Fill the developer info
                    </Typography>
                    {LABELS.map(({ label, width }) => (
                        <TextField
                            size="small"
                            key={`${label}-label`}
                            label={label}
                            variant='outlined'
                            margin='normal'
                            fullWidth={width}
                        >
                        </TextField>
                    ))}
                    <FormControl
                        margin="dense"
                        fullWidth="true"
                    >
                        <InputLabel
                            margin="dense"
                            id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            size="small"
                            autoWidth="true"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Native language"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Bulgarian</MenuItem>
                            <MenuItem value={20}>Serbian</MenuItem>
                            <MenuItem value={30}>English</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        margin="dense"
                        fullWidth="true"
                    >
                        <InputLabel
                            margin="dense"
                            id="demo-simple-select-label">Techology</InputLabel>
                        <Select
                            size="small"
                            autoWidth="true"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Native language"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>JavaScript</MenuItem>
                            <MenuItem value={20}>Java</MenuItem>
                            <MenuItem value={30}>Flutter</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        fullWidth="true"
                        color='primary'
                        size='large'
                        variant='contained'
                    >Create Developer</Button>
                </Box>
            </Modal>
        </div >
    );
}
