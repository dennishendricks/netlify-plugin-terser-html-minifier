# Netlify Plugin - Terser HTML Minifier

This plugin minifies all your HTML files as a post-processing optimisation, using [Terser HTMLMinifier](https://github.com/terser/html-minifier-terser).

## Installation

### 1. Add the plugin as a dependency

```bash

# NPM
npm i -D netlify-plugin-terser-html-minifier

```

```bash

# Yarn
yarn add -D netlify-plugin-terser-html-minifier

```


#### 2. Add the plugin and its options to your netlify.toml

You can overwrite all options for minification using `[plugins.inputs.minify_options]`. A full list of options can be found in the [HTMLMinifier repository](https://github.com/terser/html-minifier-terser#options-quick-reference). These are the defaults:

```toml

[[plugins]]
  package = "netlify-plugin-terser-html-minifier"

  # Optionally, override the default options for the minification
  # https://github.com/terser/html-minifier-terser#options-quick-reference
  [plugins.inputs.minifierOptions]
    removeAttributeQuotes = true
    collapseBooleanAttributes = true
    collapseWhitespace = true
    removeComments = true
    sortClassName = true
    sortAttributes = true
    html5 = true
    decodeEntities = true
    removeOptionalTags = true
    minifyCSS = true
    minifyJS = true

```
