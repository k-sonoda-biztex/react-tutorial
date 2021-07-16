import React from "react";
import logo from "./logo.svg";
import "./App.css";

type SquareValue = "X" | "O" | null;
type SquareProps = { value: SquareValue; onClick: () => unknown };
const Square: React.VFC<SquareProps> = (props) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

type BoardValue = Array<SquareValue>;
type SquareIndex = number;
type BoardProps = { squares: BoardValue; onClick: (i: SquareIndex) => unknown };
const Board: React.VFC<BoardProps> = (props) => (
  <div>
    {[0, 3, 6].map((i) => (
      <div key={i} className="board-row">
        {[0, 1, 2].map((j) => (
          <Square
            key={[i, j].join()}
            value={props.squares[i + j]}
            onClick={() => props.onClick(i + j)}
          />
        ))}
      </div>
    ))}
  </div>
);

type GameStep = number;
type Props = {};
class App extends React.Component<
  Props,
  {
    history: Array<{ squares: BoardValue }>;
    /** indicate which step we’re currently viewing */
    stepNumber: GameStep;
    /** which player goes next */
    xIsNext: boolean;
  }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i: SquareIndex) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    const status =
      winner !== null
        ? "Winner: " + winner
        : "Next player: " + (this.state.xIsNext ? "X" : "O");
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  jumpTo(step: GameStep): void {
    this.setState({
      stepNumber: step,
      // state starts with xIsNext is true
      xIsNext: step % 2 === 0,
    });
  }
}

/** check for a winner */
function calculateWinner(squares: Array<SquareValue>): SquareValue {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
