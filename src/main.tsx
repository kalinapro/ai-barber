import { createRoot } from 'react-dom/client';
import { AppConfig } from './AppConfig.tsx';

createRoot(document.getElementById('root')!).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts');
}
