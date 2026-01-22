import vscode from 'vscode'

const TODO_REGEX = /^\s*\/\/\s*TODO/
const GB_USERNAMES = [
  'albertalrisa',
  'celingwangggg',
  'daisukeueta',
  'DanArcherOnline',
  'ezraisw',
  'Honey-yAsyuma',
  'michael-koh',
  'miyasic',
  'mizou-soga',
  'myoshida320',
  'panli20160320',
  'Pensk',
  'SantonyChoi',
  'yasszu',
]
const TYPE = ['INFO', 'WARNING', 'DANGER']

export class TodoCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<
    vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>
  > {
    // const line = document.lineAt(position.line)
    // const matches = line.text.match(TODO_REGEX)
    // if (matches == null) {
    //   return []
    // }

    // if (context.triggerCharacter === '@') {
    //   return GB_USERNAMES.map((uname) => {
    //     return {
    //       label: uname,
    //       insertText: uname,
    //       kind: vscode.CompletionItemKind.User,
    //     }
    //   })
    // }

    // if (context.triggerCharacter === '!') {
    //   return TYPE.map((type) => {
    //     return {
    //       label: type,
    //       insertText: type,
    //       kind: vscode.CompletionItemKind.Constant,
    //       documentation: `TODO is classified as ${type}`,
    //     }
    //   })
    // }

    return []
  }
}
