import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading: boolean = false;

  constructor() { }

  show(): void {
    this.isLoading = true;
  }

  hide(): void {
    this.isLoading = false;
  }

  isVisible(): boolean {
    return this.isLoading;
  }
}
