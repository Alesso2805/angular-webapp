import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PropertyService } from '../../core/services/property.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit, OnDestroy {
  public propertyService = inject(PropertyService);
  
  public searchControl = new FormControl('');
  public categories = [
    { id: 'all', icon: 'apps', label: 'All' },
    { id: 'trending', icon: 'local_fire_department', label: 'Trending' },
    { id: 'beach', icon: 'beach_access', label: 'Beachfront' },
    { id: 'cabin', icon: 'cabin', label: 'Cabins' },
    { id: 'city', icon: 'location_city', label: 'Iconic Cities' }
  ];
  
  public activeCategory = 'all';
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.propertyService.updateSearchQuery(value || '');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setCategory(category: string) {
    this.activeCategory = category;
    this.propertyService.updateCategory(category);
  }
}
