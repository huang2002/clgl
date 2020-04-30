// @ts-check
const { Root, Node, Shaders } = require('..');

const root = new Root({
    height: 12,
    background: '-',
});

const CONTAINER_FILL = '#';

const container = new Node({
    left: 2,
    top: 1,
    width: 30,
    height: 8,
    shader: Shaders.Pure(CONTAINER_FILL),
});
root.childNodes.push(container);

const box = new Node({
    left: 5,
    top: 2,
    width: 24,
    height: 6,
    /**
     * expect output:
     * \/\...
     * /\/...
     * \/\...
     * ...
     */
    shader: Shaders.Pattern(['\\/', '/\\']),
});
root.childNodes.push(box);

const text = new Node({
    left: 10,
    top: 3,
    width: 14,
    height: 4,
    shader: Shaders.Pattern([
        '',
        '    hello,'.replace(/ /g, root.background),
        '    world!'.replace(/ /g, root.background)
    ], {
        repeatX: false,
        repeatY: false,
    }),
});
root.childNodes.push(text);

const invisibleText = new Node({
    visible: false,
    left: 0,
    top: 0,
    width: 30,
    height: 1,
    shader: Shaders.Pattern(['This should be invisible!'], {
        repeatX: false,
    }),
});
root.childNodes.push(invisibleText);

/**
 * @type {import('..').Shader}
 */
const shadowEffect = (x, y, current, buffer) => {
    if (
        !current
        && current !== CONTAINER_FILL
        && y > 0
        && x > 0
        && buffer[y - 1][x - 1] === CONTAINER_FILL
    ) {
        return '\\';
    } else {
        return current;
    }
};
root.effects.push(shadowEffect);

root.tick();

setTimeout(() => {
    text.shader = Shaders.Pattern([
        '',
        '    HELLO,'.replace(/ /g, root.background),
        '    WORLD!'.replace(/ /g, root.background)
    ], {
        repeatX: false,
        repeatY: false,
    });
    root.tick();
}, 1500);
