# vscode-server-controller

<a href="https://marketplace.visualstudio.com/items?itemName=antfu.vscode-server-controller" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/antfu.vscode-server-controller.svg?color=eee&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>

> You may NOT need to install the extension directly. This is mainly for tooling integrations.

Start a local server to control the VS Code instance from external apps.

Port of the server will be stored under `.vscode/.server-controller-port.log` in the root of the current workspace.

## Endpoints

### `GET /open`

Open a file or folder in the current VS Code instance.

Required query parameters:

- `path`: the path to open

## Use Cases

- [Nuxt DevTools](https://github.com/nuxt/devtools/) uses this extension to do "Open in Editor" feature for embedded VS Code: https://github.com/nuxt/devtools/pull/207

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.png'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2022 [Anthony Fu](https://github.com/antfu)
