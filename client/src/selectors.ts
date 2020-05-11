import { State } from './models';

export const getData = (state: State) => state.data;

export const getRequestState = ({ error, pending }: State) => ({
  error,
  pending,
});

export const getSocketState = ({ socket }: State) => socket;
