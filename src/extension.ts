import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
const { detectMethodsInFile } = require("../rezt");

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("rustext.restFile", () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const extensionId = "humao.rest-client"; // Replace with the ID of the extension to check
			const isExtensionInstalled = vscode.extensions.getExtension(extensionId);

			if (!isExtensionInstalled) {
				vscode.window.showWarningMessage(
					`Required extension "${extensionId}" is not installed.`
				);
				return;
			}

			const document = editor.document;

			const detectedMethods = detectMethodsInFile(document.fileName);

			// Determine the path where the file will be created
			const folderPath = vscode.workspace.workspaceFolders
				? vscode.workspace.workspaceFolders[0].uri.fsPath
				: undefined;

			if (!folderPath) {
				vscode.window.showErrorMessage("No workspace folder is open.");
				return;
			}

			// Define the file name and content
			const filePath = path.join(folderPath, "request.http");
			const content = detectedMethods;

			// Write the content to the file
			fs.writeFile(filePath, content, err => {
				if (err) {
					vscode.window.showErrorMessage(
						`Failed to create file: ${err.message}`
					);
					return;
				}

				vscode.window.showInformationMessage(`File created: ${filePath}`);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
