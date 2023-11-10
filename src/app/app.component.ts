import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GetTokenService } from './core/services/get-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private tokenService: GetTokenService) {}

  ngOnInit(): void {
    this.tokenService.setAuthToken();
  }
}
