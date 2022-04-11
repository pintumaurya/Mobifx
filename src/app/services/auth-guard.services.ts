import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) { }

    canActivate() {
        if (localStorage.getItem('token') != null && localStorage.getItem('token') !== 'undefined') {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    getToken() {
        return localStorage.getItem("token");
    }
}