import { loadRemoteModule } from '@angular-architects/native-federation';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';
import { LayoutComponent } from './layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe, LayoutComponent],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  styles: [],
})
export class AppComponent {
  appService = inject(AppService);

  title = 'host';

  modules = this.appService.modules;
}
