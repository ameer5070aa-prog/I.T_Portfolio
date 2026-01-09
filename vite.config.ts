import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    // Custom plugin to serve /admin/ as static HTML
    {
      name: 'serve-admin-static',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin' || req.url === '/admin/') {
            // Serve the admin index.html directly
            const adminHtml = fs.readFileSync(path.resolve(__dirname, 'public/admin/index.html'), 'utf-8');
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(adminHtml);
            return;
          }
          next();
        });
      },
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
