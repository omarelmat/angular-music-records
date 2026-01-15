import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Record } from '../../models/record.model';

@Component({
  selector: 'app-add-record',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-record.html'
})
export class AddRecord implements OnInit {
  record: Record = {
    title: '',
    artist: '',
    format: '',
    genre: '',
    releaseYear: new Date().getFullYear(),
    price: 0,
    stockQty: 0,
    customerId: '',
    customerFirstName: '',
    customerLastName: '',
    customerContact: '',
    customerEmail: ''
  };

  formats: string[] = [];
  genres: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loadFormats();
    this.loadGenres();
  }

  loadFormats() {
    this.http.get<string[]>('http://localhost:3000/api/formats').subscribe({
      next: (data) => { this.formats = data; }
    });
  }

  loadGenres() {
    this.http.get<string[]>('http://localhost:3000/api/genres').subscribe({
      next: (data) => { this.genres = data; }
    });
  }

  onSubmit() {
    this.http.post<Record>('http://localhost:3000/api/records', this.record).subscribe({
      next: () => {
        alert('Record added successfully!');
        this.router.navigate(['/records']);
      },
      error: (err) => {
        alert('Error adding record: ' + err.message);
      }
    });
  }

  goBack() {
    this.router.navigate(['/records']);
  }
}
