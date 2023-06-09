export module Web {
  export function get(url: string): Promise<string> {
    const req = new XMLHttpRequest()
    return new Promise((resolve, reject) => {
      req.addEventListener("load", function () {
        resolve(this.responseText)
      })
      req.addEventListener("error", function () {
        reject(this.statusText)
      })
      req.open("GET", url)
      req.send()
    })
  }
}
