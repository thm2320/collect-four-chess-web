import { GameCell } from "./GameCell";
import styles from './GameBoard.module.css'
import { useState } from "react";

export const GameBoard = () => {
  const [board, setBoard] = useState(Array.from({ length: 7 }, v => Array.from({ length: 6 }, v => null)));
    
  return (
    <div className={styles.gameboard}>
      {board.map((column, colIndex)=>{
        const columnDisplays = column.map((chess, i)=> {
          return <GameCell key={i} name={`${colIndex} ${i}`}/>;
        })
        return <div key={colIndex} className={styles.boardcolumn}>{columnDisplays}</div>;
      })}
    </div>
  );
}