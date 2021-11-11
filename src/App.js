import React from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import DevelopersList from './components/DevelopersList';
import DeveloperModalForm from './components/DeveloperModalForm';
import { store } from './store';
import { localStorageKeys } from './constants/index';

store.subscribe(() => {
  const currentState = store.getState();
  localStorage.setItem(localStorageKeys.DEVELOPERS_LIST, JSON.stringify(currentState?.developers?.developersList));
})

function App() {
  return (
    <Box mt={12}>
      <Header />
      <DevelopersList />
      <DeveloperModalForm />
    </Box>
  );
}

export default App;
