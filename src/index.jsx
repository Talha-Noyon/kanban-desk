import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import { store, persistor } from './store/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/scss/index.scss';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
);
