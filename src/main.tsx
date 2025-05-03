import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { DarkModeProvider } from "./DarkModeContext";
import { AuthProvider } from "./AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<HashRouter>
		<DarkModeProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</DarkModeProvider>
	</HashRouter>
);
