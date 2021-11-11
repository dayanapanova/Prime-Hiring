import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import List from './components/List';
import DeveloperModalForm from './components/DeveloperModalForm';
import { store } from './store';
import { localStorageKeys } from './constants/index';

store.subscribe(() => {
  const currentState = store.getState();
  localStorage.setItem(localStorageKeys.DEVELOPERS_LIST, JSON.stringify(currentState?.developers?.developersList));
})

function App() {
  const [formIsOpen, setFormIsOpen] = useState(false);
  return (
    <Box mt={12}>
      <Header {...{ setFormIsOpen }} />
      <List />
      <DeveloperModalForm
        isOpen={formIsOpen}
        onClose={() => setFormIsOpen(false)}
      />
    </Box>
  );
}

export default App;
