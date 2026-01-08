import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Record } from '../../models/record.model';

@Component({
  selector: 'app-record-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './record-detail.html'
})
export class RecordDetailComponent implements OnInit {
  record: Record | null = null;
  userRole = '';
  canUpdate = false;
  canDelete = false;

  constructor(
    private http: HttpClient,
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
    this.http.get<Record>(`http://localhost:3000/api/records/${id}`).subscribe({
      next: (data) => { this.record = data; }
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
      this.http.delete(`http://localhost:3000/api/records/${this.record.id}`).subscribe({
        next: () => { this.router.navigate(['/records']); }
      });
    }
  }
}
