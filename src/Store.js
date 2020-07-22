import React, {createContext, useReducer} from 'react';
import { UserReducer, EmployeeReducer, initialUserState, initialEmployeeState } from './Reducers';

const initialState = {
    user: initialUserState,
    employees: initialEmployeeState
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
      let combinedReducer = [];
      UserReducer.forEach(u => combinedReducer.push(u));
      EmployeeReducer.forEach(e => combinedReducer.push(e));
      let newState = {};
      combinedReducer.forEach(reducer => {
        if(reducer.case === action.type) {
          newState = reducer.func(state, action)
        }
      });
      if(newState === {}) {
        return state
      } else {
        return newState
      }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }
