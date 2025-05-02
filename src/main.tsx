import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { DarkModeProvider } from "./DarkModeContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<HashRouter>
		<DarkModeProvider>
			<App />
		</DarkModeProvider>
	</HashRouter>
);
