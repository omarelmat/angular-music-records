import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Record } from '../../models/record.model';

@Component({
    selector: 'app-records-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './records-list.html'
})
export class RecordsListComponent implements OnInit {
    records: Record[] = [];
    userRole: string = '';

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        const user = localStorage.getItem('user');
        if (user) {
            this.userRole = JSON.parse(user).role || '';
        }
        this.loadRecords();
    }

    loadRecords(): void {
        this.http.get<Record[]>('http://localhost:3000/api/records').subscribe({
            next: (data) => { this.records = data; }
        });
    }

    viewRecord(id: number): void {
        this.router.navigate(['/records', id]);
    }

    updateRecord(id: number): void {
        if (this.canUpdate()) {
            this.router.navigate(['/records', id, 'edit']);
        }
    }

    deleteRecord(id: number): void {
        if (this.canDelete() && confirm('Are you sure you want to delete this record?')) {
            this.http.delete(`http://localhost:3000/api/records/${id}`).subscribe({
                next: () => { this.loadRecords(); }
            });
        }
    }

    canUpdate(): boolean {
        return this.userRole === 'manager' || this.userRole === 'admin';
    }

    canDelete(): boolean {
        return this.userRole === 'admin';
    }
}
