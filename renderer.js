// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// HTMLCollection.prototype.forEach = Array.prototype.forEach;
// NodeList.prototype.forEach = Array.prototype.forEach;
const SVG = require('svgjs');

let selected_square = document.getElementById('selected-square');
let board = SVG('chessboard')
    .size('100%', '100%')
    .viewbox(0, 0, 8, 8);

const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rank = ['8', '7', '6', '5', '4', '3', '2', '1'];
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const position = file[row] + rank[col];
        const square_color = (row + col) % 2 == 0 ? 'white-square' : 'black-square';
        let square = board
            .rect(1, 1)
            .move(row, col)
            .addClass('board-square')
            .addClass(square_color)
            .id(position);

        square.mouseover(function() {
            selected_square.innerText = position;
            this.addClass('selected');
        });

        square.mouseout(function() {
            selected_square.innerText = "";
            this.removeClass('selected');
        })
    }
}

let pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];

// place pieces
for (let col = 0; col < 8; col++) {
    // pawns
    board
        .image('static/white_pawn.svg', 1, 1)
        .move(col, 6)
        .addClass('piece')
        .remember('col', col)
        .remember('row', 6);

    board
        .image('static/black_pawn.svg', 1, 1)
        .move(col, 1)
        .addClass('piece')
        .remember('col', col)
        .remember('row', 1);

    // other
    board
        .image('static/white_' + pieces[col] + '.svg', 1, 1)
        .move(col, 7)
        .addClass('piece')
        .remember('col', col)
        .remember('row', 7);

    board
        .image('static/black_' + pieces[col] + '.svg', 1, 1)
        .move(col, 0)
        .addClass('piece')
        .remember('col', col)
        .remember('row', 0);
}