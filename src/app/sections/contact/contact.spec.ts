import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Contact } from './contact';
import { ContactIntake } from './contact-intake';
import { DiagnosticState } from '../diagnostic/diagnostic-state';
import { PagespeedClient } from '../hero/pagespeed-client';

describe('Contact Component (Signal Forms)', () => {
  let fixture: ComponentFixture<Contact>;
  let component: Contact;
  let intake: ContactIntake;
  let pagespeed: PagespeedClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [ContactIntake, DiagnosticState, PagespeedClient]
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    intake = TestBed.inject(ContactIntake);
    pagespeed = TestBed.inject(PagespeedClient);
    fixture.detectChanges();
  });

  it('should initialize with default diagnostic focus and valid pristine state', () => {
    expect(component).toBeTruthy();
    const formElement = fixture.nativeElement.querySelector('#contact-form');
    expect(formElement).toBeTruthy();

    const emailInput = fixture.nativeElement.querySelector('#work-email') as HTMLInputElement;
    expect(emailInput.value).toBe('');
    expect(fixture.nativeElement.querySelector('#email-error')).toBeNull();

    const selectEl = fixture.nativeElement.querySelector('#primary-focus') as HTMLSelectElement;
    expect(selectEl.value).toBe('vitals');
  });

  it('should display validation error when submitting with empty email', async () => {
    const formElement = fixture.nativeElement.querySelector('#contact-form') as HTMLFormElement;
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    const errorEl = fixture.nativeElement.querySelector('#email-error');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Please enter your work email address.');
  });

  it('should allow user to change primary focus in form dropdown', async () => {
    const selectEl = fixture.nativeElement.querySelector('#primary-focus') as HTMLSelectElement;
    selectEl.value = 'rebuild';
    selectEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(selectEl.value).toBe('rebuild');
  });

  it('should submit successfully with valid data and show confirmation', async () => {
    // Fill in email
    const emailInput = fixture.nativeElement.querySelector('#work-email') as HTMLInputElement;
    emailInput.value = 'alex@acmecorp.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const formElement = fixture.nativeElement.querySelector('#contact-form') as HTMLFormElement;
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // Intake submission is asynchronous (600ms simulation)
    expect(intake.isSubmitting()).toBe(true);

    // Fast-forward or wait for resolution
    await new Promise((resolve) => setTimeout(resolve, 700));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(intake.isSubmitting()).toBe(false);
    expect(intake.isSubmitted()).toBe(true);

    const confirmationEl = fixture.nativeElement.querySelector('#form-confirmation');
    expect(confirmationEl).toBeTruthy();
    expect(confirmationEl.textContent).toContain('Architectural Review Requested');
  });

  it('should automatically prefill companyUrl when PagespeedClient.targetUrl is updated from Hero', async () => {
    pagespeed.targetUrl.set('https://acmecorp.com');
    fixture.detectChanges();
    await fixture.whenStable();

    const companyInput = fixture.nativeElement.querySelector('#company-url') as HTMLInputElement;
    expect(companyInput.value).toBe('https://acmecorp.com');
  });
});
