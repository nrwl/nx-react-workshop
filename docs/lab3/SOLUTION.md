##### 1. To build the app:

`nx build store`

##### 4. To configure webpack to extract licenses only during production builds:

In `apps/store/webpack.config.js`:

```js
module.exports = {
  // ...
  plugins: [
    // ...
    new NxAppWebpackPlugin({
      // ...
      extractLicenses: process.env['NODE_ENV'] === 'production',
    }),
    // ...
  ],
  // ...
};
```

##### 7. To add a development configuration to the build target:

In `apps/store/project.json`:

```json
{
  // ...
  "targets": {
    "build": {
      "configurations": {
        "development": {
          "args": ["--node-env=development"]
        }
      }
    }
  }
}
```

##### 7. To build the app using the development configuration:

`nx build store --configuration=development`
