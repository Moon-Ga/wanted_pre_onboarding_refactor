import styles from './Toggle.module.scss';

function Toggle({ usage, isToggled, setIsToggled, label, disabled = false }) {
  const changeToggle = (e) => setIsToggled(e.target.checked);

  return (
    <>
      <label htmlFor={usage} className={styles.label}>
        <div className={`${styles.thumb} ${isToggled ? styles.toggled : ''}`} />
        <span className={`${styles.tag} ${isToggled ? styles.bold : ''}`}>
          {label && label[0]}
        </span>
        <span className={`${styles.tag} ${isToggled ? '' : styles.bold}`}>
          {label && label[1]}
        </span>
      </label>
      <input
        id={usage}
        checked={isToggled}
        onChange={changeToggle}
        type="checkbox"
        disabled={disabled}
        className={styles.input}
      />
    </>
  );
}
export default Toggle;
