import { Component } from '@angular/core';
import { SharedService } from '../app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mobifx';

  constructor(
    public sharedservice: SharedService,
    public router: Router
  ) {
  }
}
