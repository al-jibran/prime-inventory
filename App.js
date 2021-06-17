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
      const pcsValue = await unitStorage.getUnitValue("pcs");
      const boxValue = await unitStorage.getUnitValue("box");
      const petiValue = await unitStorage.getUnitValue("peti");

      if (!pcsValue) {
        console.log("Setting pc value");
        await unitStorage.setUnitValue("pcs", "1");
      }
      if (!boxValue) {
        console.log("Setting box value");
        await unitStorage.setUnitValue("box", "20");
      }

      if (!petiValue) {
        console.log("Setting peti value");
        await unitStorage.setUnitValue("peti", "10");
      }
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