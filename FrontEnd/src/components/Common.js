export function IsUserLoggedIn(){
    var token = localStorage.getItem('user-token');
    return token != undefined;
}