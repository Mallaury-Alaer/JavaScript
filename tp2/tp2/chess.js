var canvas = document.getElementById("screen");
var gfx = canvas.getContext("2d");

// définition du constructeur du type Piece
var Piece = function(name, color, line, column){
    this.name    = name   || 'empty'; // si il n'y a pas de paramètre 'name', utiliser 'empty' 
    this.line    = line   || 0;
    this.column  = column || 0;
    this.color   = color  || 'grey';
    this.pieceId = undefined;
};

// définition d'une méthode du type Piece: il est crucial de la créer 
// au niveau du prototype et non pas de l'objet !
// Cette fonction sera pratique pour calculer le déplacement des pièces
// quelle que soit leur orientation
Piece.prototype.orientation = function() {
    return (this.color === 'white') ? +1 : -1;
}

// Constructeur du type Pawn, observez attentivement l'appel au constructeur de Piece !
// pieceId correspond aux coordonnées d'extraction des images du pion en blanc puis noir
var Pawn = function(color, line, column) {
    Piece.prototype.constructor.call(this, 'Pawn', color, line, column);
    this.pieceId = [[0, 5], [480, 5]];
}
Pawn.prototype = new Piece();

var createBoard = function(nbLine, nbColumn){
    var x = 0;
    var y =0;
    gfx.strokeStyle = 'black';
    for(var i = 0; i<nbLine; i++){
        if(i>0){y+=75;}
        x=0;
        for(var j = 0; j<nbColumn; j++){
            if(i%2 == 0){
                if(j%2==0)
                    gfx.fillStyle = 'lightgrey';
                if(j%2 != 0)
                    gfx.fillStyle = 'darkgrey';
            }else if(i%2!=0){
                if(j%2 == 0)
                    gfx.fillStyle = 'darkgrey';
                else if(j%2 != 0)
                    gfx.fillStyle = 'lightgrey';
            }
            gfx.strokeRect(x, y, 75,75);
            gfx.fillRect(x,y,75,75);
            x+=75;
        }
    }
};
var isEmpty = function(lig, col){
    if(tab_pieces[lig][col] == null)
        return true;
    else
        return false;
}

var put = function(lig, col, piece){
    if(isEmpty(lig, col)){
        tab_piece[lig][col] = piece;
    }
}

var board = createBoard(8, 8);

//Creer les pieces correspondantes avec l'instance piece
var initBoard = function(){// avec les pièces du jeu
    var chessSymbols = new Image();
    chessSymbols.src = 'chess.png';
    
    chessSymbols.onload = function(){
        console.info('Chess Symbols loaded !');
        //Dessin des pions
        var cpt = 0;
        for(var i = 0; i<8; i++){
            gfx.drawImage(chessSymbols,0,0,75,75,cpt,75,70,70);
            gfx.drawImage(chessSymbols,475,0,75,75,cpt, 450,70,70);
            cpt+=75;
        }
        
        var a = 0;
        var b = 75;
        var c = 150;
        for(var i = 0; i<2;i++){
            //Dessin des tours
            gfx.drawImage(chessSymbols,240,0,75,75,a,0,70,70);
            gfx.drawImage(chessSymbols,715,0,75,75,a, 525,70,70);
            a+=75*7;
            //Dessin des cavaliers
            gfx.drawImage(chessSymbols,75,0,75,75,b,0,70,70);
            gfx.drawImage(chessSymbols,550,0,75,75,b, 525,70,70);
            b+=75*5;
            //Dessin des fous
            gfx.drawImage(chessSymbols,160,0,75,75,c,0,70,70);
            gfx.drawImage(chessSymbols,640,0,75,75,c, 525,70,70);
            c+=75*3;
        }
        gfx.drawImage(chessSymbols,320,0,75,75,225,0,70,70);
        gfx.drawImage(chessSymbols,800,0,75,75,225, 525,70,70);
        gfx.drawImage(chessSymbols,395,0,80,75,300,0,70,70);
        gfx.drawImage(chessSymbols,875,0,80,75,300, 525,70,70); 
    }
} 

var convertCoordinates = function(ligPixel, colPixel) {
    var lig = Math.ceil(ligPixel / (canvas.height/8)) - 1;
    var col = Math.ceil(colPixel / (canvas.width /8)) - 1;
    return [lig, col];
}

// liste des coordonnées des cellules libres accessibles par la pièce actuellement
// sélectionnée par l'utilisateur
var highlightedCells = [];

// on prend la coordonnée de la cellule à dessiner et une couleur correspondant 
// au carré dessiné dans la case si elle ne contient pas de pièce (gris si la 
// case n'est pas sélectionnée pour représenter un déplacement valide et jaune sinon) 
// var drawCell = function(coord, color)
    
//var highlight = function(on)
    
canvas.addEventListener("mousedown", mouseClicked, false);
//var mouseClicked = function(event) { // Pourquoi cela ne fonctionne pas avec var ?!
function mouseClicked(event) {
/*    var ligCoord = event.pageY - canvas.offsetTop;
    var colCoord = event.pageX - canvas.offsetLeft;
    var coord    = convertCoordinates(ligCoord, colCoord);
    console.info(coord);
    if (highlightedCells.length > 0) {
        highlight(false);
        highlightedCells = [];
    }
    var piece = board[coord[0]][coord[1]];
    if (piece.name !== '.') {
        var moves = piece.getMoves();
        highlightedCells.push(moves);
        highlight(true);
    } else {
        // TODO: if empty and highlighted, move the piece !
        // doMove();
    }*/
}

// initialise le plateau en déposant les pièces de deux joueurs au début de la partie
initBoard();

// Pour dessiner le plateau, on spécifie le coin supérieur gauche, la 
// largeur et la hauteur. Dans cette fonction, on appelle drawCell 
// pour dessiner une cellule à une coordonnée donnée.
//var drawGrid = function(x, y, width, height, nbLig, nbCol) {