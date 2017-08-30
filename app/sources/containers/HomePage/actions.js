import { CHECK_REQUEST, SUBMIT_REQUEST } from './constants';

export default function (data) {
  return {
    type: CHECK_REQUEST,
    payload: {
      value: data
    }
  };
}

export function submit (data) {
  return {
    type: SUBMIT_REQUEST,
    payload: {
      data
    }
  };
} 