import { Source } from "./source"

export type Command =
  | HostCommand
  | AppCommand

export type HostCommand =
  | HostOpenFile

export interface HostOpenFile {
  target: "host"
  action: "openFile"
}

export type AppCommand =
  | AppOpenFile
  | AppRendered

export interface AppOpenFile {
  target: "app"
  action: "openFile"
  source: Source
}

export interface AppRendered {
  target: "app"
  action: "rendered"
  path: string
}
