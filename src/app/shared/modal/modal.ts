import { Component, HostListener, inject, input, output } from '@angular/core';
import { ModalService } from './service/modal.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  constructor() {
}
  _modal = inject(ModalService)
  open(){
    console.log(this._modal.open())
    return this._modal.open()
  }
  close() {
    this._modal.closeModal()
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if(this.open()) this.close();
  }
}
