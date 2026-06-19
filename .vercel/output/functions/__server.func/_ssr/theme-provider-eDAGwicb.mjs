import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-provider-eDAGwicb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/Himanshi/OneDrive/Desktop/work-credential-hub/src/components/theme-provider.tsx";
var ThemeCtx = (0, import_react.createContext)({
	theme: "light",
	toggle: () => {}
});
function ThemeProvider({ children }) {
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.remove("dark");
		if (typeof window !== "undefined") localStorage.setItem("theme", "light");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeCtx.Provider, {
		value: {
			theme: "light",
			toggle: () => {}
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 5
	}, this);
}
var useTheme = () => (0, import_react.useContext)(ThemeCtx);
//#endregion
export { useTheme as n, ThemeProvider as t };
