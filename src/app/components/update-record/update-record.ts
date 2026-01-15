import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-record',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-record.html'
})
export class UpdateRecord implements OnInit {
  record: any = null;
  formats: any[] = [];
  genres: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/api/formats').subscribe((data: any) => { this.formats = data; });
    this.http.get('http://localhost:3000/api/genres').subscribe((data: any) => { this.genres = data; });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:3000/api/records/${id}`).subscribe((data: any) => { this.record = data; });
    }
  }

  onSubmit() {
    this.http.put(`http://localhost:3000/api/records/${this.record.id}`, this.record).subscribe({
      next: () => {
        alert('Record updated!');
        this.router.navigate(['/records', this.record.id]);
      }
    });
  }

  goBack() {
    this.router.navigate(['/records']);
  }
}
