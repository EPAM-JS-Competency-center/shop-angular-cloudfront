import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  currentEmail = '';

  onEmailChange(emailValue: string): void {
    this.currentEmail = emailValue;
  }
}
