// STRAIGHT VANILLA JS //



//    <!-- Original:  Rick Glusick -->

//<!-- This script and many more are available free online at -->
//<!-- The JavaScript Source!! http://javascript.internet.com -->

//<!-- Begin



// <NEW CODE>

// cache the locations where we want our game elements to display
var outputArea = document.getElementById('output');
var letterArea = document.getElementById('letters');
// move all the variables to the top
// Initialize the two arrays for letters and words
// Original isn't initializing arrays?? objects???
var Alphabet = new initAlphaArray(); // this line not new code. left alone. if it ain't broke
// The original Function to build array for the possible answers
// was creating a WordList Object, not an array
// That's why they added a "this.length = 42"
// There was no method called "length" in the type
// WordList that the OP created
// new ACTUAL array for the presidents
var newWord = [
    "GEORGE WASHINGTON",
    "JOHN ADAMS",
    "THOMAS JEFFERSON",
    "JAMES MADISON",
    "JAMES MONROE",
    "JOHN QUINCY ADAMS",
    "ANDREW JACKSON",
    "MARTIN VAN BUREN",
    "WILLIAM HENRY HARRISON",
    "JOHN TYLER",
    "JAMES POLK",
    "ZACHARY TAYLOR",
    "MILLARD FILLMORE",
    "FRANKLIN PIERCE",
    "JAMES BUCHANAN",
    "ABRAHAM LINCOLN",
    "ANDREW JOHNSON",
    "ULYSSES GRANT",
    "RUTHERFORD HAYES",
    "JAMES GARFIELD",
    "CHESTER ARTHUR",
    "GROVER CLEVELAND",
    "BENJAMIN HARRISON",
    "GROVER CLEVELAND",
    "WILLIAM MCKINLEY",
    "THEODORE ROOSEVELT",
    "WILLIAM HOWARD TAFT",
    "WOODROW WILSON",
    "WARREN HARDING",
    "CALVIN COOLIDGE",
    "HERBERT HOOVER",
    "FRANKLIN ROOSEVELT",
    "HARRY TRUMAN",
    "DWIGHT EISENHOWER",
    "JOHN KENNEDY",
    "LYNDON JOHNSON",
    "RICHARD NIXON",
    "GERALD FORD",
    "JIMMY CARTER",
    "RONALD REAGAN",
    "GEORGE BUSH",
    "BILL CLINTON",

    // added presidents elected since this script was written
    "GEORGE W BUSH",
    "BARRACK OBAMA",
    "ORANGE IDIOT"
];
var newRandomNumber = Math.floor(Math.random()*newWord.length);



// new variables to set a limit to number of wrong answers
var currentAttempt = 0;
var maxAttempts = 7;
var newSaveData = {};
// </ NEW CODE>
var SaveData = "";
var ImageNum = "";
var LettersSelected = "";
var RandomWord = "";
var DisplayWord = "";
var position = 0;


function getCookie (name) {
    var dcookie = document.cookie;
    var cname = name + "=";
    var clen = dcookie.length;
    var cbegin = 0;
    while (cbegin < clen) {
        var vbegin = cbegin + cname.length;
        if (dcookie.substring(cbegin, vbegin) == cname) {
            var vend = dcookie.indexOf (";", vbegin);
            if (vend == -1) vend = clen;
            return unescape(dcookie.substring(vbegin, vend));
        }
        cbegin = dcookie.indexOf(" ", cbegin) + 1;
        if (cbegin == 0) break;
    }
    return null;
}
function setCookie (name, value, expires) {
    if (!expires) expires = new Date();
    document.cookie = name + "=" + escape (value) + "; expires=" + expires.toGMTString() +  "; path=/";
}
function delCookie (name) {
    var expireNow = new Date();
    document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT" +  "; path=/";
}
// deleted other randomNumber nonsense
// they were using the current seconds of
// the current date
// tried to remove this and it broke
var expdate = new Date()
// moved this line of code up here to convey relevance
// Sets a cookie that will expire in 10 days
expdate.setTime (expdate.getTime() + (1000*60*60*24*10));
// Original Function to build new initAlphaArray data type for the letters of the alphabet
function initAlphaArray() {
    this.length = 26;
    this[0] = "A";
    this[1] = "B";
    this[2] = "C";
    this[3] = "D";
    this[4] = "E";
    this[5] = "F";
    this[6] = "G";
    this[7] = "H";
    this[8] = "I";
    this[9] = "J";
    this[10] = "K";
    this[11] = "L";
    this[12] = "M";
    this[13] = "N";
    this[14] = "O";
    this[15] = "P";
    this[16] = "Q";
    this[17] = "R";
    this[18] = "S";
    this[19] = "T";
    this[20] = "U";
    this[21] = "V";
    this[22] = "W";
    this[23] = "X";
    this[24] = "Y";
    this[25] = "Z";
}


