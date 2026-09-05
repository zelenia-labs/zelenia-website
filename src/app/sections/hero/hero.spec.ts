import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';
import { PagespeedClient } from './pagespeed-client';
import { StudioContent } from '../../content/studio-content';

describe('Hero Component (Signal Forms URL Validation)', () => {
  let fixture: ComponentFixture<Hero>;
  let component: Hero;
  let pagespeed: PagespeedClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [PagespeedClient, StudioContent]
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    pagespeed = TestBed.inject(PagespeedClient);
    fixture.detectChanges();
  });

  it('should initialize with empty URL and no validation errors', () => {
    expect(component).toBeTruthy();
    const formEl = fixture.nativeElement.querySelector('#hero-audit-form');
    expect(formEl).toBeTruthy();

    const inputEl = fixture.nativeElement.querySelector('#hero-audit-url') as HTMLInputElement;
    expect(inputEl).toBeTruthy();
    expect(inputEl.value).toBe('');

    const errorEl = fixture.nativeElement.querySelector('#hero-url-error');
    expect(errorEl).toBeNull();
  });

  it('should display error message when submitting an empty URL', async () => {
    const formEl = fixture.nativeElement.querySelector('#hero-audit-form') as HTMLFormElement;
    formEl.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    const errorEl = fixture.nativeElement.querySelector('#hero-url-error');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Please enter a website URL to analyze.');
  });

  it('should display error message when submitting an invalid URL format', async () => {
    const inputEl = fixture.nativeElement.querySelector('#hero-audit-url') as HTMLInputElement;
    inputEl.value = 'invalid_domain_without_tld';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const formEl = fixture.nativeElement.querySelector('#hero-audit-form') as HTMLFormElement;
    formEl.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    const errorEl = fixture.nativeElement.querySelector('#hero-url-error');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Please provide a valid website URL');
  });

  it('should trigger PagespeedClient.runAudit when submitting a valid URL', async () => {
    const runAuditSpy = vi.spyOn(pagespeed, 'runAudit').mockImplementation(async () => null);

    const inputEl = fixture.nativeElement.querySelector('#hero-audit-url') as HTMLInputElement;
    inputEl.value = 'acme-corp.com';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const formEl = fixture.nativeElement.querySelector('#hero-audit-form') as HTMLFormElement;
    formEl.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(runAuditSpy).toHaveBeenCalledWith('acme-corp.com');
  });

  it('should reject localhost and private development addresses', async () => {
    const runAuditSpy = vi.spyOn(pagespeed, 'runAudit').mockImplementation(async () => null);

    const inputEl = fixture.nativeElement.querySelector('#hero-audit-url') as HTMLInputElement;
    inputEl.value = 'http://localhost:3000';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const formEl = fixture.nativeElement.querySelector('#hero-audit-form') as HTMLFormElement;
    formEl.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(runAuditSpy).not.toHaveBeenCalled();
    const errorEl = fixture.nativeElement.querySelector('#hero-url-error');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Localhost and private addresses are not supported');
  });

  it('should accept a full standard https URL', async () => {
    const runAuditSpy = vi.spyOn(pagespeed, 'runAudit').mockImplementation(async () => null);

    const inputEl = fixture.nativeElement.querySelector('#hero-audit-url') as HTMLInputElement;
    inputEl.value = 'https://apple.com';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const formEl = fixture.nativeElement.querySelector('#hero-audit-form') as HTMLFormElement;
    formEl.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(runAuditSpy).toHaveBeenCalledWith('https://apple.com');
  });
});
