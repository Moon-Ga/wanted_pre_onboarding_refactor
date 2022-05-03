import { useCallback, useEffect, useRef, useState } from "react";

const Dropdown = ({
  selected,
  setSelected,
  list,
  placeholder = "Select an Item",
  direction = "down",
}) => {
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
    setShowDropdown(!showDropdown);
    setdropdownList(list);
  };

  const selectValue = (e) => {
    setSelected(e.target.innerText);
    toggleDropdownList();
  };

  const resetSearch = () => {
    searchInputRef.current.value = "";
    searchInputRef.current.focus();
    setdropdownList(list);
  };

  const outerClick = useCallback((e) => {
    if (!containerRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", outerClick);
    } else {
      document.removeEventListener("click", outerClick);
    }
  }, [showDropdown, outerClick]);

  return (
    <div ref={containerRef} className="relative flex flex-col w-[300px]">
      <div onClick={toggleDropdownList} className="relative">
        <input
          readOnly
          placeholder={placeholder}
          value={selected}
          className={`border-2 w-full pl-2 ${
            showDropdown ? "border-cyan-500" : ""
          } cursor-pointer focus:outline-none`}
        />
        <span
          className={`material-icons h-full border-2 absolute right-0 ${
            showDropdown ? "border-cyan-500" : ""
          } cursor-pointer`}
        >
          {direction === "up"
            ? showDropdown
              ? "expand_more"
              : "expand_less"
            : showDropdown
            ? "expand_less"
            : "expand_more"}
        </span>
      </div>
      {showDropdown && (
        <div
          className={`absolute ${
            direction === "up" ? "-top-8" : "top-8"
          } w-full z-10`}
        >
          <input
            ref={searchInputRef}
            autoFocus
            type="text"
            placeholder="Search Country"
            className="border-2 pl-7 w-full focus:outline-none"
            onChange={filterList}
          />
          <span className="material-icons absolute top-[4px] left-1 text-[20px] text-gray-300">
            search
          </span>
          <span
            onClick={resetSearch}
            className="material-icons absolute top-[4px] right-1 text-[20px] text-gray-300 cursor-pointer"
          >
            cancel
          </span>
          <ul
            className={`${
              direction === "up" ? "absolute w-full -top-[150px]" : ""
            } h-[150px] overflow-auto border-2 bg-gray-50`}
          >
            {dropdownList.map((item, idx) => (
              <li
                key={idx}
                onClick={selectValue}
                className="pl-7 cursor-pointer hover:bg-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
