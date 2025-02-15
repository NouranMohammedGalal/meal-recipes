import { createRoot } from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.js";
import "../src/styles/index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
