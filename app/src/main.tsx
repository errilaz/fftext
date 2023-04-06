import React from "react"
import ReactDOM from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import App from "./App"
import "./index.css"

const root = document.getElementById("root") as HTMLElement
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        defaultRadius: "xs",
        primaryColor: "green",
        components: {
          Button: {
            defaultProps: {
              size: "xs",
              color: "gray",
              variant: "default",
            },
          },
          SegmentedControl: {
            defaultProps: {
              size: "xs",
            }
          },
          Text: {
            defaultProps: {
              size: "xs",
            },
          },
          Stack: {
            defaultProps: {
              justify: "flex-start",
              spacing: "2px",
            },
          },
          NumberInput: {
            defaultProps: {
              size: "xs",
            },
          },
          Select: {
            defaultProps: {
              size: "xs",
            },
          },
        },
      }}
    >
      <Notifications
        autoClose={3000}
        position="top-right"
      />
      <App />
    </MantineProvider>
  </React.StrictMode>
)
