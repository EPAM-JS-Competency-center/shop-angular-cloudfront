import { Component, Inject, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Observable } from 'rxjs';
import { Config } from '../../../environments/config.interface';
import { CONFIG_TOKEN } from '../injection-tokens/config.token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  totalInCart$!: Observable<number>;
  public signInUrl = `https://bahdan-pantsialeyeu.auth.eu-central-1.amazoncognito.com/login?client_id=1sbf1bbef5endbe7fabbqovgap&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${this.config.domain}admin/products`;

  constructor(
    private readonly cartService: CartService,
    @Inject(CONFIG_TOKEN) public config: Config
  ) {}

  ngOnInit(): void {
    this.totalInCart$ = this.cartService.totalInCart$;
  }
}
