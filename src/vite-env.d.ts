/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="vite/client" />
declare module '*.content.md' {
  const content: any;
  export default content;
}
declare module '*.md' {
  const content: any;
  export default content;
}
