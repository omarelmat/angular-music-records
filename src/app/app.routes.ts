import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RecordsListComponent } from './components/records-list/records-list';
import { RecordDetailComponent } from './components/record-detail/record-detail';
import { AddRecord } from './components/add-record/add-record';
import { UpdateRecord } from './components/update-record/update-record';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'records',
        component: RecordsListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'records/:id',
        component: RecordDetailComponent,
        canActivate: [authGuard]
    },
    {
        path: 'records/:id/edit',
        component: UpdateRecord,
        canActivate: [authGuard],
        data: { role: 'manager' }
    },
    {
        path: 'add-record',
        component: AddRecord,
        canActivate: [authGuard]
    }
];
