import { LiveUpdateData } from './models';

interface Response {
  stream: string;
  data: LiveUpdateData[];
}

interface WebSocketActions {
  onMessage: (data: LiveUpdateData[]) => void;
  onConnect: () => void;
  onDisconnect: () => void;
  onError: (e: Event) => any;
}

const initWebSocket = ({ onError, onConnect, onDisconnect, onMessage }: WebSocketActions) => {
  const socket = new WebSocket(process.env.REACT_APP_PRODUCTS_LIVE_UPDATE_URL!);
  socket.onopen = onConnect;
  socket.onclose = onDisconnect;
  socket.onerror = onError;
  socket.onmessage = (e: MessageEvent) => {
    let data: Response = { stream: '', data: [] };
    try {
      data = JSON.parse(e.data);
    } catch (error) {
      console.error(`Error parsing : ${error}`);
    }
    if (data) {
      onMessage(data.data);
    }
  };
  return socket;
};

export default initWebSocket;
