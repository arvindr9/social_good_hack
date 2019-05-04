function handleKeyPress(event) {

    console.log("inside handleKeyPress");
    var x = event.charCode || event.keyCode;  // Get the Unicode value
    var query = String.fromCharCode(x);  // Convert the value into a character
    if (query == '~') num_tilde++;

    /*  The above 2 lines of code come from:
    http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_charcode4 */

        // alert("You pressed " + y + " and its charCode is " + x);
        // display which key was pressed, along with its charCode, in an alert

        searchString += query;
        console.log("Search string: " + searchString);
    setTimeout(createDisplay(), 30);
}

function handleKeyDown(event) {
    var x = event.charCode || event.keyCode;  // Get the Unicode value
    if (x == 8) {
        if (searchString.length > 0) {
            if (searchString.charAt(searchString.length - 1) == '~') num_tilde--;
            searchString = searchString.substring(0, searchString.length - 1);
            console.log("Search string: " + searchString);
        }
        setTimeout(createDisplay(), 30);
    }
}



function createDisplay() {
    console.log("inside createDisplay")
    if (!botDiv.classList.contains('hidden') && searchString !== '*') {
        console.log("hiding bot div")
        botDiv.classList.add('hidden');
    }
    if (searchString.length === 0) {
        secretMessage = "";
    }
    else if (searchString == '*') {
        let a = 0;
        secretMessage = "";
        botDiv.classList.remove('hidden');
        let coverDiv = document.getElementById('cover');
        coverDiv.classList.add('to-back');
    }
    else if (searchString.charAt(0) == '~') {
        setTimeout(function() {searchInput.value = default_display.substring(0, searchString.length);}, 30)
        if (num_tilde == 1) secretMessage = searchString.substring(1);
        else {
            let i2 = searchString.indexOf('~', 1);
            secretMessage = searchString.substring(1, i2);
        }
    } else {
        console.log("setting value of input");
        secretMessage = "";
        //searchInput.value = searchString;
    }
    const secretP = document.getElementById('secret');
    secretP.textContent = "Secret message: " + secretMessage;
    console.log("Secret message:" + secretMessage);
}

const default_display = 'Where is the nearest grocery store?'
let searchString = '';
let secretMessage = '';

let num_tilde = 0;

const searchInput = document.getElementById('searchInput');
const botDiv = document.getElementById('bot');
searchInput.addEventListener('keypress', handleKeyPress);
searchInput.addEventListener('keydown', handleKeyDown);