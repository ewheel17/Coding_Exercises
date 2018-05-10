
var Hang = {
    words: ["picasso", "dali", "monet", "warhol", "michelangelo", "rembrandt"],
    guesses: 10,
    gameOver: false,
    theWord: "",
    guessWords: [],
    arrayWord: [],
    guessWord: "",
    displayWord: "",
    attempted: [],
    wins: 0,
    


    startGame: function() {
        this.theWord = this.chooseWord();
        this.guessWords = this.printBlank(this.theWord); // Returns Array with "displayWord,guessWord".
        this.arrayWord = this.guessWords[2];
        this.guessWord = this.guessWords[1];
        this.displayWord = this.guessWords[0];

        this.guesses = 10;
        this.wins = 0;

        document.getElementById("xxi").innerHTML = '<h4>Guesses Remaining:</h4><input id="xxx" maxlength="2" disabled>'
        document.getElementById("xxg").innerHTML = '<h4>Guessed Letters:</h4><input id="xxf" disabled>'
        document.getElementById("xxc").innerHTML = '<h4>Total Wins:</h4><input type="text" id="winBox" disabled>';
        document.getElementById("winBox").value = this.wins;
        document.getElementById("xxx").value = this.guesses;
        this.gameOver = false;

        document.getElementById("displayDiv").innerHTML = '<h4>Enter a new guess!</h4><input type="text" id="typeBox" maxlength="1" onkeyup="Hang.playGame()">';
        document.getElementById("xxl").innerHTML = this.displayWord;
        
        this.getPainting(this.theWord);
    },

    resetGame: function() {
        this.theWord = this.chooseWord();
        this.guessWords = this.printBlank(this.theWord); // Returns Array with "displayWord,guessWord".
        this.arrayWord = this.guessWords[2];
        this.guessWord = this.guessWords[1];
        this.displayWord = this.guessWords[0];

        this.guesses = 10;
        this.attempted = [];

        document.getElementById("xxi").innerHTML = '<h4>Guesses Remaining:</h4><input id="xxx" maxlength="2" disabled>'
        document.getElementById("xxg").innerHTML = '<h4>Guessed Letters:</h4><input id="xxf" disabled>'
        document.getElementById("xxc").innerHTML = '<h4>Total Wins:</h4><input type="text" id="winBox" disabled>';
        document.getElementById("winBox").value = this.wins;
        document.getElementById("xxx").value = this.guesses;
        

        document.getElementById("displayDiv").innerHTML = '<h4>Enter a new guess!</h4><input type="text" id="typeBox" maxlength="1" onkeyup="Hang.playGame()">';
        document.getElementById("xxl").innerHTML = this.displayWord;
        
        this.getPainting(this.theWord);
    },

    playGame: function () {
 
        var guessLetter = this.getLetter();

        if (!this.checkLetter(guessLetter)) {
            return;
        }

        for (k = 0; k < this.attempted.length; k++) {
            if (this.attempted[k] === guessLetter) {
                return;
            }
        }
        this.attempted.push(guessLetter);
        var noHurt = false;

        
        for (i = 0; i < this.theWord.length; i++) {

            if (this.theWord[i] === guessLetter) {

                this.guessWord = this.replaceAt(this.guessWord, i, guessLetter);

                noHurt = true;
            }
        }

        for (j = 0; j < this.arrayWord.length; j++) {

            if (this.theWord[j] === guessLetter) {

                this.arrayWord[j] = this.theWord[j];
            }
        }


        if (noHurt === false) {
            this.guesses--;
        } else {
            this.displayWord = this.arrayWord.join(" ");
        }


        if (this.theWord === this.guessWord) {
            this.wins ++
            document.getElementById("winBox").value = this.wins;
            this.resetGame();
        } else if (this.guesses === 0) {
            this.startGame();
            
        }


        document.getElementById("xxx").value = this.guesses;
        document.getElementById("xxf").value = this.attempted;
        document.getElementById("xxl").innerHTML = this.displayWord;
        
    },

    chooseWord: function() {
        var randNum = Math.floor(Math.random() * this.words.length);
        var chosenWord = this.words[randNum];
        console.log(chosenWord);
        return chosenWord;
    },

    printBlank: function(chosenWord) {
        var displayWord = [];
        var guessWord = [];
        var arrayWord = [];

        for (i = 0; i < chosenWord.length; i++) {
            arrayWord[i] = "_";
        }

        for (j = 0; j < chosenWord.length; j++) {
            displayWord.push("_");
            guessWord.push("_");
        }

        displayWord = displayWord.join(" ");
        guessWord = guessWord.join("");
        document.getElementById("xxl").innerHTML = displayWord;

        return [displayWord, guessWord, arrayWord];
    },

    getLetter: function() {
        var chosenLetter = document.getElementById("typeBox").value.toLowerCase();
        
        document.getElementById("typeBox").value = "";
        
        return chosenLetter;
    },

    replaceAt: function(str, index, chr) {
        str = this.setCharAt(str,index,chr);
        console.log(str);
        return(str);
    },

    setCharAt: function(str, index, chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    },

    checkLetter: function(x) {
        var Alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        var isLetter = false;
        
        for (i = 0; i < Alphabet.length; i++) {
            if (Alphabet[i] === x) {
                isLetter = true;
            }
        }

        return isLetter;
    },

    getPainting: function(x) {
        if (x === "picasso") {
            document.getElementById("paints").innerHTML = '<img src="assets/images/picasso.jpg" alt="Painting" style="height:400px;">';
        } else if (x === "dali") {
            document.getElementById("paints").innerHTML = '<img src="assets/images/dali.jpg" alt="Painting" style="height:400px;">';
        } else if (x === "monet") {
            document.getElementById("paints").innerHTML = '<img src="assets/images/monet.jpg" alt="Painting" style="height:400px;">';
        } else if (x === "warhol") {
            document.getElementById("paints").innerHTML = '<img src="assets/images/Warhol.jpg" alt="Painting" style="height:250px;">';
        } else if (x === "michelangelo") {
            document.getElementById("paints").innerHTML = '<img src="assets/images/michelangelo.jpg" alt="Painting" style="height:400px;">';
        } else if (x === "rembrandt") {
            document.getElementById("paints").innerHTML = '<img src="assets/images/rembr.jpg" alt="Painting" style="height:400px;">';
        }
    }
    
}

