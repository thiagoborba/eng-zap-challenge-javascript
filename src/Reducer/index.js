export const ActionType = {
  UPDATE_SELECTED_PROPERTY: 'UPDATE_SELECTED_PROPERTY',
};

export const INITIAL_STATE = {
  selectedProperty: {},
};

export function reducer(state, action) {
  switch (action.type) {
    case ActionType.UPDATE_SELECTED_PROPERTY:
      return { ...state, selectedProperty: action.payload };
    default: {
      return state;
    }
  }
}
