import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig(({ mode }) => {
	return {
		plugins: [tsconfigPaths()],
		server: {
			host: "0.0.0.0",
			port: 8000,
			proxy: {
				"/api": {
					target: "http://localhost:3000",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		clearScreen: false,
		build: {
			minify: "esbuild",
			sourcemap: false,
		},
		rollupOptions: {
			onwarn(warning, warn) {
				// Suppress "Module level directives cause errors when bundled" warnings
				if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
					return;
				}
				warn(warning);
			},
		},
		resolve: {
			alias: {
				"#enums": resolve("./src/enums"),
			},
		},
		esbuild: {
			pure: mode === "production" ? ["console.log"] : [],
			keepNames: true,
		},
	};
});
