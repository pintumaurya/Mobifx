import { environment } from '../../environments/environment';

// let domain = window.location.host.split('.')[0];
let apiurl = environment.baseApiUrl;
export const Endpoints = {
    // site: {
    //     // get url() {
    //     //     return 'http://my.mobifx.net/';
    //     // },
    //     get apiurl() {
    //         return 
    //     }
    //     // get apiurl() {
    //     //     return domain == 'nfpc' ? environment.baseApiUrl : environment.baseApiUrl;
    //     // },
    // },
    ApiEndpoint: {
        Auth: {
            get signup() {
                return `${apiurl}/auth/signup`;
            },
            get login() {
                return `${apiurl}/auth/login`;
            },
            get verifyEmail() {
                return `${apiurl}/auth/verification/`;
            },
            get userInformation() {
                return `${apiurl}/user-information`;
            },
            // get countries() {
            //     return `${"https://countries.petethompson.net/data/countries.json"}`;
            // },
            get accountInformation() {
                return `${apiurl}/account-information`;
            },
        },
        Plans: {
            get plans() {
                return `${apiurl}/plan/list`;
            },
        },
        Leverage: {
            get leverage() {
                return `${apiurl}/leverage/list`;
            },
        },
        dashboard: {
            get userAccountList() {
                return `${apiurl}/user-account`;
            },
            get accountDetails() {
                return `${apiurl}/get-account-information/`;
            },
            get internalTransfer() {
                return `${apiurl}/internal-transfer`;
            },
            get depositeHistory() {
                return `${apiurl}/deposite/history`;
            },
            get withdrawHistory() {
                return `${apiurl}/withdraw/history`;
            },
            get transferHistory() {
                return `${apiurl}/internal-transfer/history`;
            },
            get addDeposit() {
                return `${apiurl}/deposite`;
            }
        },
        userProfile: {
            get resetPassword() {
                return `${apiurl}/reset_password`;
            },
            get resetAccountPassword() {
                return `${apiurl}/account-password-update`;
            },
            get userInfo() {
                return `${apiurl}/userInfo/`;
            },
            get updateUserProfile() {
                return `${apiurl}/update_profile`;
            },
            get accountLogs() {
                return `${apiurl}/account-log`;
            }
        }
    }
}