import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeProvider } from "./DarkModeContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<BrowserRouter>
		<DarkModeProvider>
			<App />
		</DarkModeProvider>
	</BrowserRouter>
);
