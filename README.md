# Sudoku Solver

<p>This project was developed in the <a href="https://www.freecodecamp.org/learn/quality-assurance" target="_blank">freeCodeCamp's Quality Assurance course</a>.</p>

<p>In the development of this project I acquired or perfected some knowledge, such as Chai and Mocha, Chai-HTTP, APIs, Node.js, unit and functional testing, in addition to implementing the sudoku puzzle solving logic.</p>

<p>Deploy: <a href="#" target="_blank">#</a></p>

<p>On replit: <a href="https://replit.com/@adrianwilker/sudoku-solver" target="_blank">https://replit.com/@adrianwilker/sudoku-solver</a></p>

<hr>

<p>It's tests are listed below:</p>

<p>Unit tests:</p>
<ul>
  <li>Logic handles a valid puzzle string of 81 characters</li>
  <li>Logic handles a puzzle string with invalid characters (not 1-9 or <code>.</code>)</li>
  <li>Logic handles a puzzle string that is not 81 characters in length</li>
  <li>Logic handles a valid row placement</li>
  <li>Logic handles an invalid row placement</li>
  <li>Logic handles a valid column placement</li>
  <li>Logic handles an invalid column placement</li>
  <li>Logic handles a valid region (3x3 grid) placement</li>
  <li>Logic handles an invalid region (3x3 grid) placement</li>
  <li>Valid puzzle strings pass the solver</li>
  <li>Invalid puzzle strings fail the solver</li>
  <li>Solver returns the expected solution for an incomplete puzzle</li>
</ul>

<p>Functional tests:</p>
<ul>
  <li>Solve a puzzle with valid puzzle string: POST request to <code>/api/solve</code></li>
  <li>Solve a puzzle with missing puzzle string: POST request to <code>/api/solve</code></li>
  <li>Solve a puzzle with invalid characters: POST request to <code>/api/solve</code></li>
  <li>Solve a puzzle with incorrect length: POST request to <code>/api/solve</code></li>
  <li>Solve a puzzle that cannot be solved: POST request to <code>/api/solve</code></li>
  <li>Check a puzzle placement with all fields: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with single placement conflict: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with multiple placement conflicts: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with all placement conflicts: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with missing required fields: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with invalid characters: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with incorrect length: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with invalid placement coordinate: POST request to <code>/api/check</code></li>
  <li>Check a puzzle placement with invalid placement value: POST request to <code>/api/check</code></li>
</ul>