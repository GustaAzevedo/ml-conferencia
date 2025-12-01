import { GridTableComponent } from './grid-table.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

describe('GridTableComponent (placeholder)', () => {
  let fixture: ComponentFixture<GridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, GridTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GridTableComponent);
    fixture.componentInstance.columns = ['a', 'b'];
    fixture.componentInstance.rows = [{ a: 1, b: 2 }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
