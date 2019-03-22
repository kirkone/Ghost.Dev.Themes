# Ghost Dev Environment for themes

This is a ready to run development environment for [Ghost Blog](https://github.com/TryGhost/Ghost) themes.  
The included theme is based on [Casper](https://github.com/TryGhost/Casper) and can be replaced with your custom theme.

# Goal

With this setup you can develop your own theme and generate a zip file with only the necessary files for upload to your own Ghost Blog.

It is not a good thing to have files in your production Ghost theme that are only necessary for the development.

# Development

Clone or fork this repo and run `npm install`  
Customize the files in the `theme` folder. In this folder is also the `themes.json`. This file will get the `package.json` for your theme. You should update it to match your theme.

This setup will compile all your css and js into one assets folder. All the `.hbs` files will also processed and remain in the same arrangement as in the theme folder. If you have any localisations these will also processed.  
For all the files there is a watcher set up and the files will be processed when saved. The website will not refresh by its own, you have to refresh the page manually.

The `LICENSE` file will also copied to the output.

All the settings can be tweakt in the `gulpfile.js` if necessary.

## Visual Studio Code

You can start the development environment by selecting "Dev Environment" in the debug pane and than start the project. This will do the same thing as running `npm start` in the command line.

## Commands

### npm start

This command starts a Ghost Blog instance and the watcher for the theme.

> **Info:** You have to setup the ghost blog on `http://localhost:2368/ghost/` on the first startup. Create a user and than select your theme in the "Design" pane.

### npm run test

This will run the gscan tool form ghost and outputs the results.

> **Info:** It is recommended to use the [gscan tool](https://docs.ghost.org/api/handlebars-themes/#gscan) to validate your theme.

### npm run zip

This will create a zip file for your theme here `/zip/<themename>.zip`. this file can be uploaded to a Ghost Blog on the admin panel.

## Livereload

If you want to use live reload you can either use the (livereload browser extension)[http://livereload.com/extensions/] or inject the following tag in the ghost settings under "Code injection":

```
<script src="http://localhost:35729/livereload.js?snipver=1"></script>
```
