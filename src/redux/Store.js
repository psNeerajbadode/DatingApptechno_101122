import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Rootreducer from './reducer/Rootreducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, Rootreducer);

let store = createStore(persistedReducer);
// let store = createStore(rootReducer);

export let persistor = persistStore(store);
export default store;
