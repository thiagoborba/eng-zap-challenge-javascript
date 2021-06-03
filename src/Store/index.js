import React, { createContext, useReducer, useContext as reactContext } from "react";
import { INITIAL_STATE, reducer, ActionType } from "../Reducer";

const {
  UPDATE_SELECTED_PROPERTY,
} = ActionType;

export const Context = createContext();

export const Provider = ({ children }) => {
  return (
    <Context.Provider value={useReducer(reducer, INITIAL_STATE)}>
      {children}
    </Context.Provider>
  );
};

export function useContext() {
  const [state, dispatch] = reactContext(Context);

  function setSelectedProperty(property) {
    dispatch({ type: UPDATE_SELECTED_PROPERTY, payload: property });
  }

  function contextFunctions() {
    return {
      setSelectedProperty,
    };
  }

  return { state, dispatch, ...contextFunctions() };
}
