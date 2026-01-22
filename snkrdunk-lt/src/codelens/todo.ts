import vscode from 'vscode'

const TODO_REGEX = /^(\s*)\/\/\s*TODO\s*(?:\(@?(\w+)\))?\s*:?\s*(.*)$/

export class TodoCodeLensProvider implements vscode.CodeLensProvider {
  provideCodeLenses(
    document: vscode.TextDocument,
    _: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    const lenses: vscode.CodeLens[] = []
    // const lines = document.getText().split('\n')
    // for (let i = 0; i < lines.length; i++) {
    //   const line = lines[i]
    //   const matches = line.match(TODO_REGEX)
    //   if (matches != null) {
    //     const lead = matches[1].length
    //     const username = matches[2]
    //     const message = matches[3]
    //     const range = new vscode.Range(i, lead, i, lead)
    //     const command: vscode.Command = {
    //       title:
    //         username == null
    //           ? '$(github-inverted) Create a new GitHub issue'
    //           : `\$(github-inverted) Create a new GitHub issue and assign to ${username}`,
    //       command: 'snkrdunk-lt.create-issue',
    //       arguments: [message, username],
    //     }
    //     lenses.push(new vscode.CodeLens(range, command))
    //   }
    // }
    return lenses
  }
}
