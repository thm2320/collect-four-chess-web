import styles from './GameCell.module.css'

export const GameCell = ({name, chess} : any) => {
  let chessClass = styles.chess;
  if (chess === 'O') {
    chessClass += ` ${styles.red}`
  } else if (chess === 'X') {
    chessClass += ` ${styles.yellow}`
  }
  return (
    <div className={styles.gamecell}>

      <div className={chessClass}>{name}</div>
    </div>
  );
}