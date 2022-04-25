// Use filesystem.
const fs = require('fs');
// Use functions from sudoku.js file.
const sudoku = require('./sudoku');

// The sudoku puzzles that your program will solve can be found
// in the sudoku-puzzles.txt file.
//
// Remember, the file has newline characters at the end of each line,
// so you should remove them.

// Gets one puzzle from the text file.
const fileIn = fs.readFileSync(
  './sudoku-puzzles.txt',
  'utf-8',
);
const fileToRead = './sudoku-puzzles.txt';

// reads *.txt file with
function sudokuParse(content, puzzleNumber = 0) {
  const puzzle = content.split('\n')[puzzleNumber];
  // console.log('parser');
  // console.log(puzzle);
  // console.log(puzzle.length);
  const re = /.{9}/gi;
  // console.log(puzzle.match(re));
  const intArray = puzzle.match(re);
  const outArray = intArray.map((el) => el.split(''));
  // console.log(outArray.length);
  // console.log(outArray);
  return outArray;
}

// function for reading file
// and outputing particular
// string in form of board
const sudokuOut = function (file, strNb) {
  const fl = fs.readFileSync(file, 'utf-8');
  const arr = sudokuParse(fl, strNb);
  console.log('-->', (('012345678').split('')).join(' '));
  console.log('-----------------------');
  for (let i = 0; i < arr.length; i += 1) {
    console.log(i, '|', arr[i].join(' '));
  }
  console.log('-----------------------');
  console.log('-->', (('012345678').split('')).join(' '));
};

// sudokuOut(fileToRead, 0);

// function defins whether number can be put
// in paticular cell of our grid;
const validNb = function (s, e, nb) {
  const fileIn = fs.readFileSync('./sudoku-puzzles.txt', 'utf-8');
  const grid = sudokuParse(fileIn, 0);
  // loop through all the souths (y coord)
  for (let i = 0; i < 9; i += 1) {
    if (grid[s][i] == nb) {
      return false;
    }
  }
  // loop through all the eastings (x coord)
  for (let i = 0; i < 9; i += 1) {
    if (grid[i][e] == nb) {
      return false;
    }
  }
  const sCell = Math.floor(s / 3) * 3;
  const eCell = Math.floor(e / 3) * 3;
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (grid[sCell + i][eCell + i] == nb) {
        return false;
      }
    }
  }
  return true;
};

// console.log(validNb(1, 0, 3));

for (let i = 1; i <= 9; i += 1) {
  console.log(i, '-->', validNb(0, 8, i));
}

// draw a nice grid
// const gridOut = function (gridIn) {
//   console.log('  |', (('012345678').split('')).join(' '));
//   console.log('-----------------------');
//   for (let i = 0; i < gridIn.length; i += 1) {
//     console.log(i, '|', gridIn[i].join(' '));
//   }
//   console.log('-----------------------');
//   console.log('  |', (('012345678').split('')).join(' '), '\n');
// };
//
// function

const gridOut = function (gridIn) {
  console.table(gridIn);
};
//
const tryToSolve = function (strNb) {
  const fileIn = fs.readFileSync('./sudoku-puzzles.txt', 'utf-8');
  const grid = sudokuParse(fileIn, strNb);
  console.log('Before solving');
  gridOut(grid);
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (grid[i][j] === '-') {
        for (let n = 1; n <= 9; n += 1) {
          if (validNb(i, j, n)) {
            // console.log(i, j, n);
            grid[i][j] = String(n);
          }
        }
      }
    }
  }
  console.log('Kind of Solved =))');
  gridOut(grid);
  // return (true);
};

tryToSolve(0);

function readAndSolve(err, data) {
  if (err) {
    throw err;
  }

  const puzzle = sudokuParse(data);

  const solvedPuzzle = sudoku.solve(puzzle);
  if (sudoku.isSolved(solvedPuzzle)) {
    console.log('The board was solved!');
    console.log(sudoku.prettyBoard(solvedPuzzle));
  } else {
    console.log("The board wasn't solved :(");
  }
}

// Reads file and sends data from it to the readAndSolve function.
fs.readFile(
  './sudoku-puzzles.txt',
  'utf-8',
  readAndSolve,
);
