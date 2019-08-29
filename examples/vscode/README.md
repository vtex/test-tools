# VS Code Integration

You can debug your tests in VS Code using breakpoints and other nice features.

Create the file `.vscode/launch.json` in your app root directory with:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest All",
      "program": "${workspaceFolder}/react/node_modules/.bin/vtex-test-tools",
      "args": ["test", "--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "cwd": "${workspaceFolder}/react",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/react/node_modules/@vtex/test-tools/bin/vtex-test-tools",
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/react/node_modules/.bin/vtex-test-tools",
      "args": [
        "test",
        "${fileBasenameNoExtension}"
      ],
      "console": "integratedTerminal",
      "cwd": "${workspaceFolder}/react",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/react/node_modules/@vtex/test-tools/bin/vtex-test-tools",
      }
    }
  ]
}
```