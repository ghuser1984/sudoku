// Использовать файловую систему.
const fs = require('fs');
// Использовать функции из файла sudoku.js.
const sudoku = require('./sudoku');

// Головоломки судоку, которые решит ваша программа, можно найти
// в файле sudoku-puzzles.txt.
//
// Помните, что файл имеет символы новой строки в конце каждой строки,
// так что вы должны удалить их.

// Получает одну головоломку из текстового файла.
function sudokuParse(content, puzzleNumber = 0) {
  let puzzle = content.split('\n')[puzzleNumber];
  console.log('Исходный вариант судоку');
  console.log(puzzle);
  return puzzle;
}

function readAndSolve(err, data) {
  if (err) {
    throw err;
  }
  let puzzle = sudokuParse(data);

  let solvedPuzzle = sudoku.solve(puzzle);
  if (sudoku.isSolved(solvedPuzzle)) {
    console.log('Доска решена!');
    console.table(sudoku.prettyBoard(solvedPuzzle));
  } else {
    console.log('Доска не была решена :(');
  }
}

// Читает файл и отправляет данные из него в функцию readAndSolve.
fs.readFile(
  './sudoku-puzzles.txt',
  'utf-8',
  readAndSolve,
);
