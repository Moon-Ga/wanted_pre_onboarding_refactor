import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.scss';

function Dropdown({
  selected,
  setSelected,
  list,
  placeholder = 'Select an Item',
  direction = 'down',
}) {
  const [dropdownList, setdropdownList] = useState(list);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef();
  const searchInputRef = useRef();

  const filterList = (e) => {
    const filteredList = list.filter(
      (item) => item.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setdropdownList(filteredList);
  };

  const toggleDropdownList = () => {
    setShowDropdown((prev) => !prev);
    setdropdownList(list);
  };

  const selectValue = (e) => {
    setSelected(e.target.id);
    toggleDropdownList();
  };

  const resetSearch = () => {
    searchInputRef.current.value = '';
    searchInputRef.current.focus();
    setdropdownList(list);
  };

  const outerClick = useCallback((e) => {
    if (!containerRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }, []);

  const dropdownArrow = () => {
    if (direction === 'up') {
      if (showDropdown) {
        return 'expand_more';
      }
      return 'expand_less';
    }

    if (showDropdown) {
      return 'expand_less';
    }
    return 'expand_more';
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener('click', outerClick);
    } else {
      document.removeEventListener('click', outerClick);
    }
  }, [showDropdown, outerClick]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        role="menu"
        tabIndex={0}
        onClick={toggleDropdownList}
        className={styles.dropdownContainer}
      >
        <input
          readOnly
          placeholder={placeholder}
          value={selected}
          className={`${styles.dropdownInput} ${
            showDropdown ? styles.dropdownOn : ''
          }`}
        />
        <span
          className={`material-icons ${styles.dropdownArrow} ${
            showDropdown ? styles.dropdownOn : ''
          }`}
        >
          {dropdownArrow()}
        </span>
      </div>
      {showDropdown && (
        <div
          className={`${direction === 'up' ? styles.upward : ''} ${
            styles.dropdownList
          }`}
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search Country"
            className={styles.search}
            onChange={filterList}
          />
          <span className={`material-icons ${styles.searchIcon}`}>search</span>
          <span
            role="button"
            tabIndex={0}
            onClick={resetSearch}
            className={`material-icons ${styles.reset}`}
          >
            cancel
          </span>
          <ul
            className={`${direction === 'up' ? styles.up : ''} ${styles.list}`}
          >
            {dropdownList.map((item, idx) => {
              const key = `dropdown-list-key-${idx}`;

              return (
                <li
                  id={item}
                  key={key}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={selectValue}
                  className={styles.item}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Dropdown;
