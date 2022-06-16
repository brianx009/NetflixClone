import { useRef } from "react";
import { useState } from "react";
import "./register.scss";

export default function Register() {
  /*use state in order to pass/ set an email, initial empty state */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*creating a reference for our email state */
  const emailRef = useRef();
  /*creating a reference for our password state */
  const passwordRef = useRef();

  /*when we first click our button it will set our email of the contents entered */
  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  /*the second time we press the button on our page it will be set to add a password */
  const handleFinish = () => {
    setPassword(passwordRef.current.value);
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="images/Logo.png"
            alt=""
          />
          <button className="loginButton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {/* if there is no email then display asking for email address */}
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          /*else display that we are asking for a password from the user  */
          <form className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}