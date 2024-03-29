import "./Landing.scss";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  let navigate = useNavigate();

  const [value, setValue] = useState("");

  const { speak, speaking, cancel } = useSpeechSynthesis();

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      console.log(result);
      setValue(result);
    },
  });

  useEffect(() => {
    switch (value) {
      case "1":
      case "give assessment":
        navigate("/assessment");
        stop();
        break;
      case "scan document":
        navigate("/ocr");
        stop();
        break;
      case "stop":
        stop();
        break;
      default:
        break;
    }
  }, [value]);

  const initListening = async () => {
    await speak({
      text: "Welcome to Beyond Braille, we are listening to you",
    });

    listen({ interimResults: true });
  };

  return (
    <div className="Landing">
      <div className="Landing-container">
        <div className="left-container">
          <h1>Beyond Braille</h1>
          <h4>
            One stop solution to facilitate effortless learning for our sight
            impaired students. Enhancing a number of cognitive skills, Our
            technology includes teaching through unifying experiences.
          </h4>
          <button
            onClick={() => {
              initListening();
            }}
            className="Landing-button"
          >
            Give Command
          </button>
          <h6>like "give assessment"</h6>
        </div>
        <div className="right-container">
          <img
            className="landing-img"
            src={require("../assets/landing.png")}
            alt="landing"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
