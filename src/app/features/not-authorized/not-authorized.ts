import { Component, inject } from '@angular/core';
import { ErrorPage } from '../../shared/components/error-page/error-page';
import { AuthService } from '../../auth/service/auth';

@Component({
  selector: 'app-not-authorized',
  imports: [ErrorPage],
  templateUrl: './not-authorized.html',
})
export class NotAuthorized {
  private _auth = inject(AuthService);

  /** send the user back to the dashboard of their own role */
  homeLink = this._auth.user()
    ? this._auth.getRedirectUrl(this._auth.user()!.userType)
    : '/login';
}
