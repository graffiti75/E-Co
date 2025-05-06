import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./auth/AuthContext";
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
