import { useEffect, useState } from "react";

export const DynamicTyping = ({ phrases = [] }) => {
  const [index, setIndex] = useState([0, 0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    const typeSpeed = 150;
    const deleteSpeed = 50;
    const holdTime = 1500;

    const typingInterval = setInterval(
      () => {
        const [charIndex, phraseIndex] = index;
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting && charIndex < currentPhrase.length) {
          setIndex([charIndex + 1, phraseIndex]);
        } else if (isDeleting && charIndex > 0) {
          setIndex([charIndex - 1, phraseIndex]);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), holdTime);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setIndex([0, (phraseIndex + 1) % phrases.length]);
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearInterval(typingInterval);
  }, [index, isDeleting, phrases]);

  if (phrases.length === 0) return null;

  const phrase = phrases[index[1]];

  return (
    <div className="dynamic-typing">
      <span style={{ opacity: 0 }}>.</span>
      {phrase.slice(0, index[0])}
    </div>
  );
};
