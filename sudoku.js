/* eslint-disable no-plusplus */
// переводим доску из строки в подмассив
function boardFromStringToArray(boardString) {
  const boardStringArr = boardString.split('');
  const boardArray = [];
  for (let i = 0; i < Math.ceil(boardStringArr.length / 9); i++) {
    boardArray[i] = boardStringArr.slice((i * 9), (i * 9) + 9);
  }
  console.log('\nВывод визуально правильной доски');
  console.table(boardArray);
  return boardArray;
}

// проверка валидности элемента
function check(num, pos, board) {
  const [c, r] = pos;
  for (let i = 0; i < 9; i++) {
    if (board[i][c] === num && i !== r) return false;
  }
  for (let i = 0; i < 9; i++) {
    if (board[r][i] === num && i !== c) return false;
  }
  const boxRow = Math.floor((r / 3) * 3);
  const boxCol = Math.floor((c / 3) * 3);
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num && i !== r && j !== c) return false;
    }
  }
  return true;
}

function findPositionElement(boardArr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (boardArr[i][j] === '-') return [i, j];
    }
  }
  return null;
}
// вычисляем судоку
function solve(board) {
  if (typeof board === 'string') board = boardFromStringToArray(board);
  const currPos = findPositionElement(board);
  if (currPos === null) return true;
  for (let i = 1; i <= 9; i++) {
    const currNum = i.toString();
    const isCheck = check(currNum, currPos, board);
    if (isCheck) {
      const [x, y] = currPos;
      board[x][y] = currNum;
      if (solve(board)) return true;
      board[x][y] = '-';
    }
    console.table(board);
  }
  return true;
}

// возвращем логическое значение (решена/не решена)
function isSolved(board) {}

// выводим на экран решенную судоку
function prettyBoard(board) {}

// Экспортирует все функции, чтобы использовать их в другом файле.
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
