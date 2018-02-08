# <%= projectName %>

> <%= projectDescription %>

## Prerequisites

To install this project, you'll need the following things installed on your machine.

1. [RubyGems](https://rubygems.org/pages/download) - follow the guide.
1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll bundler`
2. [NodeJS](http://nodejs.org) - use the installer.

## Getting Started

Install [Grunt](https://gruntjs.com) and [Bower](https://bower.io) using [npm](https://www.npmjs.com/).

```shell
$ npm install -g grunt-cli
$ npm install -g bower
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

## License

MIT © [Tommaso Negri](https://github.com/tommaso-negri)
