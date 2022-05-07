import { useRef, useState } from 'react';
import styles from './Tab.module.scss';

function Tab({ tabs = [1, 2, 3] }) {
  const [selected, setSelected] = useState(0);

  const sliderRef = useRef();

  const tabWidth = `${100 / tabs.length}%`;

  const switchTab = (idx) => {
    const tab = (100 / tabs.length) * idx;
    const left = `${tab}%`;
    sliderRef.current.style.left = left;
    setSelected(idx);
  };

  const tabWidthStyle = () => {
    if (tabs.length < 4) {
      return { width: '130px' };
    }
    if (tabs.length < 6) {
      return { width: '110px' };
    }
    if (tabs.length < 8) {
      return { width: '90px' };
    }
    return { width: '70px' };
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab, idx) => {
          const key = `tab-key-${idx}`;

          return (
            <div
              key={key}
              role="tab"
              tabIndex={0}
              onClick={() => switchTab(idx)}
              className={`${
                selected === idx ? styles.active : styles.inactive
              } ${styles.tab}`}
              style={tabWidthStyle()}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className={styles.sliderContainer}>
        <div
          ref={sliderRef}
          style={{ width: tabWidth }}
          className={styles.slider}
        />
      </div>
    </div>
  );
}
export default Tab;
