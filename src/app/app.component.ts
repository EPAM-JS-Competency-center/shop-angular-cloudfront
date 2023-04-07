import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    window.localStorage.setItem(
      'authorization_token',
      'ZGV2YTg0OlRFU1RfUEFTU1dPUkQ='
    );
  }
}
