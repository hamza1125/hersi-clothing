import { compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { legacy_createStore as createStore } from 'redux';
//import { thunk } from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';



const composeEnhancer =
  (process.env.NODE_ENV !== 'production' && window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};


const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(
  Boolean
);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);