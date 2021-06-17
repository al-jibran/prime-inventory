import React, { useContext, useReducer, createContext } from "react";

const StoreContext = createContext();
StoreContext.displayName = "Store";

export const useStore = useContext(StoreContext);

export const StoreProvider = (({children, initialState, reducer}) => {
    const [globalState, dispatch] = useReducer(reducer, initialState);

    return <StoreContext.Provider value={[globalState, dispatch]}>{children}</StoreContext.Provider>;
});