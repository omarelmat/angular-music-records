import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './header.html'
})
export class HeaderComponent implements OnInit {
    userName = '';
    userRole = '';
    isLoggedIn = false;
    canAdd = false;

    constructor(private router: Router) {
        // Listen to route changes and update login status
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.checkLoginStatus();
            }
        });
    }

    ngOnInit() {
        this.checkLoginStatus();
    }

    checkLoginStatus() {
        const user = localStorage.getItem('user');
        if (user) {
            const data = JSON.parse(user);
            this.userName = data.name || '';
            this.userRole = data.role || '';
            this.isLoggedIn = true;
            this.canAdd = (data.role === 'clerk' || data.role === 'manager' || data.role === 'admin');
        } else {
            this.isLoggedIn = false;
            this.userName = '';
            this.userRole = '';
            this.canAdd = false;
        }
    }

    logout() {
        localStorage.clear();
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }
}
