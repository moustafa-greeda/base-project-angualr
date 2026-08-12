/**
 * Permission layer — one import path for the whole feature:
 *
 *   import { PermissionService, Can, permissionGuard } from '@core/permission';
 *
 * - PermissionService : knows what the current user may do
 * - Can (*appCan)     : shows/hides elements
 * - permissionGuard   : blocks routes
 */
export * from './permission.service';
export * from './can';
export * from './permission-guard';
