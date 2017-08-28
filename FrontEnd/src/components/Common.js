export function IsUserLoggedIn(){
    var token = localStorage.getItem('user-token');
    return token != undefined;
}

export function ExploreJogjaAPIServer(){
    return 'https://localhost:44323/';
}