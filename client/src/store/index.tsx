import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productsLiveUpdateSaga from 'saga';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(productsLiveUpdateSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('../reducers', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('../reducers').default;
    store.replaceReducer(newRootReducer);
  });
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
