import { Component, computed, input, output } from '@angular/core';

export type ClientStatus = 'active' | 'inactive';

/** Shape of the data the client card displays — use it to type your lists */
export interface IClientCard {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  status: ClientStatus;
}

/**
 * Client info card:
 * <app-card-client name="..." email="..." phone="..." company="..." status="active" />
 */
@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.html',
})
export class CardClient {
  name = input.required<string>();
  company = input<string>();
  email = input<string>();
  phone = input<string>();
  location = input<string>();
  avatarUrl = input<string>();
  status = input<ClientStatus>('active');

  view = output<void>();
  edit = output<void>();

  /** First letters of the first two words of the name, e.g. "Ahmed Ali" → "AA" */
  initials = computed(() =>
    this.name()
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? '')
      .join(''),
  );
}
