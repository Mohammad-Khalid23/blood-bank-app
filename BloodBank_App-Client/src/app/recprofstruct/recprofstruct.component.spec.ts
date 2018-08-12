import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecprofstructComponent } from './recprofstruct.component';

describe('RecprofstructComponent', () => {
  let component: RecprofstructComponent;
  let fixture: ComponentFixture<RecprofstructComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecprofstructComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecprofstructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
