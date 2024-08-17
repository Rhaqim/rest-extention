import * as vscode from 'vscode';
const { detectMethodsInFile } = require('../rezt');

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.languages.registerHoverProvider({
        language: 'go',
        scheme: 'file'
    }, {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            if (word === 'GET') {
                return new vscode.Hover(new vscode.MarkdownString(`[GET](command:rustext.openFile?%7B%22fileName%22%3A%22${document.fileName}%22%7D) is a method used to request data from a specified resource.`));
            }
        }
    });
    // let disposable = vscode.commands.registerCommand('rustext.highlightPatterns', () => {
    //     const editor = vscode.window.activeTextEditor;
    //     if (editor) {
    //         const document = editor.document;
    //         const text = document.getText();

    //         const detectedMethods = detectMethodsInFile(document.fileName);

	// 		console.log('detectedMethods', detectedMethods);

    //         if (detectedMethods) {
    //             const regex = new RegExp('\\b(' + 'GET' + ')\\b', 'g');
    //             let match;
    //             const decorationsArray: vscode.DecorationOptions[] = [];

    //             while ((match = regex.exec(text)) !== null) {
    //                 const startPos = document.positionAt(match.index);
    //                 const endPos = document.positionAt(match.index + match[0].length);
    //                 const decoration = { range: new vscode.Range(startPos, endPos) };
    //                 decorationsArray.push(decoration);
    //             }

    //             const decorationType = vscode.window.createTextEditorDecorationType({
    //                 backgroundColor: 'rgba(255, 0, 0, 0.3)'
    //             });

    //             editor.setDecorations(decorationType, decorationsArray);
    //         }
    //     }
    // });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
