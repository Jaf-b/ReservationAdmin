import { Component, input } from '@angular/core';

@Component({
  selector: 'app-manage-description',
  imports: [],
  template: ` <p>manage-description works!</p> `,
  styles: ``,
})
export class ManageDescriptionComponent {
  description = input.required<string>();
}
