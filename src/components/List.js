import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Card,
    CardHeader,
    Divider,
    Grid,
    Avatar,
    IconButton,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogTitle,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    setEditDeveloperData,
    deleteDeveloper,
    setFormIsOpen,
    setFormIsEdit,
} from '../store/DevelopersSlice';

const DevelopersList = () => {
    const dispatch = useDispatch();
    const [deleteFormIsOpen, setDeleteFormIsOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const { developersList } = useSelector(({ developers }) => developers);
    const hasDevelopers = Boolean(developersList?.length);

    const onCloseDelete = () => {
        setDeleteFormIsOpen(false);
        setDeleteData({});
    };

    const onDelete = () => {
        dispatch(deleteDeveloper(deleteData?.uuid));
        setDeleteData({});
        setDeleteFormIsOpen(false);
    };

    return (
        <>
            <Container>
                {hasDevelopers ? (
                    <>
                        <Box mb={3} display='flex' justifyContent='flex-end'>
                            <Button variant='contained'>
                                Select developers
                            </Button>
                        </Box>
                        <Divider />
                        <Grid mt={3} container spacing={2}>
                            {developersList.map((developerData) => {
                                const {
                                    uuid,
                                    name,
                                    email,
                                    phoneNumber,
                                    location,
                                    pricePerHour,
                                    yearsOfExperience,
                                    language,
                                    technology,
                                } = developerData;

                                return (
                                    <Grid key={uuid} item xs={12} sm={6} md={4}>
                                        <Card>
                                            <CardHeader
                                                avatar={<Avatar>{name.substring(0, 1)}</Avatar>}
                                                action={
                                                    <>
                                                        <IconButton onClick={() => {
                                                            dispatch(setEditDeveloperData(developerData));
                                                            dispatch(setFormIsEdit(true));
                                                            dispatch(setFormIsOpen(true));
                                                        }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton onClick={() => {
                                                            setDeleteFormIsOpen(true);
                                                            setDeleteData({
                                                                uuid: developerData?.uuid,
                                                                name: developerData?.name,
                                                            });
                                                        }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </>
                                                }
                                                title={<Typography variant='subtitle1'>{name}</Typography>}
                                                subheader={email}
                                            />

                                            <Divider />

                                            <Box p={2}>
                                                <Typography>Years Experience: <strong>{yearsOfExperience}</strong></Typography>
                                                <Typography>Per hour: <strong>${pricePerHour}</strong></Typography>
                                                <Typography>Phone number: <strong>{phoneNumber}</strong></Typography>
                                                <Typography>Location: <strong>{location}</strong></Typography>
                                                <Typography>Technology: <strong>{technology}</strong></Typography>
                                                <Typography>Language: <strong>{language}</strong></Typography>
                                            </Box>

                                        </Card>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>
                ) : (
                    <Box display='flex' height='100vh' justifyContent='center' alignItems='center'>
                        <Button
                            onClick={() => dispatch(setFormIsOpen(true))}
                            size='large'
                            variant='contained'
                        >
                            Create first developer
                        </Button>
                    </Box>
                )}
            </Container>
            <Dialog open={deleteFormIsOpen} onClose={onCloseDelete}>
                <DialogTitle>
                    Are you sure to delete {deleteData?.name} ?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onCloseDelete}>Close</Button>
                    <Button onClick={onDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DevelopersList;
