import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // parameterised routes can't be prerendered without knowing the ids upfront,
  // so they render in the browser instead
  {
    path: 'dashboard/roles/:id/permissions',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
