import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusCards } from './focus-cards';
import { DiagnosticState } from '../diagnostic/diagnostic-state';

describe('FocusCards Component (Radio Group)', () => {
  let fixture: ComponentFixture<FocusCards>;
  let component: FocusCards;
  let diagnostic: DiagnosticState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusCards],
      providers: [DiagnosticState]
    }).compileComponents();

    fixture = TestBed.createComponent(FocusCards);
    component = fixture.componentInstance;
    diagnostic = TestBed.inject(DiagnosticState);
    fixture.detectChanges();
  });

  it('should render all diagnostic categories as radio cards', () => {
    expect(component).toBeTruthy();
    const radiogroup = fixture.nativeElement.querySelector('[role="radiogroup"]');
    expect(radiogroup).toBeTruthy();

    const cards = fixture.nativeElement.querySelectorAll('.focus-card');
    expect(cards.length).toBe(diagnostic.categories.length);
  });

  it('should reflect initial selected value on corresponding radio and card', () => {
    const defaultRadio = fixture.nativeElement.querySelector(
      '#focus-radio-vitals'
    ) as HTMLInputElement;
    expect(defaultRadio.checked).toBe(true);

    const defaultCard = fixture.nativeElement.querySelector('.focus-card.is-selected');
    expect(defaultCard).toBeTruthy();
    expect(defaultCard.getAttribute('for')).toBe('focus-radio-vitals');
  });

  it('should emit valueChange when a different radio card is selected', () => {
    const emitSpy = vi.spyOn(component.valueChange, 'emit');

    const responsiveRadio = fixture.nativeElement.querySelector(
      '#focus-radio-responsive'
    ) as HTMLInputElement;
    responsiveRadio.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalledWith('responsive');
  });

  it('should display turnaround pill and investment floor in each card', () => {
    const titles = fixture.nativeElement.querySelectorAll('.focus-card-title');
    expect(titles[0].textContent).toContain(diagnostic.categories[0].label);

    const badges = fixture.nativeElement.querySelectorAll('.focus-turnaround-badge');
    expect(badges[0].textContent).toContain(diagnostic.categories[0].turnaround.standard);

    const floors = fixture.nativeElement.querySelectorAll('.focus-card-floor');
    expect(floors[0].textContent).toContain(diagnostic.categories[0].investmentFloor);
  });
});
