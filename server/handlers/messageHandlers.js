import { nanoid } from "nanoid";
import { Low, JSONFile } from "lowdb";

const adapter = new JSONFile("db/messages.json");
const db = new Low(adapter);

await db.read();

db.data = {
  messages: [
    {
      messageId: "1",
      userId: "1",
      senderName: "Max",
      messageText: "Wassup, man?",
      createdAt: "2021-10-01",
    },
    {
      messageId: "2",
      userId: "2",
      senderName: "Lebron",
      messageText: "Good, fam! You?",
      createdAt: "2021-10-02",
    },
  ],
};

await db.write();

export default (io, socket) => {
  const getMessages = () => {
    const messages = db.get("messages").value();
    io.in(socket.roomId).emit("messages", messages);
  };

  const addMessage = (message) => {
    db.get("messages")
      .push({
        messageId: nanoid(8),
        createdAt: newDate(),
        ...message,
      })
      .write();

    getMessages();
  };

  const removeMessage = (messageId) => {
    db.get("messages").remove({ messageId }).write();
    getMessages();
  };

  socket.on("message:get", getMessages);
  socket.on("message:add", addMessage);
  socket.on("message:remove", removeMessage);
};
