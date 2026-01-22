// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'
import { TodoCodeLensProvider } from './codelens/todo'
import { createIssue } from './command/create-issue'
import { HiCompletionProvider } from './autocompletion/hi'
import { TodoCompletionProvider } from './autocompletion/todo'
import { HiCodeLensProvider } from './codelens/hi'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "snkrdunk-lt" is now active!')

  registerCommands(context)
  registerCodeLenses(context)
  registerAutocompletion(context)
}

function registerCommands(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('snkrdunk-lt.hi', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello from snkrdunk-lt!')
  })
  context.subscriptions.push(disposable)

  const commands = {
    'snkrdunk-lt.create-issue': createIssue,
  }
  Object.keys(commands).forEach((name) => {
    const impl = commands[name as keyof typeof commands]
    context.subscriptions.push(vscode.commands.registerCommand(name, impl))
  })
}

function registerCodeLenses(context: vscode.ExtensionContext) {
  const lens = new HiCodeLensProvider()
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      [{ scheme: 'file', pattern: '**/*.hi' }],
      lens
    )
  )

  const lenses = [
    {
      provider: new TodoCodeLensProvider(),
      selector: [{ scheme: 'file', pattern: '**/*.go' }],
    },
  ]

  lenses.forEach((lens) => {
    context.subscriptions.push(
      vscode.languages.registerCodeLensProvider(lens.selector, lens.provider)
    )
  })
}

function registerAutocompletion(context: vscode.ExtensionContext) {
  const completion = new HiCompletionProvider()
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      [{ scheme: 'file', pattern: '**/*.hi' }],
      completion,
      '@',
      '('
    )
  )

  const autocompletions = [
    {
      provider: new TodoCompletionProvider(),
      selector: [{ scheme: 'file', pattern: '**/*.go' }],
      triggers: ['@', '!'],
    },
  ]

  autocompletions.forEach((completion) => {
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        completion.selector,
        completion.provider,
        ...completion.triggers
      )
    )
  })
}

// This method is called when your extension is deactivated
export function deactivate() {}
