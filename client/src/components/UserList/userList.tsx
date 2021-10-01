import { Accordion, Card, Button, Badge } from "react-bootstrap";

import { User } from "../../app.types";

import { RiRadioButtonLine } from "react-icons/ri";

type Props = {
  users: User[];
};

export const UserList = ({ users }: Props) => {
  const activeUsersCount = users.filter((u) => u.online).length;

  return (
    <Accordion className="mt-4">
      <Card>
        <Card.Header>
          <Accordion.Toggle
            as={Button}
            variant="info"
            eventKey="0"
            style={{ textDecoration: "none" }}
          >
            Active users{" "}
            <Badge variant="light" className="ml-1">
              {activeUsersCount}
            </Badge>
          </Accordion.Toggle>
        </Card.Header>
        {users.map((user, id) => (
          <Accordion.Collapse eventKey="0" key={id}>
            <Card.Body>
              <RiRadioButtonLine
                className={`mb-1 ${
                  user.online ? "text-success" : "text-secondary"
                }`}
                size="0.8em"
              />{" "}
              {user.username}
            </Card.Body>
          </Accordion.Collapse>
        ))}
      </Card>
    </Accordion>
  );
};
