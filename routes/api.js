'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.puzzle || !req.body.coordinate || !req.body.value)
        res.json({ error: 'Required field(s) missing' })
      
      let puzzleString = req.body.puzzle;
      let value = req.body.value;
      let row = req.body.coordinate.slice(0, 1).toUpperCase();
      let column = req.body.coordinate.slice(1);
      const regex = /^[1-9|.]+/;

      if(![...puzzleString].every(char => regex.test(char)))
        res.json({ error: 'Invalid characters in puzzle' })

      else if(puzzleString.length!=81)
        res.json({ error: 'Expected puzzle to be 81 characters long' })
        
      if(isNaN(value) || value < 1 || value > 9)
        res.json({ error: 'Invalid value' })
      
      if(!/^[A-I]$/.test(row) || !/^[1-9]$/.test(column)) {
        res.json({ error: 'Invalid coordinate' })
      } else {
        let rowIsValid = solver.checkRowPlacement(puzzleString, row, column, value)
        let columnIsValid = solver.checkColPlacement(puzzleString, row, column, value)
        let regionIsValid = solver.checkRegionPlacement(puzzleString, row, column, value)
        if(rowIsValid && columnIsValid && regionIsValid) {
          res.json({ valid: true })
        } else {
          let invalid = []
          if(!rowIsValid) invalid.push('row')
          if(!columnIsValid) invalid.push('column')
          if(!regionIsValid) invalid.push('region')
          res.json({
            valid: false,
            conflict: invalid
          })
        }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      
      if(!puzzle) {
        res.send({ error: 'Required field missing' });
      } else {
        let result = solver.validate(puzzle);
        
        if(result.length < 81)
          res.send({ error: result });
        else
          res.send({ solution: result });
      }
    });
};
