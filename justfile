cwd := `pwd`

build:
  just build-core
  just build-host
  just build-app

build-core:
  cd core && \
  pnpm build

build-app:
  cd app && \
  pnpm build

build-host:
  cd host && \
  pnpm build

build-linux:
  just build
  just package-linux

package-linux:
  mkdir -p build/linux
  cp fftext build/linux/fftext
  mkdir -p build/linux/app
  cp -r app/dist build/linux/app
  mkdir -p build/linux/core
  cp -r core/lib build/linux/core
  just publish-package-json core/package.json build/linux/core/package.json
  mkdir -p build/linux/host
  cp -r host/bin build/linux/host
  cp -r host/lib build/linux/host
  just publish-package-json host/package.json build/linux/host/package.json

clean:
  rm -rf build

# Utilities

publish-package-json source target:
  #!/usr/bin/env node
  const fs = require("fs")
  const pkg = require("{{cwd}}/{{source}}")
  Object.assign(pkg, pkg.publishConfig)
  delete pkg.publishConfig
  if (pkg.dependencies) pkg.dependencies = Object.fromEntries(Object.keys(pkg.dependencies).map(key => {
    const original = pkg.dependencies[key]
    const value = original.startsWith("workspace:")
      ? "file:../" + key.substring(key.indexOf("/") + 1)
      : original
    return [key, value]
  }))
  fs.writeFileSync("{{cwd}}/{{target}}", JSON.stringify(pkg, null, 2), "utf8")
