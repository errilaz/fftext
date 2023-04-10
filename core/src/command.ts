import { Render } from "./render.js"
import { Source } from "./source.js"

export interface Command {
  target: "host" | "app"
  method: string
  parameters: any[]
}

export type Action = void | Promise<void>

export interface HostService {
  openFile(): Action
  openBrowser(url: string): Action
  updateRender(render: Render): Action
  copyText(): Action
  restoreSource(path: string): Action
  newWindow(): Action
  appConnected(): Action
}

export interface AppService {
  updateSource(source: Source): Action
  updatePreview(preview: Source): Action
  log(...msgs: any[]): Action
  error(...msgs: any[]): Action
  copyText(path: string): Action
  hostStarted(info: Record<string, any>): Action
}
