import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Config } from 'src/environments/config.interface';
import { CONFIG_TOKEN } from './core/injection-tokens/config.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(@Inject(CONFIG_TOKEN) config: Config) {
    if (!localStorage.getItem('authorization_token'))
      localStorage.setItem('authorization_token', config.token);
  }
}
