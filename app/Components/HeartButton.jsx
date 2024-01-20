// components/HeartButton.js
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as outlineHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const HeartButton = () => {
  const [isFilled, setFilled] = useState(false);

  const toggleHeart = () => {
    setFilled(!isFilled);
  };

  return (
    <div
      className="text-red-500 cursor-pointer transition"
      onClick={toggleHeart}
    >
      <FontAwesomeIcon icon={isFilled ? solidHeart : outlineHeart} size="xl" />
    </div>
  );
};

export default HeartButton;
