# clgl

> A graphic lib for command line.

## Introduction

This is a graphic lib for command line, which enables you to shade graphics in console. Technically, the graphics are output to NodeJS streams, so you can also direct them to other places.

## Example

```js
const { Root, Node, Shaders } = require('clgl');

const root = new Root();

const box = new Node({
    left: 1,
    top:1,
    width: 10,
    height: 3,
    shader: Shader.Pure('#'),
});
root.childNodes.push(box);

root.tick();
```

## Links

- [Documentation](https://github.com/huang2002/clgl/wiki)
- [License](./LICENSE)
