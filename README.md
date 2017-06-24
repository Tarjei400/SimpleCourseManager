## Synopsis

This is a simple SPA application, utilizing a couple of REST API endpoint. 
Code is written using ES7 on top of Babel, webpack, React and Materilze.

Testing libraries: Jasmine and enzyme

## Installation

To install project it should be enough to type 
`yarn` or `npm install`

Note: this project relies heavily on node.js cli tools such as:
`babel-cli` and `nodemon` and you have to install them globally,
since they are not listed in package.json as a dependency

They can be install with `yarn`/`npm`
It is recommended to use node.js 8.0.0

To start application type `yarn run dev` or `npm run dev`
However it also containes mongo db and example database soon, therefore
it is recomended to use `docker-compose up`
## API Reference

If you succeded with installation step, API endpoints would be displayed 
upon application startup.

## Tests
Start aplication with `yarn run dev` or `npm run dev` then
for running tests type `yarn run test` or `npm run test` in other terminal window
