import { Component, inject } from '@angular/core';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Badge } from '../../shared/ui/badge/badge';
import { Button } from '../../shared/ui/button/button';
import { ToastService } from '../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-feedback',
  imports: [PageHeader, Badge, Button],
  templateUrl: './feedback.html',
})
export class Feedback {
  private toast = inject(ToastService);

  showSuccess() {
    this.toast.success('The item was saved successfully');
  }

  showError() {
    this.toast.error('Could not reach the server, please try again');
  }

  showInfo() {
    this.toast.info('3 new contract requests are waiting for review');
  }

  showWarning() {
    this.toast.warning('Your session expires in 5 minutes');
  }

  showWithTitle() {
    this.toast.success('Invoice #1042 was sent to the client', 'Invoice sent');
  }
}
