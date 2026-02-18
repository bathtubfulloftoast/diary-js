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

# Branding
anything thats placed in the ``branding/`` directory

## Custom CSS

> [!NOTE]
> the customization settings are currently quite unfriendly with how i use class names and IDs

by placing a custom.css file in the branding directory you can change the css in any way you desire

## Favicon/TabIcon

place a 16x16 (not required but thats the size itl show as) image in the branding directory named favicon

the priority is of the file extensions alphabetical order

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

> [!NOTE]
> everything after this is not implemented and is image specific. i do not plan to add video/audio support.

## size
this lets you change the size of an image for example ``?size=800`` will scale the image to be a maximum of 800 pixels wide/tall.

## width/height
both of these will entirely ignore aspect ratio and will 

## format
this lets you change the format of an image from one to another


# ToDo

* [ ] Theme Selector (only colors)
* [X] Custom CSS for branding
* [ ] friendlier class names for custom.css
* [X] favicon detection (.png .ico etc)
* [X] explain shit in readme
* [ ] Custom Logo for branding
* [X] Port in .env
* [ ] Public URL in .env
* [ ] add logging
* [X] more options for href linking (to files and shit)
* [ ] cache converted files (entries/images)
* [ ] allow for cache clearing
* [ ] allow image resizing
* [X] rescale for mobile
* [X] finish share page
* [ ] automatic code highlighting
* [X] better error handling for pages (get error: thing)
* [X] set error codes for api
* [ ] proper password menu
* [ ] check if linked file is directory
* [ ] add access log
* [ ] search menu
* [X] base URL in .env
* [X] figure out embedded script functionality (thank you [allenhwkim)(https://stackoverflow.com/users/454252/allenhwkim))
* [ ] PWA support
