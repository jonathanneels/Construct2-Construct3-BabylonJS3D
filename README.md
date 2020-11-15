# Construct2-Construct3-BabylonJS3D
An updated version of Babylon JS for Construct 2 and Construct 3 (Babylon js version 4.2)

The examples (and project) are based on the work of Davit Masia. 

Copy content from the plugin to: C:\Program Files\Construct 2\exporters\html5 (default).

The conversion to Babyon 4.2 (from Babylon 2) is far from ready/perfect, but a top-down game or a platformer with skeletons seems possible.
Also a (non-shooter atm) fps game (adventure, movement) is also possible in the current state.

REF; https://www.patreon.com/posts/old-babylon3d-c2-27352972


What is new;
* Latest version of Babylon JS 4.2 and its Inspector.
* All extra libraries; Hand.js, Oimo.js, cannon.js, babylon.objFileLoader.js have been updated to the latest version.



To-do's;
* FPS controls working
* The fire textures, raycasting (and maybe other things) are not working in the current build.
* When new-scene is ready needs to be better. It's current 500 ms before 'is true' in runtime.js (new scene) and does not work correctly.
* Loading new scene needs some more polish
* vr stuff and new features.
* Mouse clicks => sometimes issues. Has to do with Z-index.
