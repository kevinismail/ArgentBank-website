import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilise localStorage par défaut

const persistConfig = {
 key: 'root',
 storage,
};
//persist a été utilisé pour éviter la déconnexion lorsqu'on actualisait la page
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
 reducer: {
    auth: persistedReducer,
 },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
   
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
