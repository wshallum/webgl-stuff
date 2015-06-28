"use strict";
function compileAndLinkShaders(gl, vertexShaderSource, fragmentShaderSource) {
    function compileShader(shaderSource, shaderType) {
        var shader = gl.createShader(shaderType);
        var shaderTypeAsString = (shaderType === gl.VERTEX_SHADER) ? 'Vertex' : 'Fragment';
        if (shader === null) {
            console.error("Failed to create " + shaderTypeAsString + " Shader");
            return null;
        }
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        var compiledOk = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiledOk) {
            var compileLog = gl.getShaderInfoLog(shader);
            console.error(shaderTypeAsString + " Shader compilation failed: ", compileLog);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    var vs = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    if (vs === null) {
        return null;
    }
    var fs = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (fs === null) {
        return null;
    }
    var program = gl.createProgram();
    if (program === null) {
        console.error("Failed to create program");
        return null;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    var linkedOk = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linkedOk) {
        var linkLog = gl.getProgramInfoLog(program);
        console.error("Program linking failed: ", linkLog);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return null;
    }
    return program;
}