import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import flightReducer from '../pages/Flights/flightsSlice';
import appReducer from "../appSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        app: appReducer,
        flights: flightReducer
      }, preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}


export * from '@testing-library/react'
// override render method
export { render }