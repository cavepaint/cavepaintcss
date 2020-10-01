(function() {
    var random_css_filenumber = Math.floor(Math.random()*100);
    if (!sessionStorage.getItem('randomCSS')) {
        sessionStorage.setItem('randomCSS', random_css_filenumber);
    }

    if (sessionStorage.getItem('randomCSS')) {
        var stored_css = sessionStorage.getItem('randomCSS');
        var sheet = document.createElement('link');
        sheet.rel  = 'stylesheet';
        sheet.href = '/css/cavepaint_' + stored_css + '.css';
        if (document.getElementById('download_it')) {
            var download_button = document.getElementById('download_it');
            download_button.href = sheet.href;
        }
        
        document.getElementsByTagName('head')[0].appendChild(sheet);
    }
})();

function newCSS() {
    event.preventDefault();
    var random_css_filenumber = Math.floor(Math.random()*100);
    sessionStorage.setItem('randomCSS', random_css_filenumber);

    var sheet = document.createElement('link');
    sheet.rel  = 'stylesheet';
    sheet.href = '/css/cavepaint_' + random_css_filenumber + '.css';
    if (document.getElementById('download_it')) {
        var download_button = document.getElementById('download_it');
        download_button.href = sheet.href;
    }
    document.getElementsByTagName('head')[0].appendChild(sheet);
}