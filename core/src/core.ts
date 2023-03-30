export type Command =
| HostCommand
| AppCommand

export type HostCommand =
| HostOpenFile

export interface HostOpenFile {
  target: "host"
  action: "open-file"
}

export type AppCommand =
| AppOpenFile

export interface AppOpenFile {
  target: "app"
  action: "open-file"
  data: string
}
