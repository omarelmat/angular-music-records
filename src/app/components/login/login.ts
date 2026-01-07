import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.html'
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private http: HttpClient, private router: Router) { }

    onLogin(): void {
        this.http.post<any>('http://localhost:3000/api/login', {
            email: this.email,
            password: this.password
        }).subscribe({
            next: (response) => {
                localStorage.setItem('user', JSON.stringify(response));
                localStorage.setItem('role', response.role);
                this.router.navigate(['/records']);
            },
            error: () => {
                this.errorMessage = 'Invalid email or password';
            }
        });
    }
}
