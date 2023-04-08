import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./src/component/Main/Main";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
