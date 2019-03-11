# Ghost Dev Environment for themes

This is a ready to run development environment for [Ghost Blog](https://github.com/TryGhost/Ghost) themes.  
The included theme is based on [Casper](https://github.com/TryGhost/Casper) and can be replaced with your custom theme.

# Development

Clone or fork this repo and run `npm install`  
Customize the files in the `theme` folder. In this folder is also the `themes.json`. This file will get the `package.json` for your theme. You should update it to match your theme.

## Commands

### npm start

This command starts a Ghost Blog instance and the watcher for the theme.

> **Info:** You must first setup the ghost blog on http://localgost:2368/ghost/. Create a user and select your theme.

### npm run zip

This will create a zip file for your theme here `/zip/<themename>.zip`. this file can be uploaded to a Ghost Blog on the admin panel.


