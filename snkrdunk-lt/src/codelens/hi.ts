import vscode from 'vscode'

export class HiCodeLensProvider implements vscode.CodeLensProvider {
  provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeLens[]> {
    // const range = new vscode.Range(0, 0, 0, 0)
    // const command: vscode.Command = {
    //   title: '$(person) Say hi!',
    //   command: 'snkrdunk-lt.hi',
    //   arguments: [],
    //   tooltip: 'Say hi. Not really that useful.',
    // }
    // return [new vscode.CodeLens(range, command)]
    return []
  }
}
