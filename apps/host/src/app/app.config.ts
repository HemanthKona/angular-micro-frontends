import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { Route, Router, provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { AppService } from './app.service';
import { ConfigService } from './config.service';

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
    provideAnimations(),
    AppService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      deps: [HttpClient, Router, AppService],
      multi: true,
      useFactory: () => {
        const http = inject(HttpClient);
        const router = inject(Router);
        const appService = inject(AppService);
        const configService = inject(ConfigService);

        return async () => {
          const modules = await firstValueFrom(
            http.get('http://localhost:3000/manifest')
          );

          appService.modules = modules;
          configService.modules.set(modules);

          const routes = getModuleFederationRoutes(modules as unknown as any[]);

          router.resetConfig(routes);

          return Promise.resolve();
        };
      },
    },
  ],
};
