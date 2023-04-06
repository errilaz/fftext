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
            const path = decodeURIComponent(match[1])
            readFile(path).then(buffer => {
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
