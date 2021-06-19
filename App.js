import React, { useEffect } from 'react';
import Main from './src/Main';

import DeviceStorageContext from './src/contexts/DeviceStorageContext';
import DeviceStorage from './src/utilities/deviceStorage';
import { StoreProvider } from './src/contexts/StoreContext';
import { initialState, reducer } from './src/productReducer';

const deviceStorage = new DeviceStorage('setting');
const unitStorage = new DeviceStorage('unit');

const App = () => {
  useEffect(() => {
    const removeOldSettings = async () => {
      await unitStorage.removeValueStored('pcs');
      await unitStorage.removeValueStored('box');
      await unitStorage.removeValueStored('peti');
    };

    removeOldSettings();
  });

  return (
    <DeviceStorageContext.Provider value={deviceStorage}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <Main />
      </StoreProvider>
    </DeviceStorageContext.Provider>
  );
};

export default App;