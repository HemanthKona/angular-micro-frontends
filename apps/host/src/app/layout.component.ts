import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    OverlayModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatFormFieldModule,
    RouterLink,
    RouterLinkActive,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #navDrawer
        #sidenav
        class="sidenav"
        disableClose
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
      >
        <mat-toolbar color="primary"><h2>Menu</h2></mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLinkActive="active" routerLink="/">
            <mat-icon matListItemIcon>home</mat-icon>
            Home
          </a>
          @for (module of modules(); track module.path) {
          <a mat-list-item routerLinkActive="active" [routerLink]="module.path">
            <mat-icon matListItemIcon [style.color]="module.color">
              home
            </mat-icon>
            {{ module.label }}
          </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" style="z-index: 9999;">
          @if (isHandset$ | async) {
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="navDrawer.toggle()"
          >
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          }
          <h1>{{ title }}</h1>
          <div style="flex: 1; padding-left: var(--size-1)"></div>
        </mat-toolbar>
        <!-- Add Content Here -->
        <main class="main-container">
          <ng-content></ng-content>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: `

    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 230px;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .main-container {
      padding: var(--size-2);
    }

  `,
})
export class LayoutComponent {
  title = 'Micro Frontend using Angular Native Federation';
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private breakpointObserver = inject(BreakpointObserver);
  router = inject(Router);
  configService = inject(ConfigService);

  modules = this.configService.modules;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 900px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor() {}
}
