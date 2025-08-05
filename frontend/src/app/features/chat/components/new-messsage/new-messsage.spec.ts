import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMesssage } from './new-messsage';

describe('NewMesssage', () => {
  let component: NewMesssage;
  let fixture: ComponentFixture<NewMesssage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMesssage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMesssage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
