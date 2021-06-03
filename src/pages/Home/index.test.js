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

const serverForScreenAction = setupServer(
  rest.get(PROPRIETIES_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(fixtures.getPropertiesResponse))
  })
)

const serverBusinessRulesZap = setupServer(
  rest.get(PROPRIETIES_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json([
      ...fixtures.zapValidProperties,
      ...fixtures.zapInvalidProperties,
    ]))
  })
)

const serverBusinessRulesViva = setupServer(
  rest.get(PROPRIETIES_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json([
      ...fixtures.vivaRealValidProperties,
      ...fixtures.vivaRealInvalidProperties
    ]))
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

describe('should test screen actions', () => {
  beforeAll(() => serverForScreenAction.listen())
  afterEach(() => serverForScreenAction.resetHandlers())
  afterAll(() => serverForScreenAction.close())

  it('shoud render the page', async () => {
    const {
      component: { getByTestId },
    } = await setup();
  
    const loader = getByTestId('loader')
  
    expect(loader).toBeVisible()
    await waitFor(() => expect(loader).not.toBeVisible())
  })
  
  it('should filter zap proprieties and click on the card', async () => {
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
  
  it('should filter viva proprieties and click on the card', async () => {
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
})

describe('should test business rules zap', () => {
  beforeAll(() => serverBusinessRulesZap.listen())
  afterEach(() => serverBusinessRulesZap.resetHandlers())
  afterAll(() => serverBusinessRulesZap.close())

  it('should render valids properties for zap', async () => {
    const {
      component: { getByTestId, getAllByTestId },
    } = await setup();

    const loader = getByTestId('loader')
  
    expect(loader).toBeVisible()
    await waitFor(() => expect(loader).not.toBeVisible())
  
    const zap = getByTestId('zap-button')
  
    fireEvent.click(zap)

    const container = getAllByTestId('container')[0]
  
    expect(container.children.length).toBe(2)
  })
})

describe('should test business rules viva', () => {
  beforeAll(() => serverBusinessRulesViva.listen())
  afterEach(() => serverBusinessRulesViva.resetHandlers())
  afterAll(() => serverBusinessRulesViva.close())

  it('should render valids properties for viva', async () => {
    const {
      component: { getByTestId, getAllByTestId },
    } = await setup();
  
    const loader = getByTestId('loader')
  
    expect(loader).toBeVisible()
    await waitFor(() => expect(loader).not.toBeVisible())
  
    const viva = getByTestId('viva-button')
  
    fireEvent.click(viva)
  
    const container = getAllByTestId('container')[0]
  
    expect(container.children.length).toBe(2)
  })
})