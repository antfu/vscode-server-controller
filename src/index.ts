import { createServer } from 'node:http'
import fs from 'node:fs/promises'
import { join } from 'node:path'
import type { ExtensionContext } from 'vscode'
import { Position, Range, Selection, window, workspace } from 'vscode'
import { createApp, eventHandler, getQuery, toNodeListener } from 'h3'
import { getPort } from 'get-port-please'
import { version } from '../package.json'

export async function activate(ctx: ExtensionContext) {
  const logger = window.createOutputChannel('VS Code Server Controller')

  const root = workspace.workspaceFolders?.[0].uri.fsPath
  if (!root) {
    logger.appendLine('No workspace folder found')
    return
  }

  const app = createApp()
  app.use('/open', eventHandler((ctx) => {
    const query = getQuery(ctx)
    if (!query.path)
      return { status: 'error', message: 'No path provided' }

    const [file, line = 1, column = 1] = query.path?.toString().split(':')

    logger.appendLine(`Open ${file}:${line}:${column}`)

    workspace.openTextDocument(file)
      .then(doc => window.showTextDocument(doc))
      .then((editor) => {
        const pos = new Position(+line, +column)
        editor.revealRange(new Range(pos, pos))
        editor.selection = new Selection(pos, pos)
      })

    return { status: 'ok' }
  }))

  const server = createServer(toNodeListener(app))

  ctx.subscriptions.push({
    async dispose() {
      server.close()
    },
  })

  const port = await getPort({ port: 13452, portRange: [9000, 15000] })

  server.listen(port, () => {
    logger.appendLine(`Server listening on port ${port}`)
  })

  const dir = join(root, '.vscode')
  const filepath = join(dir, '.server-controller-port.log')

  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filepath, JSON.stringify({
    port,
    time: Date.now(),
    version,
  }, null, 2), 'utf-8')

  ctx.subscriptions.push({
    async dispose() {
      await fs.rm(filepath)
    },
  })
}

export function deactivate() {

}
