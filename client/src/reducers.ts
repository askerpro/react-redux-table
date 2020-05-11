import { createReducer } from '@reduxjs/toolkit';
import { State } from './models';
import {
  fetch,
  socketDataRecieved,
  changeIsFavorite,
  socketConnected,
  socketConnect,
  socketDisconnected,
  socketError,
} from './actions';

const initialState: State = {
  pending: false,
  socket: 'disconnected',
  error: '',
  data: {},
};

const reducer = createReducer(initialState, (builder) =>
  builder
    .addCase(fetch.pending, (draft) => {
      draft.pending = true;
    })
    .addCase(fetch.fulfilled, (draft, action) => {
      draft.pending = false;
      action.payload.forEach((Coin) => {
        draft.data[Coin.s] = {
          id: Coin.s,
          lastPrice: Coin.c,
          change: 0,
          isFavorite: false,
          pn: Coin.pn,
          q: Coin.q,
          b: Coin.b,
          volume: Coin.v,
        };
      });
    })
    .addCase(fetch.rejected, (draft, action) => {
      draft.pending = false;
      draft.error = action.error.message!;
    })
    .addCase(socketDataRecieved, (draft, action) => {
      action.payload.forEach((Coin) => {
        const { lastPrice } = draft.data[Coin.s]!;
        const newPrice = parseFloat(Coin.c);
        draft.data[Coin.s].change = (newPrice - lastPrice) / lastPrice;
        draft.data[Coin.s].lastPrice = newPrice;
        draft.data[Coin.s].volume = parseFloat(Coin.v);
      });
    })
    .addCase(changeIsFavorite, (draft, action) => {
      const state = draft.data[action.payload].isFavorite;
      draft.data[action.payload].isFavorite = !state;
    })
    .addCase(socketConnected, (draft) => {
      draft.socket = 'connected';
    })
    .addCase(socketConnect, (draft) => {
      draft.socket = 'connecting';
    })
    .addCase(socketDisconnected, (draft) => {
      draft.socket = 'disconnected';
    })
    .addCase(socketError, (draft) => {
      draft.socket = 'error';
    }),
);

export default reducer;
