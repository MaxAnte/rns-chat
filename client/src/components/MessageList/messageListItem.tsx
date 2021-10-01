import TimeAgo from "react-timeago";
import { ListGroup, Card, Button } from "react-bootstrap";

import { Message } from "../../app.types";

import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  msg: Message;
  removeMessage: (id: string) => void;
};

export const MessageListItem = ({ msg, removeMessage }: Props) => {
  const { messageId, messageText, senderName, createdAt, currentUser } = msg;

  const handleRemoveMessage = (id: string) => removeMessage(id);

  return (
    <ListGroup.Item
      className={`d-flex ${currentUser ? "justify-content-end" : ""}`}
    >
      <Card
        bg={`${currentUser ? "primary" : "secondary"}`}
        text="light"
        style={{ width: "55%" }}
      >
        <Card.Header className="d-flex justify-content-between align-items-center">
          {/* @ts-ignore */}
          <Card.Text as={TimeAgo} date={createdAt} className="small" />
          <Card.Text>{senderName}</Card.Text>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <Card.Text>{messageText}</Card.Text>
          {currentUser && (
            <Button
              variant="none"
              className="text-warning"
              onClick={() => handleRemoveMessage(messageId)}
            >
              <AiOutlineDelete />
            </Button>
          )}
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};
