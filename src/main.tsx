import {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Check if the root element exists in the HTML document
if (rootElement) {
  // If rootElement is found, create a root using createRoot and render the App inside StrictMode
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  // If the root element is not found, log an error to the consol
  console.error('Root element not found');
}
