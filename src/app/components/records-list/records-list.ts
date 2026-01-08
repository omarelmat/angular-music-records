import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecordsService, Record } from '../../services/records.spec';
import { StockStatusPipe } from '../../pipes/stock-status-pipe';


// Import for Excel and PDF
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-records-list',
    standalone: true,
    imports: [CommonModule, StockStatusPipe],
    templateUrl: './records-list.html'
})
export class RecordsListComponent implements OnInit {
    records: Record[] = [];
    userRole = '';
    canUpdate = false;
    canDelete = false;

    constructor(
        private recordsService: RecordsService,
        private router: Router
    ) { }

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
        this.recordsService.getRecords().subscribe({
            next: (data: Record[]) => {
                this.records = data;
            },
            error: (err: any) => {
                console.error('Error loading records:', err);
            }
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
            this.recordsService.deleteRecord(id).subscribe({
                next: () => {
                    this.loadRecords();
                },
                error: (err: any) => {
                    console.error('Error deleting record:', err);
                }
            });
        }
    }

    // ===== EXCEL EXPORT =====
    exportToExcel() {
        const data = this.records.map(record => ({
            'ID': record.id,
            'Customer ID': record.customerId || 'N/A',
            'Last Name': record.customerLastName || 'N/A',
            'Format': record.format,
            'Genre': record.genre
        }));

        const ws = XLSX.utils.json_to_sheet(data);

        const genreColors: any = {
            'Rock': 'FFCCCC',
            'Pop': 'CCE5FF',
            'Jazz': 'FFFFCC',
            'Classical': 'E5CCFF',
            'Hip-Hop': 'FFE5CC'
        };

        this.records.forEach((record, index) => {
            const rowNum = index + 2;
            const color = genreColors[record.genre] || 'FFFFFF';

            for (let col = 0; col < 5; col++) {
                const cellRef = XLSX.utils.encode_cell({ r: rowNum - 1, c: col });
                if (!ws[cellRef]) continue;
                ws[cellRef].s = {
                    fill: { fgColor: { rgb: color } }
                };
            }
        });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Records');
        XLSX.writeFile(wb, 'records.xlsx');
    }

    // ===== PDF EXPORT =====
    exportToPDF() {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Records List', 14, 15);

        const tableData = this.records.map(record => [
            record.id,
            record.customerId || 'N/A',
            record.customerLastName || 'N/A',
            record.format,
            record.genre
        ]);

        autoTable(doc, {
            head: [['ID', 'Customer ID', 'Last Name', 'Format', 'Genre']],
            body: tableData,
            startY: 20,
            styles: { fontSize: 10 },
            headStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                lineWidth: 0.1,
                lineColor: [0, 0, 0]
            }
        });

        doc.save('records.pdf');
    }
}
