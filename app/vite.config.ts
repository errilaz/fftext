import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { readFile } from "fs/promises"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-file-proxy",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const match = /^\/local\-file(\/[^?]*)/.exec(req.url!)
          if (match) {
            readFile(match[1]).then(buffer => {
              res.write(buffer)
              res.end()
            })
          }
          else {
            next()
          }
        })
      },
    }
  ],
})
