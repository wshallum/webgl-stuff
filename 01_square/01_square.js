"use strict";
(function() {
    // get stuff
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('webgl');
    // clear it
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // compile shaders and link
    var vsText =
        "#version 100\n" +
        "attribute vec2 pos;" +
        "void main() {" +
        "gl_Position = vec4(pos, 0, 1);" +
        "}";
    var fsText =
        "#version 100\n" +
        "void main() {" +
        "gl_FragColor = vec4(1, 1, 1, 1);" +
        "}";
    var program = compileAndLinkShaders(gl, vsText, fsText);
    if (program === null) {
        return;
    }
    // get attribute location
    var posAttribute = gl.getAttribLocation(program, "pos");
    // set up vertex buffer
    // -- set up coordinates first
    var squareCoords = new Float32Array([
        0.5, 0.5,
        0.5, -0.5,
        -0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        -0.5, -0.5
    ]);
    // -- set up a buffer name and set it as the ARRAY_BUFFER
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // -- fill the ARRAY_BUFFER with the coordinate data
    gl.bufferData(gl.ARRAY_BUFFER, squareCoords, gl.STATIC_DRAW);
    // set up
    gl.useProgram(program);
    gl.enableVertexAttribArray(posAttribute);
    gl.vertexAttribPointer(posAttribute, 2, gl.FLOAT, false, 0, 0);
    // draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
})();