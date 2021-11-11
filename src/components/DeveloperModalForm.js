/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
    Button,
    Typography,
    TextField,
    Dialog,
    DialogContent,
    Stack,
    Grid,
} from '@mui/material';
import Select from './Select';
import {
    createDeveloper,
    editDeveloper,
    setFormIsOpen,
    setEditDeveloperData,
    setFormIsEdit,
} from '../store/DevelopersSlice';

const DeveloperModalForm = () => {
    const dispatch = useDispatch();

    const {
        formIsOpen,
        editDeveloperData,
        formIsEdit,
    } = useSelector(({ developers }) => developers);

    const onClose = () => dispatch(setFormIsOpen(false));

    const validations = Yup.object().shape({
        name: Yup.string()
            .required()
            .label('Name'),
        email: Yup.string()
            .email()
            .required()
            .label('Email'),
        phoneNumber: Yup.string()
            .required()
            .label('Phone number'),
        location: Yup.string()
            .required()
            .label('Location'),
        pricePerHour: Yup.number()
            .required()
            .label('Price per hour'),
        yearsOfExperience: Yup.number()
            .required()
            .label('Years of experience'),
        language: Yup.string()
            .required()
            .label('Native language'),
        technology: Yup.string()
            .required()
            .label('Technology'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(validations) });


    useEffect(() => {
        if (!formIsOpen) {
            dispatch(setFormIsEdit(false));
            reset({});
            dispatch(setEditDeveloperData({}));
        }
    }, [formIsOpen]);

    useEffect(() => {
        if (formIsEdit) {
            reset(editDeveloperData);
        }
    }, [editDeveloperData, formIsEdit]);

    const FIELDS = [
        {
            component: TextField,
            label: 'Name',
            name: 'name',
        },
        {
            component: TextField,
            label: 'Email',
            name: 'email',
        },
        {
            component: TextField,
            label: 'Phone Number',
            name: 'phoneNumber'
        },
        {
            component: TextField,
            label: 'Location',
            name: 'location',
        },
        {
            component: TextField,
            label: 'Price per hour',
            name: 'pricePerHour',
        },
        {
            component: TextField,
            label: 'Years or experience',
            name: 'yearsOfExperience',
        },
        {
            component: Select,
            label: 'Language',
            name: 'language',
            componentProps: {
                defaultValue: editDeveloperData?.language,
                options: [
                    {
                        label: 'Bulgarian',
                        value: 'Bulgarian',
                    },
                    {
                        label: 'Serbian',
                        value: 'Serbian',
                    },
                    {
                        label: 'English',
                        value: 'English',
                    }
                ],
            }
        },
        {
            component: Select,
            label: 'Technology',
            name: 'technology',
            componentProps: {
                defaultValue: editDeveloperData?.technology,
                options: [
                    {
                        label: 'JavaScript',
                        value: 'JavaScript',
                    },
                    {
                        label: 'Java',
                        value: 'Java',
                    },
                    {
                        label: 'Flutter',
                        value: 'Flutter',
                    }
                ],
            }
        }
    ];

    return (
        <Dialog open={formIsOpen} {...{ onClose }}>
            <DialogContent>
                <Typography mb={3} variant="h6" component="h2" align='center'>
                    {formIsEdit ? `Edit developer - ${editDeveloperData?.name}` : 'Create a new developer'}
                </Typography>
                <form onSubmit={handleSubmit((data) => {
                    if (formIsEdit) {
                        dispatch(editDeveloper({ uuid: editDeveloperData?.uuid, data }))
                    } else {
                        dispatch(createDeveloper(data))
                    }
                })}>
                    <Grid container spacing={3}>
                        {FIELDS.map(({
                            label,
                            name,
                            component: Component,
                            componentProps,
                        }) => (
                            <Grid item sm={6} xs={12}>
                                <Component
                                    key={`field-${name}-${label}`}
                                    {...{ label, name }}
                                    variant='outlined'
                                    fullWidth
                                    error={Boolean(errors?.[name]?.message)}
                                    helperText={errors?.[name]?.message}
                                    {...register(name)}
                                    {...componentProps}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    <Stack mt={3} direction='row' justifyContent='flex-end' spacing={2}>
                        <Button onClick={onClose} variant='outlined' color='secondary' size='large'>
                            Close
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            type='submit'
                        >
                            {formIsEdit ? 'Edit' : 'Create'}
                        </Button>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default DeveloperModalForm;
