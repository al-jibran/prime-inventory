import React, { useEffect } from 'react';
import Main from './src/Main';

import UnitStorageContext from './src/contexts/UnitStorageContext';
import UnitStorage from './src/utilities/unitStorage';
import { StoreProvider } from './src/contexts/StoreContext';
import { initialState, reducer } from './src/productReducer';

const unitStorage = new UnitStorage();

const App = () => {

  useEffect(() => {
    const initValue = async () => {

    };

    initValue();
  }, []);

  return (
    <UnitStorageContext.Provider value={unitStorage}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <Main />
      </StoreProvider>
    </UnitStorageContext.Provider>
  );
};

export default App;