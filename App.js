import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./src/component/Main/Main";

const App = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
