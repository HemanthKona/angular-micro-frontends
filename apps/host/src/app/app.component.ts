import { loadRemoteModule } from '@angular-architects/native-federation';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <div style="display: flex;">
      <div style="width: 200px;">
        <ul>
          @for(module of modules; track module.path) {
          <li>
            <a [routerLink]="module.path"
              >{{ module.path }} : {{ module.label }}</a
            >
          </li>
          }
        </ul>
      </div>
      <div
        style="flex: 1; background-color: beige; width: auto; height: calc(100vh - 100px)"
      >
        <router-outlet></router-outlet>
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
  appService = inject(AppService);

  title = 'host';

  modules = this.appService.modules;
}
