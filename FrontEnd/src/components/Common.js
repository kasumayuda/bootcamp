var Config = require('Config');

export function IsUserLoggedIn(){
    var token = localStorage.getItem('user-token');
    return token != undefined;
    //return true;
}

export function GetCurrentUserToken(){
    return localStorage.getItem('user-token');
}

export function ExploreJogjaAPIServer(){
    var apiServer = Config.apiServer;
    var port= apiServer.port != undefined && apiServer.port != '' ? `:${apiServer.port}` : '';
    return `${apiServer.protocol}://${apiServer.address}${port}/`;
}

export function GoogleMapURL(location){
    var gmapsAPIKey = Config.googleMapAPIKey;    
    var gmapsURL = `//www.google.com/maps/embed/v1/place?q=${location}&zoom=17&key=${gmapsAPIKey}`;
    return gmapsURL;
}