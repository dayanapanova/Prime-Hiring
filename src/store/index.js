import { configureStore } from '@reduxjs/toolkit';
import developersReducer from './DevelopersSlice';

export const store = configureStore({
    reducer: {
        developers: developersReducer,
    },
})