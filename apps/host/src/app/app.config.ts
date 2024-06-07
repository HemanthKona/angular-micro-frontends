import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { Route, Router, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { loadRemoteModule } from '@angular-architects/native-federation';

// export function getModuleFederationRoutes(modules: any[]) {
//   return (
//     modules?.map(
//       (elm) =>
//         ({
//           path: elm.path,
//           loadChildren: () =>
//             loadRemoteModule(elm.path, './Routes').then((m) => m.appRoutes),
//         } as Route)
//     ) ?? []
//   );
// }

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // {
    //   provide: APP_INITIALIZER,
    //   deps: [Router],
    //   useFactory: () => {
    //     const router = inject(Router);
    //     async () => {
    //       const manifest = await fetch(
    //         'assets/manifests/federation.manifest.json'
    //       );

    //       const routes = getModuleFederationRoutes(
    //         manifest.json() as unknown as any[]
    //       );

    //       router.resetConfig(routes);

    //       return Promise.resolve();
    //     };
    //   },
    // },
  ],
};
