import React, { useReducer } from 'react'
import { fireEvent, render } from '@testing-library/react'
import fixtures from '../../api/fixtures.json'
import { INITIAL_STATE as state, reducer } from '../../Reducer'
import { Context } from '../../Store'
import { Details } from './index'

const INITIAL_STATE = {
  ...state,
  selectedProperty: fixtures[2]
}

const setup = async (initialState = INITIAL_STATE) => {
  const goBack = jest.fn();

  const Provider = ({ children }) => {
    return (
      <Context.Provider value={useReducer(reducer, initialState)}>
        {children}
      </Context.Provider>
    );
  };

  const component = render(
    <Provider>
      <Details history={{ goBack }} />
    </Provider>
  );
  return { component };
};

test('shoud render the page ans click on back button', async () => {
  const {
    component: { getByTestId },
  } = await setup();

  const back = getByTestId('back')

  fireEvent.click(back)
})