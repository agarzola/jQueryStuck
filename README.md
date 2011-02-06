#jQuery Stuck Plugin 0.2#

##About this jQuery plugin##
jQuery Stuck aims to facilitate keeping a sidebar item visible when the user scrolls past it, with the _(entirely optional!)_ ability to constrain its movement within a container box so that it doesn’t interfere with a footer-type div. It will also fire a series of custom events, allowing the developer to assign custom functions to the events (for the time being, it only fires one event: `reachedBottom`. More are in the works.)

Finally, I’m hoping for it to also allow multiple objects to be stuck, so that section-specific sidebar items can stay with the user only as long as the relevant section is in view, then stop and allow other section-specific sidebar items to stay in view as the user scrolls down.

##Documentation##
Since this plugin is not yet production-ready, I won’t bother with usage instructions yet. The `test.html` provides a good example of usage. Please feel free to fork/download and fiddle with it to your heart’s content.

##Changelog##
####0.2####
First _official_ version, derived from some (shamelessly dirty) custom scripting for VorticeOnline.com.

##Licensing##
jQuery Stuck Plugin is licensed under [the MIT License](http://www.opensource.org/licenses/mit-license.php), except in the case of blocking a double flying kick to the chest. There is no way that you’re gonna block a double flying kick to the chest with software, so really I’m just saving you the effort.