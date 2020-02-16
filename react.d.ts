import { RenderOptions, RenderResult } from "@testing-library/react";
import { MockedProviderProps } from "@apollo/react-testing";

export * from "@testing-library/react";
export { renderHook } from "@testing-library/react-hooks";

/**
 *
 */
interface Messages {
  [id: string]: string;
}

type TestToolsRenderOptions = BaseTestToolsRenderOptions | GraphQLTestToolsRenderOptions

interface BaseTestToolsRenderOptions extends RenderOptions {
  /** A locale string, eg: `pt-BR`, `es`. Default: `en`*/
  locale?: string;
  /** A JSON translation to be used. Default: `messages/en.json` or another locale if specified in the `locale` option. */
  messages?: Messages;
}

interface GraphQLTestToolsRenderOptions extends BaseTestToolsRenderOptions {
  /** Props to be passed to MockedProvider */
  graphql: MockedProviderProps;
}

/**
 * Render into a container which is appended to document.body. It should be used with cleanup.
 */
export function render(
  ui: React.ReactElement<any>,
  options?: TestToolsRenderOptions
): RenderResult;

/**
 * Run a Promise that resolves in the next tick.
 */
export function flushPromises(): Promise<void>

// Exporting type definitions for Jest so that TypeScript Compiler can find it.
// This is necessary for testing projects that use TypeScript.
// Trying to find a better solution, check (https://github.com/vtex/test-tools/issues/7)
export * from "@types/jest";
