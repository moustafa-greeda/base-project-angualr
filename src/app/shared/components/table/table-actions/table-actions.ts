import { Component, computed, inject, input, output } from '@angular/core';
import { Button } from '../../../ui/button/button';
import { ButtonSize } from '../../../ui/button/model/ibutton.interface';
import { PermissionService } from '../../../../core/permission';

/**
 * Standard row-actions cell for tables — icons, colors and aria labels
 * are defined once here for the whole system:
 *
 *   <ng-template appCell="actions" let-row>
 *     <app-table-actions (edit)="onEdit(row)" (delete)="onDelete(row)" />
 *   </ng-template>
 *
 * Optional view button: [showView]="true" (view). Extra screen-specific
 * buttons can be projected as content next to the standard ones.
 *
 * Pass `resource` to hide buttons the user is not allowed to use:
 *   <app-table-actions resource="contracts" (edit)="…" (delete)="…" />
 * checks contracts.view / contracts.update / contracts.delete.
 */
@Component({
  selector: 'app-table-actions',
  imports: [Button],
  templateUrl: './table-actions.html',
})
export class TableActions {
  view = output<void>();
  edit = output<void>();
  delete = output<void>();

  showView = input(false);
  showEdit = input(true);
  showDelete = input(true);
  size = input<ButtonSize>('sm');

  /** permission resource key; when omitted no permission check is applied */
  resource = input<string>('');

  private permissions = inject(PermissionService);

  /** a button renders when the screen asked for it AND the user may use it */
  canView = computed(() => this.showView() && this.allowed('view'));
  canEdit = computed(() => this.showEdit() && this.allowed('update'));
  canDelete = computed(() => this.showDelete() && this.allowed('delete'));

  private allowed(action: string): boolean {
    const resource = this.resource();
    return !resource || this.permissions.check(`${resource}.${action}`);
  }
}
