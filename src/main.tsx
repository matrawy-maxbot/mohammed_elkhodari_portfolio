import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// تجاهل أخطاء امتدادات المتصفح
window.addEventListener('error', (event) => {
	if (event.message?.includes('Could not establish connection')) {
		event.preventDefault();
	}
});

window.addEventListener('unhandledrejection', (event) => {
	if (event.reason?.message?.includes('Could not establish connection')) {
		event.preventDefault();
	}
});

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
