/**
 *  index.js, the starter.
 *
 *  @author  xerq
 *  @date    Oct 12, 2016
 *
 */
"use strict";
require.ensure(["splash-screen/dist/splash.min.css", "splash-screen"], function(require) {
    require("splash-screen/dist/splash.min.css").use();
    require("splash-screen").Splash.enable("circular");
});

require.ensure([
    "less/main.less",
    "splash-screen",
    "./fw/Entrance"
], function(require) {

    require("less/main.less");

    var Entrance = require("./fw/Entrance").default;
    (new Entrance()).run();
});
