import { useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import Input from "./components/Input";
import Slider from "./components/Slider";
import Tab from "./components/Tab";
import Toggle from "./components/Toggle";
import { countryList, kboTeamList } from "./data/DropdownData";

function App() {
  const [firstToggle, setFirstToggle] = useState(false);
  const [secondToggle, setSecondToggle] = useState(false);

  const [firstSlider, setFirstSlider] = useState(0);
  const [secondSlider, setSecondSlider] = useState(0);

  const [firstDropdown, setFirstDropdown] = useState("");
  const [secondDropdown, setSecondDropdown] = useState("");

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const componentsArray = [
    <>
      <Toggle
        usage="description"
        isToggled={firstToggle}
        setIsToggled={setFirstToggle}
        label={["기본", "상세"]}
      />
      <Toggle
        usage="disabled"
        isToggled={secondToggle}
        setIsToggled={setSecondToggle}
        label={["It's", "Disabled"]}
        disabled={true}
      />
    </>,
    <>
      <Tab />
      <Tab tabs={["전체", "한식", "중식", "양식", "일식", "분식"]} />
    </>,
    <>
      <Slider value={firstSlider} setValue={setFirstSlider} />
      <Slider
        value={secondSlider}
        setValue={setSecondSlider}
        min={1}
        max={5}
        step={0.1}
        buttonCount={5}
      />
    </>,
    <>
      <Dropdown
        selected={firstDropdown}
        setSelected={setFirstDropdown}
        list={countryList}
        placeholder="Select Your Country"
      />
      <Dropdown
        selected={secondDropdown}
        setSelected={setSecondDropdown}
        list={kboTeamList}
        placeholder="Select Your Team"
        direction="up"
      />
    </>,
    <Input
      inputEmail={inputEmail}
      setInputEmail={setInputEmail}
      inputPassword={inputPassword}
      setInputPassword={setInputPassword}
    />,
  ];

  return (
    <div>
      {componentsArray.map((components, idx) => (
        <div
          key={idx}
          className="min-w-[1024px] w-full min-h-[200px] h-[20vh] flex justify-center items-center border-2"
        >
          <div className="grid grid-flow-col gap-14">{components}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
