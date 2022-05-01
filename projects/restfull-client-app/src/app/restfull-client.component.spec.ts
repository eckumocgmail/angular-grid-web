import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RestfullClientComponent} from './restfull-client.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RestfullClientComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RestfullClientComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'restfull-client-app'`, () => {
    const fixture = TestBed.createComponent(RestfullClientComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('restfull-client-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RestfullClientComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('restfull-client-app app is running!');
  });
});
