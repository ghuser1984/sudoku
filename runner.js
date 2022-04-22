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
// console.log(fileIn);

function sudokuParse(content, puzzleNumber = 0) {
  const puzzle = content.split('\n')[puzzleNumber];
  // console.log('parser');
  console.log(puzzle);
  // console.log(puzzle.length);
  const re = /.{9}/gi;
  // console.log(puzzle.match(re));
  const intArray = puzzle.match(re);
  const outArray = intArray.map((el) => el.split(''));
  // console.log(outArray.length);
  // console.log(outArray);
  return outArray;
}

const arrTest = sudokuParse(fileIn, 0);
console.log(arrTest);

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
