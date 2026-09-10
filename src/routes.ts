import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  QUESTION1: 'question1',
  QUESTION2: 'question2',
  QUESTION3: 'question3',
  QUESTION4: 'question4',
  QUESTION5: 'question5',
  QUESTION6: 'question6',
  RESULTS: 'results',
  PERSIK: 'persik',
  CATALOG: 'catalog',
  SELECTED: 'selected',
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(
        DEFAULT_VIEW_PANELS.HOME,
        '/',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.QUESTION1,
        '/question1',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.QUESTION2,
        '/question2',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.QUESTION3,
        '/question3',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.QUESTION4,
        '/question4',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.QUESTION5,
        '/question5',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.QUESTION6,
        '/question6',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.RESULTS,
        '/results',
        [],
      ),

      createPanel(
        DEFAULT_VIEW_PANELS.PERSIK,
        '/persik',
        [],
      ),

      createPanel(
  DEFAULT_VIEW_PANELS.CATALOG,
  '/catalog',
  [],
),

      createPanel(
  DEFAULT_VIEW_PANELS.SELECTED,
  '/selected',
  [],
),
      
      
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());