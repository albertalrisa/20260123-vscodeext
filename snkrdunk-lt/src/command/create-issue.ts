import vscode from 'vscode'

export const createIssue = (message: string, username?: string) => {
  const msgs = [`Creating GitHub issue with content: ${message}`]
  if (username != null) {
    msgs.push(`(assigned to ${username})`)
  }
  vscode.window.showInformationMessage(msgs.join(' '))
}
