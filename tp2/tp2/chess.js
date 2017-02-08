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

var King = function(color, line, column){
    Piece.prototype.constructor.call(this,'King', color, line, column);
    this.pieceId = [[400, 5], [880, 5]];
}
King.prototype = new Piece();

var Queen = function(color, line, column){
    Piece.prototype.constructor.call(this, 'Queen', color, line, column);
    this.pieceId = [[320, 5], [802, 5,]];
}
Queen.prototype = new Piece();

//Tour
var Rook = function (color, line, column){
    Piece.prototype.constructor.call(this, 'Rook', color, line, column);
    this.pieceId = [[240, 5], [720, 5]];
}
Rook.prototype = new Piece();

//Fou
var Bishop = function(color, line, column){
    Piece.prototype.constructor.call(this, 'Bishop', color, line, column);
    this.pieceId = [[160, 5], [640, 5]];
}
Bishop.prototype = new Piece();

//Cavalier
var Knight = function(color, line, column){
    Piece.prototype.constructor.call(this, 'Knight', color, line, column);
    this.pieceId = [[80, 5], [560, 5]];
}
Knight.prototype = new Piece();

var createBoard = function(nbLine, nbColumn){
    var tab = [];
    for(var i = 0; i<nbLine; i++){
        for(var j = 0; j<nbColumn; j++){
            tab.push(new Piece('empty', null, i,j));
        }
    }
    return tab;
};

var board = createBoard(8, 8);

var isEmpty = function(lig, col){
    for(var i=0; i<64; i++){
	if(board[i].line == lig && board[i].column == col && board[i].name == 'empty')
	    return true;
    }
    return false;
}

var put = function(lig, col, piece){
    for(var i=0; i<64; i++){
	if(board[i].line == lig && board[i].column == col && isEmpty(lig, col))
	    board[i] = piece;
    }
}

