export type Message = {
  messageId: string;
  userId: string;
  senderName: string;
  messageText: string;
  createdAt: string;
  currentUser?: boolean;
};

export type User = { username: string; online: boolean };
