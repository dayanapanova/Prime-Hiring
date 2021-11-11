import { createSlice } from "@reduxjs/toolkit";
import { localStorageKeys } from '../constants/index';
import { generateUUID } from '../utils/index';

const developersLocalStorage = localStorage.getItem(localStorageKeys.DEVELOPERS_LIST);

export const developersSlice = createSlice({
    name: 'developers',
    initialState: {
        developersList: developersLocalStorage ? JSON.parse(developersLocalStorage) : [],
        formIsOpen: false,
        formIsEdit: false,
        editDeveloperData: {},
    },
    reducers: {
        createDeveloper: (state, { payload: developerData }) => {
            state.developersList = [
                {
                    ...developerData,
                    uuid: generateUUID(),
                },
                ...state.developersList,
            ];
            state.formIsOpen = false;
        },
        editDeveloper: (state, { payload }) => {
            const { uuid, data } = payload;
            state.developersList = state.developersList?.map((currentDeveloper) => {
                if (uuid === currentDeveloper?.uuid) {
                    return ({
                        uuid,
                        ...data,
                    })
                } else {
                    return currentDeveloper;
                }
            });

            state.formIsOpen = false;
        },
        deleteDeveloper: (state, { payload: deleteUUID }) => {
            const filteredItems = state.developersList?.filter(({ uuid }) => uuid !== deleteUUID);
            state.developersList = filteredItems;
        },
        setEditDeveloperData: (state, { payload: developerData }) => {
            state.editDeveloperData = developerData;
        },
        setFormIsOpen: (state, { payload }) => {
            state.formIsOpen = payload;
        },
        setFormIsEdit: (state, { payload }) => {
            state.formIsEdit = payload;
        },
    },
})

export const {
    createDeveloper,
    editDeveloper,
    setEditDeveloperData,
    deleteDeveloper,
    setFormIsOpen,
    setFormIsEdit,
} = developersSlice.actions;

export default developersSlice.reducer;
