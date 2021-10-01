// @ts-nocheck

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Form, Button } from "react-bootstrap";

export function Home() {
  const [userName, setUserName] = useLocalStorage("userName", "John");
  const [roomId, setRoomId] = useState<string>("free");
  const linkRef = useRef(null).current;

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);
  const handleChangeRoom = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRoomId(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    linkRef.click();
  };

  const trimmed = userName.trim();
  return (
    <Form
      className="mt-5"
      style={{ maxWidth: "320px", margin: "0 auto" }}
      onSubmit={handleSubmit}
    >
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control value={userName} onChange={handleChangeName} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Room:</Form.Label>
        <Form.Control as="select" value={roomId} onChange={handleChangeRoom}>
          <option value="free">Free</option>
          <option value="job" disabled>
            Job
          </option>
        </Form.Control>
      </Form.Group>
      {trimmed && (
        <Button variant="success" as={Link} to={`/${roomId}`} ref={linkRef}>
          Chat
        </Button>
      )}
    </Form>
  );
}
