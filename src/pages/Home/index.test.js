import React, { useReducer } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { PROPRIETIES_ENDPOINT } from '../../api'
import fixtures from '../../api/fixtures.json'
import { INITIAL_STATE, reducer } from '../../Reducer'
import { Context } from '../../Store'
import { Home } from './index'
import '@testing-library/jest-dom/extend-expect'

const server = setupServer(
  rest.get(PROPRIETIES_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(fixtures))
  })
)

const setup = async (initialState = INITIAL_STATE) => {
  const push = jest.fn();

  const Provider = ({ children }) => {
    return (
      <Context.Provider value={useReducer(reducer, initialState)}>
        {children}
      </Context.Provider>
    );
  };

  const component = render(
    <Provider>
      <Home history={{ push }} />
    </Provider>
  );
  return { component };
};

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shoud render the page', async () => {
  const {
    component: { getByTestId },
  } = await setup();

  const loader = getByTestId('loader')

  expect(loader).toBeVisible()
  await waitFor(() => expect(loader).not.toBeVisible())
})

test('should filter zap proprieties and click on the card', async () => {
  const {
    component: { getByTestId },
  } = await setup();

  const loader = getByTestId('loader')

  expect(loader).toBeVisible()
  await waitFor(() => expect(loader).not.toBeVisible())

  const ZapButton = getByTestId('zap-button')

  fireEvent.click(ZapButton)

  const card = getByTestId('card-0')

  fireEvent.click(card)
})

test('should filter viva proprieties and click on the card', async () => {
  const {
    component: { getByTestId },
  } = await setup();

  const loader = getByTestId('loader')

  expect(loader).toBeVisible()
  await waitFor(() => expect(loader).not.toBeVisible())

  const vivaButton = getByTestId('viva-button')

  fireEvent.click(vivaButton)

  const card = getByTestId('card-0')

  fireEvent.click(card)
})