import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../users/service/user.service';
import { FormDailogService } from '../../shared/components/dialog/dialog-form/service/form-dialog.service';
import { ConfirmDeleteService } from '../../shared/components/dialog/dialog-delete/service/confirm-delete.service';
import { Table } from '../../shared/components/table/table';
import { TableActions } from '../../shared/components/table/table-actions/table-actions';
import { CellTemplate, TableColumn } from '../../shared/components/table/table-column';
import { ExportImport } from '../../shared/ui/export-import/export-import';
import { Delete } from './delete/delete';
import { Add } from './add/add';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { PermissionService } from '../../core/permission';
import { Badge, BadgeVariant } from '../../shared/ui/badge/badge';
import { ToastService } from '../../shared/ui/toast/toast.service';

interface ITask {
  id: number;
  userId: number;
  name: string;
  discription: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [Table, TableActions, CellTemplate, Add, Delete, PageHeader, ExportImport, Badge],
  templateUrl: './tasks.html',
})
export class Tasks {
  private _modal = inject(FormDailogService);
  private _modalDelete = inject(ConfirmDeleteService);
  private _userService = inject(UserService);
  private _toast = inject(ToastService);
  private _permissions = inject(PermissionService);

  /** hides the "add item" button for users who cannot create */
  canCreate = computed(() => this._permissions.check('contracts.create'));

  loading = signal(false);
  user = this._userService.selectedUser;
  selectedTask = signal<ITask | null>(null);
  selectedRows = signal<ITask[]>([]);

  onSelectionChange(rows: any[]) {
    this.selectedRows.set(rows);
  }

  // ── export / import (CSV) ──────────────────────────
  private readonly csvColumns = ['id', 'userId', 'name', 'discription'];

  /** exports selected rows if any, otherwise all rows */
  exportCsv() {
    const rows = this.selectedRows().length ? this.selectedRows() : this.tasks();
    const escape = (v: unknown) => `"${String(v ?? '').replaceAll('"', '""')}"`;
    this._toast.info(`Exporting ${rows.length} rows...`);
    const csv = [
      this.csvColumns.join(','),
      ...rows.map((r: any) => this.csvColumns.map((c) => escape(r[c])).join(',')),
    ].join('\n');

    // ﻿ (BOM) so Excel opens Arabic text correctly
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  importCsv(file: File) {
    file.text().then((text) => {
      const lines = text
        .replace(/^﻿/, '')
        .split(/\r?\n/)
        .filter((l) => l.trim());
      // skip header row, simple unquote per cell
      const unquote = (v: string) => v.trim().replace(/^"|"$/g, '').replaceAll('""', '"');
      const nextId = () => Math.max(0, ...this.tasks().map((t) => t.id)) + 1;

      const imported = lines.slice(1).map((line, i) => {
        const cells = line.split(',').map(unquote);
        return {
          id: nextId() + i,
          userId: Number(cells[1]) || 1,
          name: cells[2] || 'pending',
          discription: cells[3] || '',
        };
      });

      this.tasks.update((list) => [...list, ...imported]);
      this._toast.success(`${imported.length} rows imported from ${file.name}`);
    });
  }

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'userId', label: 'User ID', sortable: true, width: '100px' },
    { key: 'name', label: 'Status/Name', sortable: true },
    { key: 'discription', label: 'Description' },
    { key: 'actions', label: 'Actions', align: 'center', searchable: false, width: '120px' },
  ];

  // ───────────── Open Add Dialog ─────────────
  openForm() {
    this.selectedTask.set(null);
    this._modal.openModal();
  }

  // ── view handlers ──────────────────────────
  onViewClick(task: ITask) {
    this.selectedTask.set(task);
  }
  // ───────────── Edit handler ─────────────
  onEditClick(task: ITask) {
    this.selectedTask.set(task);
    this._modal.openModal();
  }

  onConfirmForm(data: any) {
    if (data?.id) {
      // Edit
      this.tasks.update((list) =>
        list.map((t) =>
          t.id === data.id ? { ...t, name: data.name, discription: data.description } : t,
        ),
      );
      this._toast.success(`"${data.name}" updated successfully`);
    } else {
      // Add
      const newId = Math.max(0, ...this.tasks().map((t) => t.id)) + 1;
      this.tasks.update((list) => [
        ...list,
        { id: newId, userId: this.user() ?? 1, name: data.name, discription: data.description },
      ]);
      this._toast.success(`"${data.name}" added successfully`);
    }
    this.selectedTask.set(null);
  }

  // ── Delete handlers ──────────────────────────
  onDeleteClick(task: ITask) {
    this.selectedTask.set(task);
    this._modalDelete.openModal();
  }


  onConfirmDelete() {
    const task = this.selectedTask();
    if (!task) return;
    this.tasks.update((list) => list.filter((t) => t.id !== task.id));
    this.selectedTask.set(null);
    this._toast.success(`"${task.name}" deleted`);
  }

  /** maps a task status to a badge color */
  statusVariant(status: string): BadgeVariant {
    if (status === 'done') return 'success';
    if (status === 'pending') return 'warning';
    return 'info';
  }

  // ── Data ─────────────────────────────────────
  // 137 generated rows to exercise search, sorting and pagination with ellipsis
  tasks = signal<any[]>(
    Array.from({ length: 137 }, (_, i) => {
      const id = i + 1;
      const statuses = ['pending', 'done', `task ${id} in progress`];
      return {
        id,
        userId: (i % 3) + 1,
        name: statuses[i % statuses.length],
        discription: `description for task number ${id} — some words to search in`,
      };
    }),
  );

  filterdTasks = computed(() => this.tasks().filter((task) => task.userId == this.user()));

}

