import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css'; //الخطوط تم تنزيلها من مكتبة mui واستدعيناها هون
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import App from './App.jsx'
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')).render(
    <>
    <CssBaseline />
    <App />
    </>
)
