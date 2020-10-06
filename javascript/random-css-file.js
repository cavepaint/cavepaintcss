(function() {
    // base random number 1-256
    var random_css_filenumber = Math.ceil(Math.random()*256);
    var random_css_filenumber2 = Math.ceil(Math.random()*256);

    // build the stylesheet element
    var sheet = document.createElement('link');
    sheet.rel  = 'stylesheet';
    sheet.id  = 'random_stylesheet';
    sheet.href = 'css/cavepaint_' + random_css_filenumber + '.css';

    // build the next stylesheet element
    var next_sheet = document.createElement('link');
    next_sheet.rel  = 'stylesheet';
    next_sheet.id  = 'next_stylesheet';
    next_sheet.href = 'css/cavepaint_' + random_css_filenumber2 + '.css';

    if (document.getElementsByClassName('download_it')) {
        var download_buttons = document.getElementsByClassName('download_it');
        for (var i = 0; i < download_buttons.length; i++) {
            download_buttons.item(i).href = sheet.href;
        }
    }

    document.getElementsByTagName('head')[0].appendChild(next_sheet);
    document.getElementsByTagName('head')[0].appendChild(sheet);

    next_sheet.disabled = 'true';
    

    sessionStorage.setItem('randomCSS', random_css_filenumber);
})();

function newCSS() {
    // stop the click if click-triggered
    if (event) {
        event.preventDefault();
    }

    
    // base random number 1-256
    var random_css_filenumber = Math.ceil(Math.random()*256);

    // switch out hrefs
    var old_sheet = document.getElementById('random_stylesheet');
    var next_sheet = document.getElementById('next_stylesheet');
    var new_href = next_sheet.href;

    next_sheet.removeAttribute("disabled");
    old_sheet.href = new_href;


    // old_sheet.parentNode.removeChild(old_sheet);

    // set up a new next sheet href
    next_sheet.href = 'css/cavepaint_' + random_css_filenumber + '.css';
    setTimeout(function(){ next_sheet.disabled = 'disabled';}, 2000);

    // fix download CSS hrefs
    if (document.getElementsByClassName('download_it')) {
        var download_buttons = document.getElementsByClassName('download_it');
        for (var i = 0; i < download_buttons.length; i++) {
            download_buttons.item(i).href = old_sheet.href;
        }
    }
}