// <NEW CODE>
// the for loop was originally outside of the function and passed i into it
// modified so the DOM manipulation is inside the function
// all this does is print the remaining available letters
// to the DOM
function newAvailableLetters(){
    var letterBuild = "";
    letterBuild += "<table><tr>";

    for(var i=0; i<26; i++){
        if(i===13){
            letterBuild += "</tr><tr>";
        }
        if(LettersSelected.charAt(i)==Alphabet[i]){
            letterBuild+= ('<TD width="20">' +
            '<A HREF="javascript:LoadNextPage('+i+',\''+Alphabet[i]+
            '\')">'+Alphabet[i]+'</A></TD>');


        }else{
            // need this to hold an empty spot in the table
            // holding the displayed letters
            letterBuild += '<TD width="20"> </TD>';

        }
    }
    letterBuild += "</tr></table>";
    letterArea.innerHTML = letterBuild;

}
// </NEW CODE>



// saves which letters have been selected and reloads the page
function LoadNextPage(selected) {
    var j=0;
    var HoldLettersSelected = LettersSelected;

    // <NEW CODE>
    var checkNum = 0;
    // hacked in a lose condition right here with this loop!
    for(var c=0; c<RandomWord.length; c++){
        if(Alphabet[selected]===RandomWord.charAt(c)){
            checkNum++;
        }
    }
    // if none of the letters in the RandomWord is a match
    // for the one that was clicked, increment the currentAttempt Counter
    if(checkNum===0) currentAttempt++;
    // </NEW CODE>





    LettersSelected = "";
    if (selected == 0) {
        for (j=1; j<=25; j++) {
            LettersSelected += HoldLettersSelected.charAt(j);
        }
        LettersSelected = "^" + LettersSelected;
    }
    else if (selected == 25) {
        for (j=0; j<=24; j++) {
            LettersSelected += HoldLettersSelected.charAt(j);
        }
        LettersSelected += "^";
    }
    else {
        for (j=0; j<selected; j++)
        {
            LettersSelected += HoldLettersSelected.charAt(j);
        }
        LettersSelected += "^";
        for (j=selected+1; j<=25; j++) {
            LettersSelected += HoldLettersSelected.charAt(j);
        }
    }



    SaveData = ImageNum + LettersSelected + RandomWord + "*" + currentAttempt; // modify cookie data
    //<NEW CODE>
    newSaveData = {
        "imgnum": ImageNum,
        "letters": LettersSelected,
        "answer": RandomWord,
        "attempt": currentAttempt
    };
    //</NEW CODE>
    setCookie("_HangMan", SaveData, expdate);


    history.go(0);
}






if(getCookie("_HangMan") == null) { // if there is no cookie start new game
    ImageNum = "A";
    LettersSelected = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // <NEW CODE>
    // using my new Array and
    // new Random Number generation
    RandomWord = newWord[newRandomNumber];
    newSaveData = {
        "imgnum": ImageNum,
        "letters": LettersSelected,
        "answer": RandomWord,
        "attempt": currentAttempt
    };
    // </NEW CODE>

    SaveData = ImageNum + LettersSelected + RandomWord + "*" + currentAttempt;// modify cookie data
    // this log lets us see the answer in the console
    // only at the beginning of a new game
    console.log(SaveData);
    setCookie("_HangMan", SaveData, expdate);
} else {
    SaveData = getCookie("_HangMan");
    ImageNum = SaveData.charAt(0);
    for (position=1; position<=26; position++) {
        LettersSelected += SaveData.charAt(position);
    }
    for (position=27; position<SaveData.indexOf("*"); position++) {
        RandomWord += SaveData.charAt(position);
    }
    // its actually fortuitous she used this * as a delimiter in her cookie data
    // it adds variable length capabilities to this parser

    // OMG this save data needs to be an object brb
    // lazy way to do it in here is with a new var
    var newTempVar; // variable to build out current attempt from SaveData
    for(position=SaveData.indexOf("*")+1; position<SaveData.length; position++){
        newTempVar = SaveData.charAt(position);
        currentAttempt = newTempVar;

    }
}
// Builds the DisplayWord
for (var i=0; i<RandomWord.length; i++) {
    if (RandomWord.charAt(i) == ' ') {
        DisplayWord += " ";
    }
    else {
        var MatchFound = false;
        for (var j=0; j<=25; j++) {
            if ((LettersSelected.charAt(j) == "^") && (RandomWord.charAt(i) == Alphabet[j])) {
                DisplayWord += RandomWord.charAt(i);
                MatchFound = true;

            }
        }

        if (!MatchFound){
            DisplayWord += "-";

        }
    }
}




// <NEW CODE>



// variable to hold everything that will be placed in the display Area
var outputBuild ="";

// originally, she had a completely impossible Lose Condition
// I'm assuming she had it in there for testing purposes.
if(currentAttempt>=maxAttempts){
    // this will never happen!!
    // in the original game you could not lose
    outputBuild += 'You Lost!<br>Answer: '+ RandomWord;
} else if(RandomWord == DisplayWord){
    outputBuild += 'You Win!';
} else{
    newAvailableLetters();
}



outputBuild += '<br>' + DisplayWord;
outputBuild += '<br><button onClick="delCookie(\'_HangMan\');history.go(0);">NewGame</button>';



// send the DisplayWord and the Button to the page;

outputArea.innerHTML = outputBuild;
document.getElementById('attempt').innerHTML += '<br>Number of Failed Attempts: ' + currentAttempt;


// </ NEW CODE>

