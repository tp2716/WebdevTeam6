const page = window.location.pathname;
const pathPrefix = '/WebdevTeam6';

function createScript(type, src, defer){
    var script = document.createElement('script');
    script.type = type;
    script.src = src;
    script.defer = defer;
    document.head.appendChild(script);
}

if (page === pathPrefix + '/index.html' || page === pathPrefix + '/' || page === pathPrefix + '') {
    createScript('module', pathPrefix + '/src/mainPage.js', true);

} else if (page === pathPrefix + '/explore.html') {
    createScript('module', pathPrefix + '/src/explore.js', true);

} else if (page === pathPrefix + '/account.html') {
    createScript('module', pathPrefix + '/src/account.js', true);

}  else {
    console.log(page);
}
