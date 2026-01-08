import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


interface Record {
    id: number;
    customerId: string;
    customerLastName: string;
    format: string;
    genre: string;
}

@Component({
    selector: 'app-records-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './records-list.html'
})
export class RecordsListComponent implements OnInit {
    records: Record[] = [];
    userRole = '';
    canUpdate = false;
    canDelete = false;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        const user = localStorage.getItem('user');
        if (user) {
            this.userRole = JSON.parse(user).role;
            this.canUpdate = (this.userRole === 'manager' || this.userRole === 'admin');
            this.canDelete = (this.userRole === 'admin');
        }
        this.loadRecords();
    }

    loadRecords() {
        this.http.get<Record[]>('http://localhost:3000/api/records').subscribe({
            next: (data) => { this.records = data; }
        });
    }

    viewRecord(id: number) {
        this.router.navigate(['/records', id]);
    }

    updateRecord(id: number) {
        if (this.canUpdate) {
            this.router.navigate(['/records', id, 'edit']);
        }
    }

    deleteRecord(id: number) {
        if (this.canDelete && confirm('Are you sure you want to delete this record?')) {
            this.http.delete(`http://localhost:3000/api/records/${id}`).subscribe({
                next: () => { this.loadRecords(); }
            });
        }
    }
}
