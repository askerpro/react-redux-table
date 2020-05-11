import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import productsApi from 'api/products';
import { LiveUpdateData } from 'api/products/models';

enum ActionTypes {
  FETCH = 'products/FETCH',
  SOCKET_ERROR = 'products/SOCKET_ERROR',
  SOCKET_CONNECT = 'products/SOCKET_CONNECT',
  SOCKET_CONNECTED = 'products/SOCKET_CONNECTED',
  SOCKET_DISCONNECT = 'products/SOCKET_DISCONNECT',
  SOCKET_DISCONNECTED = 'products/SOCKET_DISCONNECTED',
  SOCKET_DATA_RECIEVED = 'products/SOCKET_DATA_RECIEVED',
  CHANGE_IS_FAVORITE = 'products/CHANGE_IS_FAVORITE',
}

export const socketConnected = createAction(ActionTypes.SOCKET_CONNECTED);

export const socketDisconnected = createAction(ActionTypes.SOCKET_DISCONNECTED);

export const socketDataRecieved = createAction<LiveUpdateData[], ActionTypes.SOCKET_DATA_RECIEVED>(
  ActionTypes.SOCKET_DATA_RECIEVED,
);

export const changeIsFavorite = createAction<string, ActionTypes.CHANGE_IS_FAVORITE>(
  ActionTypes.CHANGE_IS_FAVORITE,
);

export const socketConnect = createAction(ActionTypes.SOCKET_CONNECT);

export const socketDisConnect = createAction(ActionTypes.SOCKET_DISCONNECT);

export const socketError = createAction(ActionTypes.SOCKET_ERROR);

export const fetch = createAsyncThunk(ActionTypes.FETCH, async (a, thunkAPI) => {
  const products = await productsApi.getAll();

  thunkAPI.dispatch(socketConnect());
  return products;
});
