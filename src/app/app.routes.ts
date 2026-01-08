import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RecordsListComponent } from './components/records-list/records-list';
import { RecordDetailComponent } from './components/record-detail/record-detail';
import { AddRecordComponent } from './components/add-record/add-record';
import { UpdateRecordComponent } from './components/update-record/update-record';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'records', component: RecordsListComponent },
    { path: 'records/:id', component: RecordDetailComponent },
    { path: 'records/:id/edit', component: UpdateRecordComponent },
    { path: 'add-record', component: AddRecordComponent }
];
