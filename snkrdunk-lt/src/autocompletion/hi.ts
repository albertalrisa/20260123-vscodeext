import vscode from 'vscode'

export class HiCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<
    vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>
  > {
    // return [
    //   {
    //     label: 'Say hi',
    //     insertText: 'Hi, ',
    //     kind: vscode.CompletionItemKind.Text,
    //     documentation: 'Say hi! Why would you use autocomplete for this.',
    //   },
    //   {
    //     label: 'Say hey',
    //     insertText: 'Hey, ',
    //     kind: vscode.CompletionItemKind.Text,
    //     documentation:
    //       'Say hey and remove trigger character! Why would you use autocomplete for this.',
    //     additionalTextEdits: [
    //       vscode.TextEdit.delete(
    //         new vscode.Range(
    //           position.line,
    //           position.character - 1,
    //           position.line,
    //           position.character
    //         )
    //       ),
    //     ],
    //   },
    // ]
    return []
  }
}
