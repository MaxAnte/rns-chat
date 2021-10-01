//@ts-nocheck

import { MutableRefObject, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { useLocalStorage } from "./useLocalStorage";
import { useBeforeUnload } from "./useBeforeUnload";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

import { Message, User } from "../app.types";

const SERVER_URL: string = "http://localhost:5000";

export const useChat = (roomId: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [userId] = useLocalStorage("userId", nanoid(8));
  const [userName] = useLocalStorage("userName");

  const socketRef = useRef(null).current;

  useEffect(() => {
    socketRef = io(SERVER_URL, { query: { roomId } });
    socketRef.emit("user:add", { userName, userId });
    socketRef.on("users", (users: User[]) => {
      setUsers(users);
    });
    socketRef.emit("message:get");
    socketRef.on("messages", (messages: Message[]) => {
      const newMessages = messages.map((msg) =>
        msg.userId === userId ? { ...msg, currentUser: true } : msg
      );
      setMessages(newMessages);
    });

    return () => {
      socketRef.disconnect();
    };
  }, [roo, Id, userId, userName]);

  const sendMessage = ({ messageText: string, senderName: string }) => {
    socketRef.emit("message:add", { userId, messageText, senderName });
  };

  const removeMessage = (id: string) => {
    socketRef.emit("message:remove", id);
  };

  useBeforeUnload(() => socketRef.emit("user:leave", userId));

  return { users, messages, sendMessage, removeMessage };
};
