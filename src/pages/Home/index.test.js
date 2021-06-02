import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { PROPRIETIES_ENDPOINT } from '../../api'
import fixtures from '../../api/fixtures.json'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Home } from './index'

const server = setupServer(
  rest.get(PROPRIETIES_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(fixtures))
  })
)

const setup = async () => {
  const push = jest.fn()
  const component = render(
    <Home history={{push}} />
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