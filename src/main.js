var page = window.location.pathname;
var script = document.createElement('script');
var pathPrefix = '/WebdevTeam6';

if (page === pathPrefix+'/index.html' || page === pathPrefix+'/' || page === pathPrefix+'') {
    script.type = 'module';
    script.src = '/WebdevTeam6/src/index.js';
    script.defer = true;
    document.head.appendChild(script);
} else if (page === pathPrefix+'/explore.html'){
    script.type = 'module';
    script.src = '/WebdevTeam6/src/explore.js';
    script.defer = true;
    document.head.appendChild(script);
} else {
    content = document.body.innerHTML = '<h1>404 Resource does not exist</h1><p>Check if you have entered a valid url</p>';
}
