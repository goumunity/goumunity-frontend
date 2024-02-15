import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { CookiesProvider } from 'react-cookie';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
   </CookiesProvider>
  // </React.StrictMode>
);

