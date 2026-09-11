import { createRoot } from 'react-dom/client';
import vkBridge from '@vkontakte/vk-bridge';
import { AppConfig } from './AppConfig.tsx';

// Bridge is also unavailable in a regular browser preview. Initialization must
// not prevent the application from rendering in that environment.
void vkBridge.send('VKWebAppInit').catch((error) => {
  console.info('VK Bridge недоступен вне VK:', error);
});

createRoot(document.getElementById('root')!).render(<AppConfig />);

if (import.meta.env.MODE === 'development') {
  import('./eruda.ts');
}
