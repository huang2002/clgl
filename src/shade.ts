import { Shader } from './Shaders';
import { OutputBuffer } from './Root';

/**
 * Shade the given area of the output buffer
 * @param output the output buffer
 * @param x0 the starting position (horizontally)
 * @param y0 the starting position (vertically)
 * @param width the width of the area
 * @param height the height of the area
 * @param shader the shader to use
 * @param fixedOrigin whether the origin should be fixed (see below)
 *
 * If `fixedOrigin`is `true`, the x/y position passed to
 * the shader will begin with zero, as if the shading starts
 * at a fixed position (0, 0); otherwise, the position will
 * begin with x0/y0, which is the actual starting point.
 * (The output position won't be affected anyway.)
 */
export const shade = (
    output: OutputBuffer,
    x0: number,
    y0: number,
    width: number,
    height: number,
    shader: Shader,
    fixedOrigin?: boolean,
) => {

    const bufferHeight = output.length,
        bufferWidth = output[0].length,
        cache = output.map(row => row.slice()); // copy

    for (let j = 0; j < height; j++) {

        const y = y0 + j;

        if (y < 0) {
            continue;
        } else if (y >= bufferHeight) {
            break;
        }

        for (let i = 0; i < width; i++) {

            const x = x0 + i;

            if (x < 0) {
                continue;
            } else if (x >= bufferWidth) {
                break;
            }

            output[y][x] = fixedOrigin
                ? shader(x, y, cache[y][x], cache)
                : shader(i, j, cache[y][x], cache);

        }

    }

};
