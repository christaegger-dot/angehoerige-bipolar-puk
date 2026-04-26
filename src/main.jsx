import { createRoot } from 'react-dom/client';
import '@fontsource-variable/source-serif-4';
import '@fontsource-variable/inter-tight';
import '@fontsource-variable/jetbrains-mono';
import App from './app.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(<App />);
