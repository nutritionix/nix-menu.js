Development Guide
=================

To get started when you clone this project run `npm install` to get all the development dependecnies.

To build a new version make your changes and run
```
grunt
```
This will overwrite `dist/nix-menu.min.js`.

If you want to upgrade the version of the package run
```
grunt bump-version
```
This will update `package.json` and commit a new release version to github.

If you are ready to publish the newest version to the CDN you will need AWS environmental variables set to give you access to the S3 bucket.

```
grunt publish
```

This will publish a new version to Amazon S3 using the package.json version in the file name. `lib/nix-menu-<%= pkg.version %>.min.js`