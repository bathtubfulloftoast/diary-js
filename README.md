# Novas Diary

This is version 3 of **Novas Diary** this is currently HEAVY development as ive just started but yeag

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

## Custom CSS

> [!NOTE]
> the customization settings are currently quite unfriendly with how i use class names and IDs

by placing a custom.css file in the ``branding/`` directory you can change the css in any way you desire

# ToDo

* [ ] Theme Selector (only colors)
* [X] Custom CSS for branding
* [ ] friendlier class names for custom.css
* [ ] favicon detection (.png .ico etc)
* [X] explain shit in readme
* [ ] Custom Logo for branding
* [X] Port in .env
* [ ] Public URL in .env
* [ ] add logging
* [X] more options for href linking (to files and shit)
* [ ] cache re-built entries (but not ones from current date)
* [ ] allow for cache clearing
* [ ] allow image resizing?
* [ ] rescale for mobile
* [X] finish share page
* [ ] automatic code highlighting
* [X] better error handling for pages (get error: thing)
* [X] set error codes for api
* [ ] proper password menu
* [ ] check if linked file is directory
* [ ] add access log
* [ ] search menu
* [X] base URL in .env
