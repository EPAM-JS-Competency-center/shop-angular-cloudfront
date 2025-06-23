import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const username = process.env.USERNAME;
    const password = process.env.TEST_PASSWORD;
    const authorizationToken = btoa(`${username}:${password}`);

    localStorage.setItem('authorization_token', `Basic ${authorizationToken}`);
    console.log('Stored authorization_token:', authorizationToken);
  }
}
