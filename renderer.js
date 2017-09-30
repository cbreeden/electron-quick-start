// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// HTMLCollection.prototype.forEach = Array.prototype.forEach;
// NodeList.prototype.forEach = Array.prototype.forEach;
const SVG = require('svgjs');
require('svg.draggable.js');

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

let place_piece = function(data) {
    const path = 'static/' + data.color + '_' + data.type + '.svg';
    board
        .image(path, 1, 1)
        .move(data.col, data.row)
        .addClass('piece')
        .remember('col', data.col)
        .remember('row', data.row)
        .id('piece-' + file[data.col] + rank[data.row])
        .draggable({
            minX: 0,
            minY: 0,
            maxX: 8,
            maxY: 8
        });
}

// place pieces
let pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
for (let col = 0; col < 8; col++) {
    place_piece({ color: 'white', type: 'pawn', row: 6, col: col });
    place_piece({ color: 'black', type: 'pawn', row: 1, col: col });
    place_piece({ color: 'white', type: pieces[col], row: 7, col: col });
    place_piece({ color: 'black', type: pieces[col], row: 0, col: col });
}

board.path('m0 100 h25 v300 h50 v-300 h25 L50 0z')
    .attr({
        "fill-opacity": 0.85,
        fill: "#ff0000",
        "fill-rule": "evenodd"
    })
    .width(0.33)
    .height(1)
    .move(0.33, 0.5);

SVG.get('piece-a7').front();