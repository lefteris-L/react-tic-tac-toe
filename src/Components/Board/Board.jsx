import { getWinner } from '../../utils';
import {Configuration, OpenAIApi} from 'openai'
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
    if (winner || board[index]) return

    const newBoard = [...board]
    const prompt = `given this array that represents a tic tac toe board ${board}, what is the best move for "O"?`

    const openai = new OpenAIApi(new Configuration({
      organization: process.env.ORGANIZATION,
      apiKey: process.env.OPENAI_API_KEY
    }))

    let completion = {data: '0'}
    const getCompletion = () => {
      openai.createCompletion({
        model: "text-davinci-003",
        prompt
        }
      )
    }

    try {
      completion = getCompletion()
    } catch (e) {
      console.log(e);
    }

    newBoard[index] = 'X';
    if (completion) newBoard[(completion.data.match(/\d/g) || [])[0]] = 'O'
    
    onPlay(newBoard)
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
