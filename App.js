import React, { useEffect } from 'react';
import Main from './src/Main';

import DeviceStorageContext from './src/contexts/DeviceStorageContext';
import DeviceStorage from './src/utilities/deviceStorage';
import { StoreProvider } from './src/contexts/StoreContext';
import { initialState, reducer } from './src/productReducer';

const deviceStorage = new DeviceStorage('setting');

const App = () => {

  useEffect(() => {
    const initValue = async () => {

    };

    initValue();
  }, []);

  return (
    <DeviceStorageContext.Provider value={deviceStorage}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <Main />
      </StoreProvider>
    </DeviceStorageContext.Provider>
  );
};

export default App;