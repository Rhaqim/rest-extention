import * as vscode from 'vscode';
const { detectMethodsInFile } = require('../rezt');

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.languages.registerInlayHintsProvider({
        language: 'go',
        scheme: 'file'
    }, {
        provideInlayHints(document, range, _token) {
            const hints: vscode.InlayHint[] = [];
            const text = document.getText();
            const detectedMethods = detectMethodsInFile(document.fileName);
        
            if (detectedMethods) {
                const regex = new RegExp('\\b(' + 'GET' + ')\\b', 'g');
                let match;
                while ((match = regex.exec(text)) !== null) {
                    const startPos = document.positionAt(match.index);
                    hints.push({
                        position: startPos,
                        label: 'GET' // Add the 'label' property to the InlayHint object
                    });
                }
            }
        
            return hints;
        }
        // provideHover(document, position, token) {
        //     const range = document.getWordRangeAtPosition(position);
        //     const word = document.getText(range);

        //     if (word === 'GET') {
        //         // return new vscode.Hover('GET is a method used to request data from a specified resource.');
        //         // return a clickable link to open a file
        //         // return new vscode.Hover(new vscode.MarkdownString(`[GET](command:rustext.openFile?%7B%22fileName%22%3A%22${document.fileName}%22%7D) is a method used to request data from a specified resource.`));
        //         return new vscode.Hover(new vscode.MarkdownString(`[GET](command:rustext.openFile?%7B%22fileName%22%3A%22${document.fileName}%22%7D) is a method used to request data from a specified resource.`));
        //     }
        // }
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


// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "rustext" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('rustext.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from rustext!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}
