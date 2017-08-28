import { SELECT } from './constants';
const initialState = {
 selectedValue: {}
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT:
    return {
      ...state,
      selectedValue: action.payload
    }
    default:
      return state;
  }
}