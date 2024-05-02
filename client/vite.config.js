import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
    plugins: [react(), reactRefresh()],
    server: {
        host: true,
    },
});
