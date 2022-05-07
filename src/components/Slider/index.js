import { useEffect, useState } from 'react';
import styles from './Slider.module.scss';

function Slider({
  value,
  setValue,
  min = 0,
  max = 100,
  step = 1,
  buttonCount = 5,
}) {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    setValue(min);
  }, [min, setValue]);

  useEffect(() => {
    const buttonsArray = [min];
    for (let i = 1; i < buttonCount; i += 1) {
      buttonsArray.push(((max - min) / (buttonCount - 1)) * i + min);
    }
    setButtons(buttonsArray);
  }, [buttonCount, max, min]);

  const ratio = (100 / (max - min)) * (value - min);

  const sliderBackground = `linear-gradient(to right,rgb(6 182 212) ${ratio}%, rgb(209 213 219) ${ratio}%)`;
  const buttonBackground = (idx) => {
    if (ratio >= (100 / (buttonCount - 1)) * idx) {
      return 'rgb(6 182 212)';
    }
    return '';
  };

  const changeValue = (e) => {
    let targetValue;
    if (e.target.type === 'range') {
      targetValue = e.target.value;
    } else {
      targetValue = e.target.id;
    }
    setValue(targetValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.value}>{value}</div>
      <div className={styles.sliderContainer}>
        <input
          min={min}
          max={max}
          step={step}
          value={value}
          type="range"
          onChange={changeValue}
          className={styles.input}
          style={{ backgroundImage: sliderBackground }}
        />
        {buttons.map((_, idx) => {
          const key = `slider-button-${idx}`;

          return (
            <span
              key={key}
              className={styles.buttons}
              style={{
                left: `${(100 / (buttonCount - 1)) * idx}%`,
                backgroundColor: buttonBackground(idx),
              }}
            />
          );
        })}
      </div>
      <div className={styles.sliderButtons}>
        {buttons.map((button, idx) => {
          const key = `slider-button-key-${idx}`;

          return (
            <div
              id={button}
              key={key}
              role="button"
              tabIndex="-1"
              onClick={changeValue}
              className={styles.button}
            >
              {button}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Slider;
