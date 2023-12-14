import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClreservaPage } from './clreserva.page';

describe('ClreservaPage', () => {
  let component: ClreservaPage;
  let fixture: ComponentFixture<ClreservaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClreservaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
