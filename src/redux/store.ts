import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./rootReducer"
import { persistStore } from 'redux-persist';

const makeStore = () => {
  const middleware = [thunk]
  var store: any;
  const { persistReducer } = require('redux-persist');
  const storage = require('redux-persist/lib/storage').default;
  const persistConfig = {
    key: 'nextjs',
    whitelist: [
      'patient'
    ],
    storage
  };
  store = createStore(persistReducer(persistConfig, rootReducer), compose(applyMiddleware(...middleware)));
  const persistor = persistStore(store, {}, () => {
    persistor.persist();
  });
  store.__PERSISTOR = persistor;
  return store;
}

export const wrapper = createWrapper(makeStore)