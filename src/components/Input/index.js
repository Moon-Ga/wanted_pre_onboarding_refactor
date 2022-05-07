import { useRef, useState } from 'react';
import styles from './Input.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Input({ inputEmail, setInputEmail, inputPassword, setInputPassword }) {
  const [isValid, setIsValid] = useState({ Email: false, Password: false });
  const [invalidAlert, setInvalidAlert] = useState({
    Email: false,
    Password: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordRef = useRef();

  const onInputChange = (e) => {
    const { value, id } = e.target;
    if (id === 'email') {
      setInputEmail(value);
    } else {
      setInputPassword(value);
    }
    setIsValid({ ...isValid, [id]: e.target.validity.valid });
  };

  const onInputBlur = (e) => {
    const { id } = e.target;
    if (isValid[id]) {
      setInvalidAlert({ ...invalidAlert, [id]: false });
    } else {
      setInvalidAlert({ ...invalidAlert, [id]: true });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.email}>
        <input
          required
          id="email"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Type your Email."
          placeholder="name@example.com"
          className={`${styles.emailInput} ${
            isValid.email ? styles.emailValid : ''
          } ${invalidAlert.email ? styles.emailAlert : ''}`}
          onChange={onInputChange}
          onBlur={onInputBlur}
        />
        <span
          className={`material-icons ${styles.emailIcon} ${
            isValid.email ? styles.iconValid : ''
          }`}
        >
          check_circle
        </span>
      </div>
      {invalidAlert.email && (
        <span className={styles.emailAlertMessage}>Invalid Email Type</span>
      )}
      <div className={styles.password}>
        <input
          required
          id="password"
          ref={passwordRef}
          type={passwordVisible ? 'text' : 'password'}
          minLength={6}
          title="Type your password."
          placeholder="Password"
          onChange={onInputChange}
          onBlur={onInputBlur}
          className={`${styles.passwordInput} ${
            isValid.password ? styles.passwordValid : ''
          } ${invalidAlert.password ? styles.passwordAlert : ''}`}
        />
        <span
          role="button"
          tabIndex={0}
          onClick={togglePasswordVisibility}
          className={`material-icons ${styles.passwordIcon} ${
            passwordVisible ? styles.iconVisible : ''
          }`}
        >
          {passwordVisible ? 'visibility' : 'visibility_off'}
        </span>
        {invalidAlert.password && (
          <span className={styles.passwordAlertMessage}>
            Password is too short
          </span>
        )}
      </div>
    </div>
  );
}
export default Input;
