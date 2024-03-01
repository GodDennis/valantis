import ReactDOM from "react-dom/client";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { Router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <Router />
    </Provider>
    // </React.StrictMode>
);
