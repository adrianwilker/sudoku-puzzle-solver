class SudokuSolver {

  validate(puzzleString) {
    const regex = /^[1-9|.]+/;
    if(puzzleString.length!=81)
      return 'Expected puzzle to be 81 characters long';
    if(![...puzzleString].every(char => regex.test(char)))
      return 'Invalid characters in puzzle'
    return this.solve(puzzleString)
  }

  stringToGrid(puzzleString) {
    let puzzleGrid = []
    let k = 0
    for(let i=0; i<9; i++) {
      let line = []
      for(let j=0; j<9; j++) {
        line.push(puzzleString[k])
        k++
      }
      puzzleGrid.push(line)
    }
    return puzzleGrid
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let puzzleGrid = puzzleString
    if(typeof puzzleString === 'string')
      puzzleGrid = this.stringToGrid(puzzleString)
    let rowToNum = row.charCodeAt(0) - 65

    if(puzzleGrid[rowToNum].includes(value) && (puzzleGrid[rowToNum].indexOf(value) != column-1))
      return false
    return true
  }

  checkColPlacement(puzzleString, row, column, value) {
    let puzzleGrid = puzzleString
    if(typeof puzzleString === 'string')
      puzzleGrid = this.stringToGrid(puzzleString)
    let rowToNum = row.charCodeAt(0) - 65 
    for(let i=0; i<9; i++) {
      if(puzzleGrid[i][column-1] == value && rowToNum!=i)
        return false
    }
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let puzzleGrid = puzzleString
    if(typeof puzzleString === 'string')
      puzzleGrid = this.stringToGrid(puzzleString)
    let rowToNum = row.charCodeAt(0) - 65
    column -= 1
    const startRow = Math.floor(rowToNum / 3) * 3;
    const startColumn = Math.floor(column / 3) * 3;

    for(let i=startRow; i<=startRow+2; i++) {
      for(let j=startColumn; j<=startColumn+2; j++) {
        if(puzzleGrid[i][j] == value && puzzleGrid[rowToNum][column] != value)
          return false
      }
    }
    return true
  }

  checkString(puzzleGrid) {
    for(let row=0; row<9; row++) {
      for(let col=0; col<9; col++) {
        if(puzzleGrid[row][col] != '.') {
          let rowIsValid = this.checkRowPlacement(puzzleGrid, String.fromCharCode(row + 65), col+1, puzzleGrid[row][col].toString())
          let columnIsValid = this.checkColPlacement(puzzleGrid, String.fromCharCode(row + 65), col+1, puzzleGrid[row][col].toString())
          let regionIsValid = this.checkRegionPlacement(puzzleGrid, String.fromCharCode(row + 65), col+1, puzzleGrid[row][col].toString())
          if(!rowIsValid || !columnIsValid || !regionIsValid)
            return false
        }
      }
    }
    return true
  }

  solve(puzzleString) {
    const puzzleGrid = this.stringToGrid(puzzleString);
    if(!this.checkString(puzzleGrid))
      return 'Puzzle cannot be solved'
    let result = this.solver(puzzleGrid)
    if(!result)
      return 'Puzzle cannot be solved'
    return puzzleGrid.flat().join('')
  }

  solver(puzzleGrid) {
    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        if(puzzleGrid[row][col] === '.') {
          for(let value = 1; value <= 9; value++) {
            let rowIsValid = this.checkRowPlacement(puzzleGrid, String.fromCharCode(row + 65), col+1, value.toString())
            let columnIsValid = this.checkColPlacement(puzzleGrid, String.fromCharCode(row + 65), col+1, value.toString())
            let regionIsValid = this.checkRegionPlacement(puzzleGrid, String.fromCharCode(row + 65), col+1, value.toString())

            if(rowIsValid && columnIsValid && regionIsValid) {
              puzzleGrid[row][col] = value.toString();

              if(this.solver(puzzleGrid))
                return puzzleGrid;
            }
          }
          puzzleGrid[row][col] = '.';
          return false;
        }
      }
    }
    return puzzleGrid;
  }
}

module.exports = SudokuSolver;

