import { Component } from '@angular/core';
import { ToolbarComponent } from '../../shared/toolbar.component';
import { SidenavComponent } from '../../shared/sidenav.component';

@Component({
  selector: 'app-home',
  imports: [ToolbarComponent, SidenavComponent],
  template: `
    <app-toolbar />
    <app-sidenav />
  `,
  styles: ``,
})
export default class HomeComponent {}
