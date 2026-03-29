# Novas Diary

This is version 3 of **Novas Diary** this is currently HEAVY development as ive just started but yeag

# Contributing

if youre on github and you wish to contribute please direct yourself toward the [git.gay](https://git.gay/bathtubfulloftoast/diary) repository.

this is the primary host where i actually push my commits to.

im too lazy to setup a proper mirror between the two so git.gay is the only place any changes can be made to.

# Getting Started

* ``git clone https://git.gay/bathtubfulloftoast/diary.git``
* ``pnpm install``
* ``cp .env.example .env``
* ``pnpm run build``
* ``node server.js``

# Config Options

it is recomended to rebuild after changing any settings

## Port
the port number your server will run on

## Title
this is the title of your diary/journal typically its Novas Diary or Novas Journal but you can shove whatever you want.

## Editor Options
EditorURL and EditorPath are both for viewing/editing the files of your diary/journal from the web

any software will do (even a default nginx/apache2 file list) but i reccomend [copyparty](https://github.com/9001/copyparty) as thats what i use.

## Base URL
the base url MUST end in a ``/`` ex: ``/diary/`` or ``/journal/`` if you dont do this links will break.

## Public URL
this is the public url for your instance, this is the default link used for any links/sharing 

if unset this will just use the url youre connected to

# Branding
anything thats placed in the ``branding/`` directory

## Custom CSS

> [!NOTE]
> the customization settings are currently quite unfriendly with how i use class names and IDs

by placing a custom.css file in the branding directory you can change the css in any way you desire

## Favicon/TabIcon

place a 16x16 (not required but thats the size itl show as) image in the branding directory named favicon

the priority is of the file extensions alphabetical order

## Logo Image

by setting LOGOIMG in in the ``.env`` you can set a custom image to show up, if you really want to

# File Conversion
when linking a file inside of another you can set various flags to do stuff.

## defaults

by default files are converted as such,

### HTML

HTML files are converted so that their sources will link to the proper file inside of the entries directory.

### Images 

by default images are a maximum of 1000 pixels and are converted to webp (this is to make loading quicker if there are many images.)

## convert=false
by placing ``?convert=false`` after a linked file you can bypass any possible conversions that might be made

false is the only option.

## thumbnail=true
by setting ``?thumbnail=true`` a thumbnail will be generated for a video

this thumbnail is the first frame of the video and a full quality frame will be temporarily put in your temp directory,, only temporarily.

true is the only option

# ToDo

* [ ] Theme Selector (only colors)
* [ ] friendlier class names for custom.css
* [ ] add logging
* [X] cache converted files (**entries/images**)
* [ ] allow for cache clearing
* [X] allow image conversion
* [ ] allow video conversion
* [X] automatic video thumbnails
* [ ] allow audio conversion (to opus by default)
* [ ] automatic code highlighting
* [ ] proper password menu
* [X] check if linked file is directory
* [ ] add access log
* [ ] search menu
* [ ] PWA support
* [X] BASIC directory viewer
* [X] file identification for dir viewer
* [X] sort folders first
* [X] create top icons with JS instead of being baked into the HTML (i did it terribly)
* [ ] allow copyparty to be used for viewing files
