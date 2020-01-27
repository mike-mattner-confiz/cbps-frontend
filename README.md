# Walgreen's UX Handlebars Starter Project

A simple starter project built on webpack, handlebars, sass and babel. Useful for creating static sites with reusable, modular components.

### Installation

    yarn install
    
### Usage

Run the following to start up the development server and watch for changes.

    yarn run start
    
Browse to `http://localhost:8080/`

Run the following for a production build (minification, etc.).

    yarn run build

The generated `dist` folder is created with the following structure:

    dist
      about
        index.html
      css
        about.css
        index.css
      img
      	logo.png
      js
        about.js
        index.js
      favicon.ico
      index.html

The generated `html` files will have links to their respective `[name].css` and `[name].js` files.

Contents of the `src/static` directory are simply copied to `dist`.

To add a new page to the site, create a view folder with content similar to `home` and `about` and update the `webpack.config.js`
