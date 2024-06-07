import { loadRemoteModule } from '@angular-architects/native-federation';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <div style="display: flex;">
      <div style="width: 200px;">
        <ul>
          @for(module of modules$ | async; track module.path) {
          <li>
            <a [routerLink]="module.path"> {{ module.label }}</a>
          </li>
          }
        </ul>
      </div>
      <div
        style="flex: 1; background-color: beige; width: auto; height: calc(100vh - 100px)"
      >
        <router-outlet />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  http = inject(HttpClient);
  router = inject(Router);

  title = 'host';

  modules$: Observable<Array<{ label: string; color: string; path: string }>> =
    this.http.get<any>('http://localhost:3000/manifest').pipe(
      tap((modules) => {
        const constructMicroFrontendRoutes =
          modules?.map(
            (elm) =>
              ({
                path: elm.path,
                loadChildren: () =>
                  loadRemoteModule(elm.path, './Routes').then(
                    (m) => m.appRoutes
                  ),
              } as Route)
          ) ?? [];

        

        this.router.resetConfig(constructMicroFrontendRoutes)

      })
    );
}
