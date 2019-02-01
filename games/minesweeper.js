/* A basic minesweeper game with a 4x4 board and 4 mines. */

/* Board class: model storing information about the field */

const Board = function() {
  this.field = [];
  for (var i = 0; i < 4; i++) {
    this.field.push([0, 0, 0, 0]);
  }
  this.view = [];
  for (var i = 0; i < 4; i++) {
    this.view.push(['-', '-', '-', '-']);
  }
};

Board.prototype.setMines = function(mines) {
  while (mines > 0) {
    const x = pickRandom(4);
    const y = pickRandom(4);
    if (this.field[x][y] === 0) {
      this.field[x][y] = '!';
      mines--;
    }
  }
};

Board.prototype.setWarnings = function() {
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
      const val = this._tallySurroundingMines(x, y);
      this.field[x][y] = val;
    }
  }
};

Board.prototype.reset = function() {
  this.field = [];
  for (var i = 0; i < 4; i++) {
    this.field.push([0, 0, 0, 0]);
  }
  this.view = [];
  for (var i = 0; i < 4; i++) {
    this.view.push(['-', '-', '-', '-']);
  }
};

Board.prototype._tallySurroundingMines = function(x, y) {
  if (this.field[x][y] !== '!') {
    const adjacents = this._findAdjacentTiles(x, y);
    return count = adjacents.reduce((acc, tile) => {
      if (tile === '!') {
        return acc + 1;
      }
      return acc;
    }, 0, this);
  }
  return '!';
}

Board.prototype._findAdjacentTiles = function(x, y) {
  const adjIndices = [];
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      const adjX = x + i;
      const adjY = y + j;
      if ((i !== adjX || j !== adjY) && isInBounds(adjX, 4) && isInBounds(adjX, 4)) {
        adjIndices.push([adjX, adjY]);
      }
    }
  }
  return adjIndices.map((index) => {
    const x = index[0];
    const y = index[1];
    return this.field[x][y];
  }, this);
}

/* Game class: interface for a user's actions */

const Game = function() {
  this.board = new Board;
  this.board.setMines(4);
  this.board.setWarnings();
}

Game.prototype.uncoverTile = function(x, y) {
  if (this.board.field[x][y] === '!') {
    console.log('KABOOM!!!');
    this._reveal(x, y);
    console.log(this.board.view);
    console.log('You are dead. Use .reset to try again.');
  } else {
    this._reveal(x, y);
    console.log(this.board.view);
  }
}

Game.prototype.reset = function() {
  this.board.reset();
  this.board.setMines(4);
  this.board.setWarnings();
}

Game.prototype._reveal = function(x, y) {
  this.board.view[x][y] = this.board.field[x][y];
};

/* Helpers */

const isInBounds = function(i, max) {
  return (i > -1 && i < max);
}

const pickRandom = function(max) {
  return Math.floor(Math.random() * max);
}