import { useRef, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Message } from "../../app.types";
import { MessageListItem } from "./messageListItem";

const listStyles = {
  height: "80vh",
  border: "1px solid rgba(0,0,0,.4)",
  borderRadius: "4px",
  overflow: "auto",
};

type Props = {
  messages: Message[];
  removeMessage: (id: string) => void;
};

export const MessageList = ({ messages, removeMessage }: Props) => {
  const messagesEndRef = useRef(null).current;

  useEffect(() => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <>
      <ListGroup variant="flush" style={listStyles}>
        {messages.map((msg) => (
          <MessageListItem
            key={msg.messageId}
            msg={msg}
            removeMessage={removeMessage}
          />
        ))}
        <span ref={messagesEndRef}></span>
      </ListGroup>
    </>
  );
};
