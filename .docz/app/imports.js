export const imports = {
  'src/components/atoms/button/button.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-components-atoms-button-button" */ 'src/components/atoms/button/button.mdx'
    ),
}
