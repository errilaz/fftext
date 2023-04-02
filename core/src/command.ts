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
  updateRender(render: Render): Action
}

export interface AppService {
  updateSource(source: Source): Action
  updatePreview(preview: Source): Action
}
