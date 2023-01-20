import './panel.scss';

export const Panel = ({ history, resetBoard, jumpTo }) => (
  <div className="panel">
    <ul className="panel__list">
      {history.map((_, move) => (
        <li
          className="panel__history"
          key={move}
          onClick={jumpTo(move)}
        >
          {`Go to ${move === 0 
            ? 'game start'
            : `move #${move}`}`
          }
        </li>
      ))}
    </ul>

    {history.length > 1 && (
      <button
        className="panel__reset-button"
        type="button"
        onClick={resetBoard}
      >
        Reset game
      </button>)}
  </div>
);