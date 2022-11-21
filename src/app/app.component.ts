import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotificationService } from './core/notification.service';
import { UserService } from './core/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  user!: string | null;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
    ) {} 

  ngOnInit(): void {
    const timer = 20000;
    const user = localStorage.getItem('user');

    if (user) {
      this.userService.findUser(JSON.parse(user).id).subscribe(
        (res) => {
          console.warn('User exists');
        }
      )
    } else {
      this.user = prompt(`It is an emulation of login process.
      Please enter your user name for correct testing of the Taks #8`);
    
      if (this.user) {
        this.userService.createUser(this.user).subscribe(
          (res) => {
            if (res.statusCode !== 200) {
              this.notificationService.showError(`
                User with name ${this.user} was not created. Please reload page and try again
              `);
            } else {
              localStorage.setItem('user', JSON.stringify({name: this.user, id: res.data.user[0].ID}));
              console.log(`User with name ${this.user} and id ${res.data.ID} was created`);
            }
          },
          (error) => {
          }
        )
    
      } else {
        this.notificationService.showError(`
          User is not set. Cart functionality might work incorrectly.
          For better experience please reload page and enter user name`,
          timer
        )
      }
    }
    
  }
}
