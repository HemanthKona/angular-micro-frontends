import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<h1>Red Remote 1</h1>',
  styles: '',
})
export class AppComponent {
  title = 'remote-1';
}
