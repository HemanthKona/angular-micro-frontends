import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="green">
      <h1>Green</h1>
    </div>
  `,
  styles: `
    .green {
      display: block;
      background-color: green;
      color: white;
    }
  `
  })
export class AppComponent {
  title = 'remote-2';
}
