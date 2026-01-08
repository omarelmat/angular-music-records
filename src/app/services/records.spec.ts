import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Record {
  id: number;
  customerId?: string;
  customerLastName?: string;
  customerFirstName?: string;
  title?: string;
  recordTitle?: string;
  artist?: string;
  format: string;
  genre: string;
  releaseYear?: number;
  price?: number;
  stockQty?: number;
  stockQuantity?: number;
  customerContact?: string;
  customerEmail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private apiUrl = 'http://localhost:3000/api/records';

  constructor(private http: HttpClient) { }

  getRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(this.apiUrl);
  }

  getRecordById(id: number): Observable<Record> {
    return this.http.get<Record>(`${this.apiUrl}/${id}`);
  }

  createRecord(record: Record): Observable<Record> {
    return this.http.post<Record>(this.apiUrl, record);
  }

  updateRecord(id: number, record: Record): Observable<Record> {
    return this.http.put<Record>(`${this.apiUrl}/${id}`, record);
  }

  deleteRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
