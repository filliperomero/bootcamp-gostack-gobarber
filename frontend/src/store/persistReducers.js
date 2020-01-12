import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',
      storage,
      whitelist: ['auth', 'user'], // Here we put all the reducers we want to keep the informations
    },
    reducers
  );

  return persistedReducer;
};
