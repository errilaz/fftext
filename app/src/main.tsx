import React from "react"
import ReactDOM from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { usePreferences } from "./state"
import App from "./App"

const root = document.getElementById("root") as HTMLElement
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
)

function AppContainer() {
  const scheme = usePreferences(state => state.scheme)
  const color = usePreferences(state => state.color)
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: scheme,
        defaultRadius: "xs",
        primaryColor: color,
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
  )
}