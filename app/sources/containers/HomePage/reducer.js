import { CHECK_SUCCESS, CHECK_FAIL, SUBMIT_SUCCESS, SUBMIT_FAIL } from './constants';

const initialState = {
  checkData: ''
};

const initialSubmitState = {
  a: [],
  b: '',
  text: '',
  c: '',
  submitForm: ''
}

export default function checkReducer(state = initialState, action) {
  switch (action.type) {

    case CHECK_SUCCESS:
      return {
        ...state,
        checkData: action.response
      }
    case CHECK_FAIL: 
      return {
        ...state, 
        checkData: action.response.error
      }
    default:
      return state;
  }
}

export function submitReducer(state = initialSubmitState, action) {
  switch (action.type) {
        case SUBMIT_SUCCESS:

          return {
            ...state,
            submitForm: action.response
          }
        case SUBMIT_FAIL: 
        console.log(action)
          return {
            ...state, 
            submitForm: action.response.error
          }
        default:
          return state;
      }
} 