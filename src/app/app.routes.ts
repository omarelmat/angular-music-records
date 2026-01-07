import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RecordsListComponent } from './components/records-list/records-list';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'records', component: RecordsListComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
