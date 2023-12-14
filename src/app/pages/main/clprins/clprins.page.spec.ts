import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClprinsPage } from './clprins.page';

describe('ClprinsPage', () => {
  let component: ClprinsPage;
  let fixture: ComponentFixture<ClprinsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClprinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
