import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZodiacoLista } from './zodiaco-lista';

describe('ZodiacoLista', () => {
  let component: ZodiacoLista;
  let fixture: ComponentFixture<ZodiacoLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZodiacoLista],
    }).compileComponents();

    fixture = TestBed.createComponent(ZodiacoLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
