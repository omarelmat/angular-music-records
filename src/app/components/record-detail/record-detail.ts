import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecordsService, Record } from '../../services/records.spec';
import { StockStatusPipe } from '../../pipes/stock-status-pipe';

@Component({
  selector: 'app-record-detail',
  standalone: true,
  imports: [CommonModule, StockStatusPipe],
  templateUrl: './record-detail.html'
})
export class RecordDetailComponent implements OnInit {
  record: Record | null = null;
  userRole = '';
  canUpdate = false;
  canDelete = false;

  constructor(
    private recordsService: RecordsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userRole = JSON.parse(user).role;
      this.canUpdate = (this.userRole === 'manager' || this.userRole === 'admin');
      this.canDelete = (this.userRole === 'admin');
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecord(Number(id));
    }
  }

  loadRecord(id: number) {
    this.recordsService.getRecordById(id).subscribe({
      next: (data) => { this.record = data; },
      error: (err) => { console.error('Error loading record:', err); }
    });
  }

  goBack() {
    this.router.navigate(['/records']);
  }

  editRecord() {
    if (this.record && this.canUpdate) {
      this.router.navigate(['/records', this.record.id, 'edit']);
    }
  }

  deleteRecord() {
    if (this.record && this.canDelete && confirm('Are you sure you want to delete this record?')) {
      this.recordsService.deleteRecord(this.record.id).subscribe({
        next: () => { this.router.navigate(['/records']); },
        error: (err) => { console.error('Error deleting record:', err); }
      });
    }
  }
}
