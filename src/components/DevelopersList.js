import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container,
    Divider,
    Grid,
    Box,
    Dialog,
    DialogTitle,
    Button,
    Stack,
    Fade,
    TextField,
} from '@mui/material';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { format } from 'date-fns';
import ConfirmModal from './ConfirmModal';

import {
    setEditDeveloperData,
    deleteDeveloper,
    setFormIsOpen,
    setFormIsEdit,
    editDeveloper,
} from '../store/DevelopersSlice';
import DeveloperItem from './DeveloperItem';

const DevelopersList = () => {
    const dispatch = useDispatch();
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [confirmUnHireModelIsOpen, setConfirmUnHireModelIsOpen] = useState(false);
    const [hireModalIsOpen, setHireModalIsOpen] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState({});
    const [canSelect, setCanSelect] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [hireDate, setHireDate] = useState(new Date());

    const { developersList } = useSelector(({ developers }) => developers);
    const hasDevelopers = Boolean(developersList?.length);
    const hasSelectedItems = Boolean(selectedItems?.length);

    useEffect(() => {
        if (!canSelect) {
            setSelectedItems([]);
        }
    }, [canSelect]);

    useEffect(() => {
        if (!hireModalIsOpen) {
            setHireDate(new Date());
        }
    }, [hireModalIsOpen]);

    useEffect(() => {
        if (!deleteModalIsOpen) {
            setSelectedDeveloper({});
        }
    }, [deleteModalIsOpen]);

    useEffect(() => {
        if (!confirmUnHireModelIsOpen) {
            setSelectedDeveloper({});
        }
    }, [confirmUnHireModelIsOpen]);


    const onDelete = () => {
        dispatch(deleteDeveloper(selectedDeveloper?.uuid));
        setSelectedDeveloper({});
        setDeleteModalIsOpen(false);
    };

    const onHire = () => {
        selectedItems?.map((item) => dispatch(editDeveloper({
            uuid: item?.uuid,
            data: {
                ...item,
                isHired: true,
                hiredOn: format(hireDate, 'MM/dd/yyyy'),
            }
        })))
        setHireModalIsOpen(false);
        setCanSelect(false);
    };

    const onUnHire = () => {
        dispatch(editDeveloper({
            uuid: selectedDeveloper?.uuid,
            data: {
                ...selectedDeveloper,
                isHired: false,
                hiredOn: '',
            }
        }));

        setConfirmUnHireModelIsOpen(false);
    }

    return (
        <>
            <Container>
                {hasDevelopers ? (
                    <>
                        <Box mb={3} display='flex' justifyContent='flex-end'>
                            <Stack direction='row' spacing={2}>
                                <Fade in={hasSelectedItems}>
                                    <Button onClick={() => setHireModalIsOpen(true)} variant='contained'>Hire selected</Button>
                                </Fade>
                                <Button onClick={() => setCanSelect(!canSelect)} color={canSelect ? 'error' : 'primary'} variant='contained'>
                                    {canSelect ? 'Close select' : 'Select developers'}
                                </Button>
                            </Stack>
                        </Box>
                        <Divider />
                        <Grid mt={3} container spacing={2}>
                            {developersList.map((developerData) => {
                                const { uuid } = developerData;

                                return (
                                    <Grid key={uuid} item xs={12} sm={6} md={4}>
                                        <DeveloperItem
                                            {...developerData}
                                            onEditClick={() => {
                                                dispatch(setEditDeveloperData(developerData));
                                                dispatch(setFormIsEdit(true));
                                                dispatch(setFormIsOpen(true));
                                            }}
                                            onDeleteClick={() => {
                                                setDeleteModalIsOpen(true);
                                                setSelectedDeveloper(developerData);
                                            }}
                                            onSelect={(ev) => {
                                                const isChecked = ev.currentTarget.checked;
                                                if (isChecked) {
                                                    setSelectedItems([...selectedItems, developerData])
                                                } else {
                                                    setSelectedItems(selectedItems.filter((currentItem) => currentItem.uuid !== uuid));
                                                }
                                            }}
                                            onUnHireClick={() => {
                                                setConfirmUnHireModelIsOpen(true);
                                                setSelectedDeveloper(developerData);
                                            }}
                                            {...{ canSelect }}
                                        />
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

            <ConfirmModal
                isOpen={deleteModalIsOpen}
                onClose={() => setDeleteModalIsOpen(false)}
                confirmButtonText='Delete'
                title={`Are you sure to delete ${selectedDeveloper?.name} ?`}
                onConfirm={onDelete}
            />

            <ConfirmModal
                isOpen={confirmUnHireModelIsOpen}
                onClose={() => setConfirmUnHireModelIsOpen(false)}
                confirmButtonText='Confirm'
                title={`${selectedDeveloper?.name} hired on ${selectedDeveloper?.hiredOn}, confirm unhire ?`}
                onConfirm={onUnHire}
            />

            <Dialog open={hireModalIsOpen} onClose={() => setHireModalIsOpen(false)}>
                <DialogTitle>
                    Select hire date
                </DialogTitle>
                <StaticDatePicker
                    minDate={new Date()}
                    orientation="landscape"
                    openTo="day"
                    value={hireDate}
                    onChange={(newValue) => setHireDate(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Stack p={3} direction='row' justifyContent='center' spacing={2}>
                    <Button size='large' onClick={() => setHireModalIsOpen(false)}>Close</Button>
                    <Button size='large' onClick={onHire} variant='contained'>
                        Hire developers
                    </Button>
                </Stack>
            </Dialog>
        </>
    );
}

export default DevelopersList;
