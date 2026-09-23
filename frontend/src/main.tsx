import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import {BrowserRouter} from 'react-router-dom';
import AuthInitializer from './shared/Provider/AuthUtilizer.tsx';
import { Provider } from 'react-redux';
import {store} from './app/store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthInitializer/>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
