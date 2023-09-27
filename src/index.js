import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from './hooks/useToast.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <ToastProvider>
      <App />
    </ToastProvider>
  </RecoilRoot>
);
