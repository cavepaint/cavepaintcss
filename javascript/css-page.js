
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
    console.log(textToCopy);
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function copyColorString(id) {
    var stringToCopy = document.getElementById(id);
    var theStringItself = stringToCopy.value;
    console.log(stringToCopy);
    stringToCopy.select();
    stringToCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    showMessage("Copied '" + theStringItself + "' to clipboard.");
}

function copyColorStringNoHide(id) {

    // the "NoHide" variant is running in the VS plugin

    var stringToCopy = document.getElementById(id);
    var theStringItself = stringToCopy.value;
    

    if (document.getElementById("color-hex").checked == true) {
        var format_user_wants = "hex";
    }

    if (document.getElementById("color-name").checked == true) {
        var format_user_wants = "name";
    }

    if (format_user_wants == "hex") {
        var copyStyle = getComputedStyle(stringToCopy);

        var bg_color = copyStyle.backgroundColor;

        let sep = bg_color.indexOf(",") > -1 ? "," : " ";
        rgb = bg_color.substr(4).split(")")[0].split(sep);

        let r = (+rgb[0]).toString(16),
            g = (+rgb[1]).toString(16),
            b = (+rgb[2]).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;

        var hex = "#" + r + g + b;

        console.log(hex);

        var text = hex;

        var textArea = document.createElement("textarea");
    
      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if the element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a
      // flash, so some of these are just precautions. However in
      // Internet Explorer the element is visible whilst the popup
      // box asking the user for permission for the web page to
      // copy to the clipboard.
      //
    
      // Place in the top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed';
      textArea.style.top = 0;
      textArea.style.left = 0;
    
      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em';
      textArea.style.height = '2em';
    
      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0;
    
      // Clean up any borders.
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
    
      // Avoid flash of the white box if rendered for any reason.
      textArea.style.background = 'transparent';
    
    
      textArea.value = text;
    
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
    
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
    
      document.body.removeChild(textArea);

      showMessageNoHide("Copied <span class='text-padding rounded " + theStringItself + "'>" + text + "</span> to clipboard.");
    }

    if (format_user_wants == "name") {
        console.log(stringToCopy);
        stringToCopy.select();
        stringToCopy.setSelectionRange(0, 99999);
        document.execCommand("copy");
        showMessageNoHide("Copied <span class='text-padding rounded " + theStringItself + "'>'" + theStringItself + "'</span> to clipboard.");
    }
}

function showMessage(string) {
    var messageDiv = document.getElementById("nav_message");
    messageDiv.innerText = string;
    messageDiv.classList.remove("hide");

    setTimeout(function() { messageDiv.classList.add("hide"); }, 3000);
}

function showMessageNoHide(string) {
    var messageDiv = document.getElementById("nav_message");
    messageDiv.innerHTML = string;
    messageDiv.classList.remove("hide");
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