import styles from './GameCell.module.css'

export const GameCell = ({name} : any) => {
  return (
    <div className={styles.gamecell}>
      <div className={styles.chess}>{name}</div>
    </div>
  );
}