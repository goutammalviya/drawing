import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'
import { dataService } from './../Services/dataServices';
import storage from "redux-persist/lib/storage";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage

};

const persistedReducer = persistReducer(persistConfig, dataSlice);

const store = configureStore({
  reducer: {
    appData: persistedReducer,

    [dataService.reducerPath]: dataService.reducer,

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      dataService.middleware,
    )
});

const persistor = persistStore(store);

export { store, persistor };
