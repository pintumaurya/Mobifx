import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
import { AuthInterceptor } from '../components/interceptors/auth.interceptor';
import { Endpoints } from '../../app/api-list/api-end-points';

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    // public baseUrl: string = environment.baseApiUrl;    

    constructor(
        private http: HttpClient,
        public apiService: AuthInterceptor,
        // public endpoint: Endpoints,
    ) { }

    signup(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.Auth.signup, payload);
    }
    login(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.Auth.login, payload);
    }
    verifyEmail(token: any): Observable<any> {
        return this.http.get(Endpoints.ApiEndpoint.Auth.verifyEmail + token);
    }
    userInfo(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.Auth.userInformation, payload);
    }
    // getCountry() {
    //     return this.http.get(Endpoints.ApiEndpoint.Auth.countries);
    // }
    accountInfo(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.Auth.accountInformation, payload);
    }
    getPlan(): Observable<any> {
        return this.http.get(Endpoints.ApiEndpoint.Plans.plans);
    }
    // addPlan() {
    //     return this.apiService.get(Endpoints.ApiEndpoint.Plans.addPlans);
    // }
    getLeverage(): Observable<any> {
        return this.http.get(Endpoints.ApiEndpoint.Leverage.leverage);
    }
    // addLeverage() {
    //     return this.apiService.get(Endpoints.ApiEndpoint.Leverage.addLeverage);
    // }
    getUserAllAccountList(): Observable<any> {
        return this.http.get(Endpoints.ApiEndpoint.dashboard.userAccountList);
    }
    getAccountList(id: any): Observable<any> {
        return this.http.get(Endpoints.ApiEndpoint.dashboard.accountDetails + id);
    }
    addInterTransfer(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.dashboard.internalTransfer, payload);
    }
    depositHistory(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.dashboard.depositeHistory, payload);
    }
    withdrawHistory(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.dashboard.withdrawHistory, payload);
    }
    transferHistory(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.dashboard.transferHistory, payload);
    }
    resetPassword(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.userProfile.resetPassword, payload);
    }
    resetAccountPassword(payload: any): Observable<any> {
        return this.http.post(Endpoints.ApiEndpoint.userProfile.resetAccountPassword, payload);
    }
}