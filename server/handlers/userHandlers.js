const users = {
  1: { username: "Max", online: false },
  2: { username: "Lebron", online: false },
};

export default (io, socket) => {
  const getUsers = () => {
    io.in(socket.roomId).emit("users", users);
  };

  const addUser = ({ username, userId }) => {
    if (!users[userId]) {
      users[userId] = { username, online: true };
    } else {
      users[userId].online = true;
    }
    getUsers();
  };

  const removeUser = (userId) => {
    users[userId].online = false;
    getUsers();
  };

  socket.on("user:get", getUsers);
  socket.on("user:add", addUsers);
  socket.on("user:leave", removeUsers);
};
