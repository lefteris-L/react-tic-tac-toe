import { getWinner } from '../../utils';
import axios from 'axios';
import './board.scss';

const green = '#38c976';
const grey = '#333a4a';

export const Board = ({ board, onPlay }) => {
  const [winner, positions] = getWinner(board);
  // const player = board.filter(square => square)
  //   .length % 2 ? 'O' : 'X';

  const getStyles = (index) => ({
    color: positions?.includes(index)
      ? green
      : grey,
  });

  const handleClick = async (index) => {
    if (winner || board[index]) {
      return;
    };

    const newBoard = [...board];
    newBoard[index] = 'X';

    axios.post('https://api.openai.com/v1/chat/completions', {
      params: `given this board ${board}, what is the best move for "O"?`
    }).then(res => newBoard[res.match(/\d/g)[0]] = 'O')

    onPlay(newBoard);
  }

  return (
    <div className="board">
      {board.map((player, i) => (
        <button
          key={i}
          type="button"
          className="board__square"
          style={getStyles(i)}
          onClick={() => {
            handleClick(i);
          }}
        >
          {player}
        </button>
      ))}
    </div>
  );
};
