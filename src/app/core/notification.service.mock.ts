import { NotificationService } from './notification.service';

export class NotificationServiceMock {
  showError() {}
}

export const mockNotificationServiceProvider = { provide: NotificationService, useClass: NotificationServiceMock };
