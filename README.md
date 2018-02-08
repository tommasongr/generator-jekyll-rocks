# generator-jekyll-rocks

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![NPM version](https://badge.fury.io/js/badge-list.svg)](http://badge.fury.io/js/badge-list)

> Boost your Jekyll workflow with Grunt! Comes with cool features as livereload, sass, uglify, postcss and Git and FTP deploy. You can choose also your favourite front end framework and everything is automatic!

## Prerequisites

To install this project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll -v 3.6.2`
2. [NodeJS](http://nodejs.org) - use the installer.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-jekyll-rocks using [npm](https://www.npmjs.com/).

```bash
npm install -g yo
npm install -g generator-jekyll-rocks
```

Then generate your new project:

```bash
yo jekyll-rocks
```

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


[npm-image]: https://badge.fury.io/js/generator-jekyll-rocks.svg
[npm-url]: https://npmjs.org/package/generator-jekyll-rocks
[travis-image]: https://travis-ci.org/tommaso-negri/generator-jekyll-rocks.svg?branch=master
[travis-url]: https://travis-ci.org/tommaso-negri/generator-jekyll-rocks
[daviddm-image]: https://david-dm.org/tommaso-negri/generator-jekyll-rocks.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tommaso-negri/generator-jekyll-rocks