var initBoard = function(){
    var chessSymbols = new Image();
    chessSymbols.src = 'chess.png';
    
    chessSymbols.onload = function(){
        console.info('Chess Symbols loaded !');
        drawGrid(0,0, canvas.width, canvas.height, 8, 8); 
        
        /*PAWNS*/ 
        //WHITE
        for(var i = 8; i<16; i++){
            board[i] = new Pawn('white', 1,(i-8));
            gfx.drawImage(chessSymbols, board[i].pieceId[0][0], board[i].pieceId[0][1], 75, chessSymbols.height, ((canvas.width/8)*(i-8)), canvas.height/8, 75, chessSymbols.height);
        }
        
        //BLACK
        for(var i = 48; i<56; i++){
            board[i] = new Pawn('black', 6, (i-48));
            gfx.drawImage(chessSymbols, board[i].pieceId[1][0], board[i].pieceId[1][1], 75, chessSymbols.height, ((canvas.width/8)*(i-48)), (canvas.height/8)*6, 75, chessSymbols.height);
        }
        
        /*KING*/
        //WHITE
        board[3] = new King('white', 0, 3);
        gfx.drawImage(chessSymbols, board[3].pieceId[0][0], board[3].pieceId[0][1],75, chessSymbols.height, (canvas.width/8)*3, 0, 75, chessSymbols.height);
        
        //BLACK
        board[59] = new King('black', 7,3);
        gfx.drawImage(chessSymbols, board[59].pieceId[1][0], board[59].pieceId[1][1], 75, chessSymbols.height, ((canvas.width/8)*3), canvas.height-(canvas.height/8), 75, chessSymbols.height);
        
        /*QUEEN*/
        //WHITE
        board[4] = new Queen('white', 0,4);
        gfx.drawImage(chessSymbols, board[4].pieceId[0][0], board[4].pieceId[0][1],75, chessSymbols.height, (canvas.width/8)*4, 0, 75, chessSymbols.height);

        //BLACK
        board[60] = new Queen('black', 7, 4);
        gfx.drawImage(chessSymbols, board[60].pieceId[1][0], board[60].pieceId[1][1], 75, chessSymbols.height, ((canvas.width/8)*4), canvas.height-(canvas.height/8), 75, chessSymbols.height);
        
        /*ROOK*/
        //WHITE
        board[0] = new Rook('white', 0, 0);
        board[7] = new Rook('white', 0, 7);
        gfx.drawImage(chessSymbols, board[0].pieceId[0][0], board[0].pieceId[0][1],75, chessSymbols.height, 0, 0, 75, chessSymbols.height);
        gfx.drawImage(chessSymbols, board[7].pieceId[0][0], board[7].pieceId[0][1],75, chessSymbols.height, (canvas.width/8)*7, 0, 75, chessSymbols.height);
        
        //BLACK
        board[56] = new Rook('black', 7, 0);
        board[63] = new Rook('black', 7, 7);
        gfx.drawImage(chessSymbols, board[56].pieceId[1][0], board[56].pieceId[1][1], 75, chessSymbols.height, 0, canvas.height-(canvas.height/8), 75, chessSymbols.height);
        
        gfx.drawImage(chessSymbols, board[63].pieceId[1][0], board[63].pieceId[1][1], 75, chessSymbols.height, (canvas.width/8)*7, canvas.height-(canvas.height/8), 75, chessSymbols.height);
        
        /*BISHOP*/
        //WHITE
        board[2] = new Bishop('white', 0, 2);
        board[5] = new Bishop('white', 0, 5);
        gfx.drawImage(chessSymbols, board[2].pieceId[0][0], board[2].pieceId[0][1],75, chessSymbols.height, (canvas.width/8)*2, 0, 75, chessSymbols.height);
        gfx.drawImage(chessSymbols, board[5].pieceId[0][0], board[5].pieceId[0][1],75, chessSymbols.height, (canvas.width/8)*5, 0, 75, chessSymbols.height);

        //BLACK
        board[58] = new Bishop('black', 7, 2);
        board[61] = new Bishop('black', 7, 5);
        gfx.drawImage(chessSymbols, board[58].pieceId[1][0], board[58].pieceId[1][1], 75, chessSymbols.height, ((canvas.width/8)*2), canvas.height-(canvas.height/8), 75, chessSymbols.height);
        gfx.drawImage(chessSymbols, board[61].pieceId[1][0], board[61].pieceId[1][1], 75, chessSymbols.height, (canvas.width/8)*5, canvas.height-(canvas.height/8), 75, chessSymbols.height);
        
        /*KNIGHT*/
        //WHITE
        board[1] = new Knight('white', 0, 1);
        board[6] = new Knight('white', 0, 6);
        gfx.drawImage(chessSymbols, board[1].pieceId[0][0], board[1].pieceId[0][1],75, chessSymbols.height, canvas.width/8, 0, 75, chessSymbols.height);
        gfx.drawImage(chessSymbols, board[6].pieceId[0][0], board[6].pieceId[0][1],75, chessSymbols.height, (canvas.width/8)*6, 0, 75, chessSymbols.height);
        
        //BLACK
        board[57] = new Knight('black', 7, 1);
        board[64] = new Knight('black', 7, 6);
        gfx.drawImage(chessSymbols, board[57].pieceId[1][0], board[57].pieceId[1][1], 75, chessSymbols.height, canvas.width/8, canvas.height-(canvas.height/8), 75, chessSymbols.height);
        gfx.drawImage(chessSymbols, board[64].pieceId[1][0], board[64].pieceId[1][1], 75, chessSymbols.height, (canvas.width/8)*6, canvas.height-(canvas.height/8), 75, chessSymbols.height);
        
        
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
var drawGrid = function(x, y, width, height, nbLig, nbCol) {
    var t = height/nbLig;
    var u = width/nbCol;
    var n = -1;
    
    gfx.strokeStyle = 'black';
    gfx.fillStyle= 'rgd(0,0,0)';
    gfx.fillRect(0,0,width, height);
    for(var i = x; i<height; i+=t){
	n++;
	for(var j = y; j<width; j+=u){
	    if(n%2 != 0)
		  gfx.fillStyle = 'lightgrey';
	    else
            gfx.fillStyle = 'darkgrey';
	    
	    gfx.fillRect(j+2, i+2, t-4, u-4);
	    n++;
	}
    }
    
}