import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-provider-CtLo-iYA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/auth-provider.tsx";
var AuthContext = (0, import_react.createContext)(null);
function AuthProvider({ user, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthContext.Provider, {
		value: { user },
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 12,
		columnNumber: 5
	}, this);
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}
//#endregion
export { useAuth as n, AuthProvider as t };
