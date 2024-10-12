import Markdown from "react-markdown";
import { UserIcon } from "./";

export const ChatBubble = ({ text, role }) => {
  return (
    <li className="chat-bubble">
      <UserIcon role={role} />
      <div className="-text">
        <Markdown>{text}</Markdown>
      </div>
    </li>
  );
};
