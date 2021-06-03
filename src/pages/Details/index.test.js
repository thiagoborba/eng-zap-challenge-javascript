import React, { useReducer } from 'react'
import { fireEvent, render } from '@testing-library/react'
import fixtures from '../../api/fixtures.json'
import { INITIAL_STATE, reducer } from '../../Reducer'
import { Context } from '../../Store'
import { Details } from './index'

const INITIAL_STATE_WITH_SELECTED_PROPERTY = {
  ...INITIAL_STATE,
  selectedProperty: fixtures[2]
}

const setup = async (initialState = INITIAL_STATE_WITH_SELECTED_PROPERTY) => {
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

describe('Pages > Details', () => {
  it('shoud render the page', async () => {
    await setup(INITIAL_STATE_WITH_SELECTED_PROPERTY);
  })

  // it('should click on the back button', async () => {
  //   const {
  //     component: { getByTestId },
  //   } = await setup(INITIAL_STATE_WITH_SELECTED_PROPERTY);

  
  //   const back = getByTestId('back')

  //   expect(back).toBeVisible()
  
  //   fireEvent.click(back)
  // })
})