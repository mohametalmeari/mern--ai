import Markdown from "react-markdown";
import { UserIcon } from "./";

export const ChatBubble = ({ text, role }) => {
  const testStyle = role === "error" ? { color: "var(--grad-end-color)" } : {};

  return (
    <li className="chat-bubble">
      <UserIcon role={role} />
      <div className="-text" style={testStyle}>
        <Markdown>{text}</Markdown>
      </div>
    </li>
  );
};
