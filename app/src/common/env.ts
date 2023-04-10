export module Env {
  export const development = location.protocol === "http:"
  export const production = !development
}
