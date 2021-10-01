import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./components/Home/home";
// import { ChatRoom } from './components/ChatRoom'

const routes = [
  { path: "/", name: "Home", Component: Home },
  // { path: "/:roomId", name: "ChatRoom", Component: ChatRoom },
];
export const App = () => (
  <Router>
    <Container style={{ maxWidth: "512px" }}>
      <h1 className="mt-2 text-center">React Chat App</h1>
      <Switch>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} exact>
            <Component />
          </Route>
        ))}
      </Switch>
    </Container>
  </Router>
);
