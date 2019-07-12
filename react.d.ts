import { RenderOptions, RenderResult } from "@testing-library/react";
import { MockedProviderProps } from "react-apollo/test-utils";

export * from "@testing-library/react";

/**
 *
 */
interface Messages {
  [id: string]: string;
}

interface TestToolsRenderOptions extends RenderOptions {
  /** Props to be passed to MockedProvider from react-apollo. */
  graphql?: MockedProviderProps;
  /** A locale string, eg: `pt-BR`, `es`. Default: `en`*/
  locale?: string;
  /** A JSON translation to be used. Default: `messages/en.json` or another locale if specified in the `locale` option. */
  messages?: Messages;
}

/**
 * Render into a container which is appended to document.body. It should be used with cleanup.
 */
export function render(
  ui: React.ReactElement<any>,
  options?: TestToolsRenderOptions
): RenderResult;

// Exporting type definitions for Jest so that TypeScript Compiler can find it.
// This is necessary for testing projects that use TypeScript.
// Trying to find a better solution, check (https://github.com/vtex/test-tools/issues/7)
export * from "@types/jest";
