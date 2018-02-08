# Generator Jekyll Rocks

[![npm](https://img.shields.io/npm/v/generator-jekyll-rocks.svg)](https://www.npmjs.com/package/generator-jekyll-rocks) [![license](https://img.shields.io/github/license/tommaso-negri/generator-jekyll-rocks.svg)](https://github.com/tommaso-negri/generator-jekyll-rocks/) [![GitHub last commit](https://img.shields.io/github/last-commit/tommaso-negri/generator-jekyll-rocks.svg)](https://github.com/tommaso-negri/generator-jekyll-rocks/) [![GitHub issues](https://img.shields.io/github/issues/tommaso-negri/generator-jekyll-rocks.svg)](https://github.com/tommaso-negri/generator-jekyll-rocks/issues) [![npm](https://img.shields.io/npm/dt/generator-jekyll-rocks.svg)](https://www.npmjs.com/package/generator-jekyll-rocks)

**Boost your Jekyll workflow with Grunt!**

Jekyll Rocks Generator uses the [Yeoman](http://yeoman.io) technology to scaffold a basic [Jekyll](http://jekyllrb.com/) environment that in union with [Grunt](https://gruntjs.com) makes the perfect development workflow.

The Generator comes with cool featuresas livereload, sass, uglify, postcss and Git or FTP deploy. You could choose also to use a front end framework. At this time are available [Bootstrap 4](http://getbootstrap.com), [Foundation 6](https://foundation.zurb.com), [Semantic UI](https://semantic-ui.com), [Material Design Lite](https://getmdl.io) or [Materialize](http://materializecss.com). But you can obviously install whatever you want in a second time.


## Features

**During setup you can choose:**

- [Sass](http://sass-lang.com/), Scss or vanilla CSS
- A framework between: [Bootstrap 4](http://getbootstrap.com), [Foundation 6](https://foundation.zurb.com), [Semantic UI](https://semantic-ui.com), [Material Design Lite](https://getmdl.io) or [Materialize](http://materializecss.com)
- Automatic push of your code on branch master
- Automatic deploy of your site on gh-pages, ftp or both

**Jekyll-Rocks always includes:**

- Automatic Jekyll and preprocessor compiling
- An automatic build process that includes concatenation, image and svg optimization, CSS minification and JS uglification

## Prerequisites

To install this project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll -v 3.6.2`
2. [NodeJS](http://nodejs.org) - use the installer.

## Getting Started

First, install [Yeoman](http://yeoman.io) and generator-jekyll-rocks using [npm](https://www.npmjs.com/).

```shell
$ npm install -g yo
$ npm install -g generator-jekyll-rocks
```

Then generate your new project:

```shell
$ yo jekyll-rocks
```

## Grunt Workflow

**Development mode**

This will give you jekyll server, file watching, uglify, postcss, auto-rebuild etc.

You have to work only with app/ dir files.

You will find common jekyll server builded files under .jekyll/

```shell
$ grunt serve
```

**Build mode**

This will build your jekyll site minimizing all your sass, css, js, img and svg.

You could find the builded site under dist/

```shell
$ grunt build
```

**Clear mode**

This will clear all your tmp files, sass-cache etc.

```shell
$ grunt clear
```

**Push mode**

You can easily push your files on your branch master.

NOTICE: this command is available only if in the setup you choose it

```shell
$ grunt push
```

**Push mode**

You can easily deploy your site on your branch gh-pages, your ftp or both.

NOTICE: this command is available only if in the setup you at least one of these options.

```shell
$ grunt deploy
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Tommaso Negri](https://github.com/tommaso-negri)
