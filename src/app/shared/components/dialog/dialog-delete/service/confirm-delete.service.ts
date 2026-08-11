import { Injectable } from '@angular/core';
import { DialogService } from '../../dialog.service';

@Injectable({ providedIn: 'root' })
export class ConfirmDeleteService extends DialogService {}
