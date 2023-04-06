import { Render } from "./render"
import { Source } from "./source"

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
}

export interface AppService {
  updateSource(source: Source): Action
  updatePreview(preview: Source): Action
  log(...msgs: any[]): Action
  error(...msgs: any[]): Action
}
