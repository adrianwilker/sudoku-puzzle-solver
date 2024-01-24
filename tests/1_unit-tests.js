const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

const puzzles = require('../controllers/puzzle-strings.js');

suite('Unit Tests', () => {

  test('Logic handles a valid puzzle string of 81 characters', function() {
    let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    let result = '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
    assert.notInclude(solver.solve(puzzleString), 'Expected puzzle to be 81 characters long')
  })

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function() {
    let puzzleString = '..839.7.575.....964..1...+...16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
    assert.include(solver.validate(puzzleString), 'Invalid characters in puzzle')

    puzzleString = '..839.7.575..a..964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
    assert.include(solver.validate(puzzleString), 'Invalid characters in puzzle')
  })

  test('Logic handles a puzzle string that is not 81 characters in length', function() {
    let puzzleString = '...4.3.2423..6.546..7.568.67.'
    assert.include(solver.validate(puzzleString), 'Expected puzzle to be 81 characters long')

    puzzleString = '..839.7.575..a..964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1..'
    assert.include(solver.validate(puzzleString), 'Expected puzzle to be 81 characters long')
  })

  test('Logic handles a valid row placement', function() {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    let row = 'D'
    let column = '2'
    let value = '2'
    assert.isTrue(solver.checkRowPlacement(puzzleString, row, column, value))
  })

  test('Logic handles an invalid row placement', function() {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    let row = 'F'
    let column = '3'
    let value = '7'
    assert.isFalse(solver.checkRowPlacement(puzzleString, row, column, value))
  })

  test('Logic handles a valid column placement', function() {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    let row = 'D'
    let column = '2'
    let value = '6'
    assert.isTrue(solver.checkColPlacement(puzzleString, row, column, value))
  })

  test('Logic handles an invalid column placement', function() {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    let row = 'A'
    let column = '1'
    let value = '6'
    assert.isFalse(solver.checkColPlacement(puzzleString, row, column, value))
  })

  test('Logic handles a valid region (3x3 grid) placement', function() {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    let row = 'D'
    let column = '2'
    let value = '3'
    assert.isTrue(solver.checkRegionPlacement(puzzleString, row, column, value))
  })

  test('Logic handles an invalid region (3x3 grid) placement', function() {
    let puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    let row = 'A'
    let column = '1'
    let value = '2'
    assert.isFalse(solver.checkRegionPlacement(puzzleString, row, column, value))
  })

  test('Valid puzzle strings pass the solver', function() {
    for(let i=0; i<puzzles.length; i++)
      assert.notInclude(solver.solve(puzzles[i][0]), 'Puzzle cannot be solved')
  })

  test('Invalid puzzle strings fail the solver', function() {
    let puzzleStrings = [
      '..9..5.1.85.4....24322.....1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      '82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.11',
      '..839.7.575.....964..1.......16.29846.9.312.7..7544....62..5.78.8...3.2...492...1',
      '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.....6.4..8916..85.72...3',
      '1.55.2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    ]
    for(let i=0; i<puzzleStrings.length; i++)
      assert.include(solver.solve(puzzleStrings[i]), 'Puzzle cannot be solved')
  })

  test('Solver returns the expected solution for an incomplete puzzle', function() {
    for(let i=0; i<puzzles.length; i++)
      assert.equal(solver.solve(puzzleStrings[i][0]), solver.solve(puzzleStrings[i][1]))
  })
});
