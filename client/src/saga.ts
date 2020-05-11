import { eventChannel } from 'redux-saga';
import { take, call, put, fork, cancel, cancelled } from 'redux-saga/effects';
import setupSocket from 'api/products/websocket';
import {
  socketConnected,
  socketDataRecieved,
  socketDisconnected,
  socketDisConnect,
  socketConnect,
  socketError,
} from './actions';

function websocketInitChannel() {
  return eventChannel((emitter) => {
    // init the connection here
    const socket = setupSocket({
      onConnect: () => {
        // dispatch an action with emitter here
        emitter(socketConnected());
      },
      onDisconnect: () => {
        // dispatch an action with emitter here
        emitter(socketDisconnected());
      },
      onMessage: (data) => {
        emitter(socketDataRecieved(data));
      },
      onError: () => {
        emitter(socketError());
      },
    });

    // unsubscribe function
    return () => {
      socket.close();
    };
  });
}

function* initWebSocketSaga() {
  const channel = yield call(websocketInitChannel);
  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } finally {
    if (yield cancelled()) {
      yield put(socketDisconnected());
    }
  }
}

export default function* websocketSagas() {
  while (yield take(socketConnect.type)) {
    const websocketChannel = yield fork(initWebSocketSaga);
    yield take(socketDisConnect.type);
    yield cancel(websocketChannel);
  }
}
