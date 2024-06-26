import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="red">
      <h1>Remote Module: Red</h1>
    </div>
  `,
  styles: `
    .red {
      display: block;
      background-color: rgb(202, 145, 145);
      color: white;
      padding: 24px;
    }
  `,
})
export class AppComponent {
  title = 'remote-red';
}
