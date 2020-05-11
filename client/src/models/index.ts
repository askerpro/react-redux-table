export interface Data {
  id: string;
  isFavorite: boolean;
  lastPrice: number;
  change: number;
  pn: string;
  q: string;
  b: string;
  volume: number;
}

export interface State {
  pending: boolean;
  error: string;
  socket: 'connecting' | 'connected' | 'disconnected' | 'error';
  data: {
    [key: string]: Data;
  };
}
