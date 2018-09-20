import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  let initialState = null;
  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token upon login', () => {
    const action = { type: actionTypes.AUTH_SUCCESS, idToken: 'some', userId: 'someUserId' };
    const updatedState = {
      token: 'some',
      userId: 'someUserId',
      error: null,
      loading: false,
      authRedirectPath: '/'
    };
    expect(reducer(initialState, action)).toEqual(updatedState);
  });
});
