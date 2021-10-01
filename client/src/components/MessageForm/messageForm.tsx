import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Picker } from "emoji-mart";

import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";

type Props = {
  userName: string;
  sendMessage: (msg: { messageText: string; senderName: string }) => void;
};

export const MessageForm = ({ userName, sendMessage }: Props) => {
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleEmojiShow = () => setShowEmoji((v) => !v);

  //@ts-ignore
  const handleEmojiSelect = (e) => setText((text) => (text += e.native));

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      sendMessage({ messageText: text, senderName: userName });
      setText("");
    }
  };

  return (
    <>
      <Form onSubmit={handleSendMessage}>
        <Form.Group className="d-flex">
          <Button variant="primary" type="button" onClick={handleEmojiShow}>
            <GrEmoji />
          </Button>
          <Form.Control
            value={text}
            onChange={handleChangeText}
            type="text"
            placeholder="Message..."
          />
          <Button variant="success" type="submit">
            <FiSend />
          </Button>
        </Form.Group>
      </Form>
      {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={20} />}
    </>
  );
};
