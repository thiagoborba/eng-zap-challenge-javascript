export const ActionType = {
  UPDATE_SELECTED_PROPERTY: 'UPDATE_SELECTED_PROPERTY',
  RESET_SELECTED_PROPERTY: 'RESET_SELECTED_PROPERTY',
  UPDATE_TOAST: 'UPDATE_TOAST'
};

export const INITIAL_STATE = {
  selectedProperty: {},
  toast: {
    show: false,
    type: '',
    message: ''
  }
};

export function reducer(state, action) {
  switch (action.type) {
    case ActionType.UPDATE_SELECTED_PROPERTY:
      return { ...state, selectedProperty: action.payload };
    case ActionType.RESET_SELECTED_PROPERTY:
      return { ...state, selectedProperty: INITIAL_STATE.selectedProperty };
    case ActionType.UPDATE_TOAST:
      return { ...state, toast: action.payload };
    default: {
      return state;
    }
  }
}
