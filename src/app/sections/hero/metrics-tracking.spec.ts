import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MetricsTracking } from './metrics-tracking';

describe('MetricsTracking Component (Scrollytelling & Step Synchronization)', () => {
  let fixture: ComponentFixture<MetricsTracking>;
  let component: MetricsTracking;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsTracking],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsTracking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with vitals as default active tab', () => {
    expect(component).toBeTruthy();
    expect(component.activeTab()).toBe('vitals');

    const vitalsLayer = fixture.nativeElement.querySelector('#pane-vitals');
    expect(vitalsLayer.classList.contains('is-active')).toBe(true);

    const responsiveLayer = fixture.nativeElement.querySelector('#pane-responsive');
    expect(responsiveLayer.classList.contains('is-active')).toBe(false);
  });

  it('should render all 4 anchor points for scrollytelling steps', () => {
    const anchors = fixture.nativeElement.querySelectorAll('.telemetry-anchor-point');
    expect(anchors.length).toBe(4);
    expect(anchors[0].getAttribute('data-step')).toBe('vitals');
    expect(anchors[1].getAttribute('data-step')).toBe('responsive');
    expect(anchors[2].getAttribute('data-step')).toBe('seo');
    expect(anchors[3].getAttribute('data-step')).toBe('cro');
  });

  it('should switch active tab and visibility layers when selectTab is called', () => {
    component.selectTab('responsive');
    fixture.detectChanges();

    expect(component.activeTab()).toBe('responsive');
    expect(fixture.nativeElement.querySelector('#pane-vitals').classList.contains('is-active')).toBe(false);
    expect(fixture.nativeElement.querySelector('#pane-responsive').classList.contains('is-active')).toBe(true);

    component.selectTab('seo');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('seo');
    expect(fixture.nativeElement.querySelector('#pane-seo').classList.contains('is-active')).toBe(true);

    component.selectTab('cro');
    fixture.detectChanges();
    expect(component.activeTab()).toBe('cro');
    expect(fixture.nativeElement.querySelector('#pane-cro').classList.contains('is-active')).toBe(true);
  });

  it('should update viewport mode in responsive pane', () => {
    component.selectTab('responsive');
    fixture.detectChanges();

    expect(component.viewportMode()).toBe('desktop');
    component.setViewport('mobile');
    fixture.detectChanges();
    expect(component.viewportMode()).toBe('mobile');
  });
});
