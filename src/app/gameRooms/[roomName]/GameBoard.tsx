import { GameCell } from './GameCell';
import styles from './GameBoard.module.css';
import { useCallback, useEffect, useState, useContext } from 'react';
import { SocketContext } from '@/app/SocketProvider';

export const GameBoard = () => {
  const socket = useContext(SocketContext);
  const [board, setBoard] = useState<Array<Array<string | null>>>(
    Array.from({ length: 7 }, (v) => Array.from({ length: 6 }, (v) => null))
  );
  const [player, setPlayer] = useState<string | undefined>();
  const [gameoverMessage, setGameoverMessage] = useState<string | undefined>();

  const updateBoard = (step: number, chessToPut: string) => {
    setBoard((preBoard) => {
      let newBoard = [...preBoard];
      newBoard = newBoard.map((column, colIndex) => {
        if (colIndex === step) {
          const newCol = [...column];
          const index = newCol.findIndex((chess) => chess === null);
          if (index > -1) {
            newCol[index] = chessToPut;
          }
          return newCol;
        }
        return column;
      });
      console.log(newBoard);
      return newBoard;
    });
  };

  const updateListener = useCallback(
    (args: any) => {
      updateBoard(args.step, args.player === player ? 'O' : 'X');
      if (args.isFinished) {
        setGameoverMessage(args.player === player ? 'You Win' : 'You Lose');
      }
    },
    [player]
  );

  useEffect(() => {
    if (socket) {
      setPlayer(socket.id);
      // socket.on('connect', () => {
      //   console.log('connected to server');
      //   setPlayer(socket?.id);
      // });

      socket.on('message', (args) => {
        console.log(args);
      });
    }
    return () => {
      console.log('removing');
    };
  }, [socket]);

  useEffect(() => {
    if (player) {
      socket?.on('update_move', updateListener);
    }
    return () => {
      socket?.off('update_move', updateListener);
    };
  }, [player, updateListener]);

  const columnClickHandler = (idx: number) => {
    if (socket) {
      socket.emit('move', idx);
    }
  };
  return (
    <>
      <h2>{player}</h2>
      <div className={styles.gameboard}>
        {board.map((column, colIndex) => {
          const columnDisplays = column.map((chess, i) => {
            return <GameCell key={i} chess={chess} />;
          });
          return (
            <div
              key={colIndex}
              className={styles.boardcolumn}
              onClick={() => columnClickHandler(colIndex)}
            >
              {columnDisplays}
            </div>
          );
        })}
      </div>
      {gameoverMessage ? <p>{gameoverMessage}</p> : undefined}
    </>
  );
};
