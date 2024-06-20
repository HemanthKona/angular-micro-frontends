import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { Route, Router, provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { AppService } from './app.service';

export function getModuleFederationRoutes(modules: any[]) {
  return (
    modules?.map(
      (elm) =>
        ({
          path: elm.path,
          loadChildren: () =>
            loadRemoteModule(elm.path, './Routes').then((m) => m.routes),
        } as Route)
    ) ?? []
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    AppService,
    {
      provide: APP_INITIALIZER,
      deps: [HttpClient, Router, AppService],
      multi: true,
      useFactory: () => {
        const http = inject(HttpClient);
        const router = inject(Router);
        const appService = inject(AppService);

        return async () => {
          const modules = await firstValueFrom(
            http.get('http://localhost:3000/manifest')
          );

          appService.modules = modules;

          const routes = getModuleFederationRoutes(modules as unknown as any[]);

          router.resetConfig(routes);

          return Promise.resolve();
        };
      },
    },
  ],
};
