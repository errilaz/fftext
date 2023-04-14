cwd := `pwd`

build:
  just build-core
  just build-host
  just build-app
  just build-ext
  just bundle-linux

build-core:
  cd core && \
  pnpm build

build-app:
  cd app && \
  pnpm build

build-host:
  cd host && \
  pnpm build

build-ext:
  cd ext && \
  pnpm build

bundle-linux:
  just bundle-base linux
  mkdir -p build/linux/scripts
  cp scripts/fftext.desktop build/linux/scripts/fftext.desktop

bundle-base platform:
  @echo bundling
  mkdir -p build/{{platform}}
  cp fftext build/{{platform}}/fftext

  @echo bundling ext
  mkdir -p build/{{platform}}/ext
  cp -r ext/lib build/{{platform}}/ext
  cp ext/manifest.json build/{{platform}}/ext/manifest.json

  @echo bundling core
  mkdir -p build/{{platform}}/core
  cp -r core/lib build/{{platform}}/core
  just bundle-package-json core/package.json build/{{platform}}/core/package.json

  @echo bundling app
  mkdir -p build/{{platform}}/app
  cp -r app/dist build/{{platform}}/app

  @echo bundling host
  mkdir -p build/{{platform}}/host
  cp -r host/bin build/{{platform}}/host
  cp -r host/lib build/{{platform}}/host
  just bundle-package-json host/package.json build/{{platform}}/host/package.json

clean:
  rm -rf build

# Utilities

bundle-package-json source target:
  #!/usr/bin/env node
  const fs = require("fs")
  const pkg = require("{{cwd}}/{{source}}")
  Object.assign(pkg, pkg.publishConfig)
  delete pkg.publishConfig
  delete pkg.devDependencies
  if (pkg.dependencies) pkg.dependencies = Object.fromEntries(Object.keys(pkg.dependencies).map(key => {
    const original = pkg.dependencies[key]
    const value = original.startsWith("workspace:")
      ? "file:../" + key.substring(key.indexOf("/") + 1)
      : original
    return [key, value]
  }))
  fs.writeFileSync("{{cwd}}/{{target}}", JSON.stringify(pkg, null, 2), "utf8")
