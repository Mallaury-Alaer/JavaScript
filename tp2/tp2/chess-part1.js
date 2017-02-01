// récupération du contexte graphique
var canvas = document.getElementById("essai2");
var gfx    = canvas.getContext("2d");


var chessSymbols = new Image();
chessSymbols.src = 'chess.png';
canvas.width = 1000;
canvas.height = 500;


chessSymbols.onload = function() {
    console.info("Chess symbols loaded !");
    gfx.drawImage(chessSymbols, 0, 0, chessSymbols.width, chessSymbols.height);
    gfx.drawImage(chessSymbols, 0, 0, 75, 75, (chessSymbols.width-75)/2, 75, 75, chessSymbols.height);
};
    
undefined;