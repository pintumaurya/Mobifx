import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    sidebar: boolean = false;
    isHeader: boolean = true;
    isVefiHeader: boolean = true;
    token: any;
}