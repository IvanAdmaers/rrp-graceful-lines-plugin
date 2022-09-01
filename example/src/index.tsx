import React, { StrictMode } from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

createRoot(container!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
