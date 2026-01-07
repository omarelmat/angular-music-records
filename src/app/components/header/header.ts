import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './header.html'
})
export class HeaderComponent implements OnInit {
    userRole: string = '';
    userName: string = '';

    ngOnInit(): void {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            this.userName = userData.name || '';
            this.userRole = userData.role || '';
        }
    }

    logout(): void {
        localStorage.clear();
        window.location.href = '/login';
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('user');
    }

    canAddRecords(): boolean {
        return this.userRole === 'clerk' || this.userRole === 'manager' || this.userRole === 'admin';
    }
}
