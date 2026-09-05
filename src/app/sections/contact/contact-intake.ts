import { Injectable, signal } from '@angular/core';
import { ContactInquiry } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactIntake {
  readonly isSubmitting = signal(false);
  readonly isSubmitted = signal(false);

  async submitInquiry(_inquiry: ContactInquiry): Promise<boolean> {
    this.isSubmitting.set(true);

    // Simulate asynchronous intake dispatch
    await new Promise((resolve) => setTimeout(resolve, 600));

    this.isSubmitting.set(false);
    this.isSubmitted.set(true);
    return true;
  }

  reset(): void {
    this.isSubmitted.set(false);
  }
}
