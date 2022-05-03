const Toggle = ({
  usage,
  isToggled,
  setIsToggled,
  label,
  disabled = false,
}) => {
  const changeToggle = (e) => setIsToggled(e.target.checked);

  return (
    <>
      <label
        htmlFor={usage}
        className="relative flex justify-around items-center w-[400px] h-[50px] rounded-full bg-gray-300 cursor-pointer"
      >
        <div
          className={`absolute ${
            isToggled ? "left-1/2" : "left-0"
          } w-1/2 h-full bg-white rounded-full border-gray-300 border-2 transition-all`}
        />
        <span
          className={`z-10 ${
            isToggled ? "text-gray-400" : "text-lg font-bold"
          } select-none`}
        >
          {label && label[0]}
        </span>
        <span
          className={`z-10 ${
            isToggled ? "text-lg font-bold" : "text-gray-400"
          } select-none`}
        >
          {label && label[1]}
        </span>
      </label>
      <input
        id={usage}
        checked={isToggled}
        onChange={changeToggle}
        type="checkbox"
        disabled={disabled}
        className="hidden"
      />
    </>
  );
};

export default Toggle;
