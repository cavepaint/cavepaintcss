
output = {};

document.addEventListener("DOMContentLoaded", function() {
    // renderLess();
});

function renderLess() {
    // var lessInput = document.getElementById("less_textarea").value;
    var headlessLessInput = document.getElementById("headless_less_textarea").value;
    var baseColor = document.getElementById("baseColor").value;
    var baseLighting = document.getElementById("baseLighting").value + '%';
    var textBase = document.getElementById("textBase").value;
    var basePadding = document.getElementById("basePadding").value + 'rem';
    var baseLightenBy = document.getElementById("baseLightenBy").value + '%';
    var baseDarkenBy = document.getElementById("baseDarkenBy").value + '%';
    var baseMargin = basePadding;
    var baseFontSize = document.getElementById("baseFontSize").value + 'px';
    var baseLineHeight = document.getElementById("baseLineHeight").value;
    var sansSerif = document.getElementById("sans-serif").checked;
    var serif = document.getElementById("serif").checked;
    var monospace = document.getElementById("monospace").checked;
    var fontFamily = 'var(--sans-serif)';

    if (sansSerif) { var fontFamily = 'var(--sans-serif)';}
    if (serif) { var fontFamily = 'var(--serif)';}
    if (monospace) { var fontFamily = 'var(--monospace)';}

    var lessTheme = "@base-color: " + baseColor + ";\n" + "@ambient-mix: " + baseLighting + ";\n" + "@font-size: " + baseFontSize + ";\n" + "@font-family: " + fontFamily + ";\n" + "@text-base: " + textBase + ";\n" + "@padding: " + basePadding + ";\n" + "@margin: " + baseMargin + ";\n" + "@gutter: " + "(2 * @padding)" + ";\n" + "@line-height: " + baseLineHeight + ";\n" + "@lighten-by: " + baseLightenBy + ";\n" + "@darken-by: " + baseDarkenBy + ";\n";

    var lessInputTheme = lessTheme + headlessLessInput;

    var less_options = {
        env: "production",
        async: false,
        fileAsync: false,
        relativeUrls: true
    };

    less.render(lessInputTheme, less_options)
        .then(function(output) {
            // output.css = string of css
            var theCSS = output.css;
            document.getElementById("css").innerHTML = theCSS;
            document.getElementById("css_textarea").innerHTML = theCSS;
            document.getElementById("html_textarea").innerHTML = '<style>\n' + theCSS + '<\/style>';
            document.getElementById("less_textarea").innerHTML = lessInputTheme;

            
            // output.map = string of sourcemap
            // output.imports = array of string filenames of the imports referenced
        },
        function(error) {
            console.log('something went wrong: ' + error);
        });
}

function copyCSS() {
    var textToCopy = document.getElementById("css_textarea");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function copyHTML() {
    var textToCopy = document.getElementById("html_textarea");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function copyLess() {
    var textToCopy = document.getElementById("less_textarea");
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function saveTextAsFile(textToWrite, fileNameToSaveAs) {
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}); 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}