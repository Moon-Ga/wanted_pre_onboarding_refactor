import { useRef, useState } from "react";

const Input = ({
  inputEmail,
  setInputEmail,
  inputPassword,
  setInputPassword,
}) => {
  const [isValid, setIsValid] = useState({ Email: false, Password: false });
  const [invalidAlert, setInvalidAlert] = useState({
    Email: false,
    Password: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordRef = useRef();

  const onInputChange = (e) => {
    const { value, type } = e.target;
    if (type === "email") {
      setInputEmail(value);
    } else {
      setInputPassword(value);
    }
    setIsValid({ ...isValid, [type]: e.target.validity.valid });
  };

  const onInputBlur = (e) => {
    const { type } = e.target;
    if (isValid[type]) {
      setInvalidAlert({ ...invalidAlert, [type]: false });
    } else {
      setInvalidAlert({ ...invalidAlert, [type]: true });
    }
  };

  const togglePasswordVisibility = () => {
    if (passwordVisible) {
      passwordRef.current.type = "password";
      setPasswordVisible(false);
    } else {
      passwordRef.current.type = "text";
      setPasswordVisible(true);
    }
  };

  return (
    <div className="flex flex-col w-[300px] after:ml-0.5 after:text-red-500">
      <div className={`relative before:content-['Email'] before:text-xs`}>
        <input
          required
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Type your Email."
          placeholder="name@example.com"
          className={`w-full pl-2 pr-8 border-2 leading-loose placeholder:italic ${
            isValid.email ? "border-cyan-500" : ""
          } ${invalidAlert.email ? "border-red-500" : ""}`}
          onChange={onInputChange}
          onBlur={onInputBlur}
        />
        <span
          className={`material-icons absolute right-1 translate-y-1/4 ${
            isValid.email ? "text-cyan-500" : "text-gray-300"
          }`}
        >
          check_circle
        </span>
      </div>
      {invalidAlert.email && (
        <span className="text-xs text-red-500">Invalid Email Type</span>
      )}
      <div className="relative mt-2 before:content-['Password'] before:text-xs">
        <input
          required
          ref={passwordRef}
          type="password"
          minLength={6}
          title="Type your password."
          placeholder="Password"
          onChange={onInputChange}
          onBlur={onInputBlur}
          className={`w-full pl-2 pr-8 border-2 leading-loose placeholder:italic ${
            isValid.password ? "border-cyan-500" : ""
          } ${invalidAlert.password ? "border-red-500" : ""}`}
        />
        <span
          onClick={togglePasswordVisibility}
          className={`material-icons absolute right-1 translate-y-1/4 ${
            passwordVisible ? "text-cyan-500" : "text-gray-300"
          } cursor-pointer`}
        >
          {passwordVisible ? "visibility" : "visibility_off"}
        </span>
        {invalidAlert.password && (
          <span className="text-xs text-red-500">Password is too short</span>
        )}
      </div>
    </div>
  );
};

export default Input;
