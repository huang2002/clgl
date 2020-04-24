import { Node } from './Node';
import { WriteStream } from 'tty';

/**
 * The type of output buffer
 * (two-dimension arrays)
 */
export type OutputBuffer = (string | null | undefined)[][];
/** dts2md break */
export type RootOptions = Partial<{
    width: number;
    height: number;
    childNodes: Node[];
    background: string;
}>;
/** dts2md break */
/**
 * Root objects are used to contain `Node` instances
 * and render them to specific output.
 */
export class Root implements Required<RootOptions> {
    /** dts2md break */
    /**
     * Defaults of root options
     */
    static defaults: RootOptions = {
        /**
         * HACK: it seems that appending a line break('\n')
         * to the line which is already filled with charactors
         * will cause an extra line break visually, so here the
         * default size is one charactor smaller than the full one
         */
        width: (process.stdout.columns - 1) || 30,
        height: (process.stdout.rows - 1) || 20,
        background: ' ',
    };
    /** dts2md break */
    constructor(options?: Readonly<RootOptions>) {
        Object.assign(this, Root.defaults, options);
        if (!this.childNodes) {
            this.childNodes = [];
        }
        const { width } = this;
        this.buffer = Array.from({ length: this.height }, () => Array(width));
    }
    /** dts2md break */
    /**
     * The output buffer used by the root
     * (created internally)
     */
    readonly buffer: OutputBuffer;
    /** dts2md break */
    /**
     * The size of the root
     * (the size will affect the output buffer and
     * rendering boundary, so it can only be set
     * when creating the root object)
     */
    /**
     * @defaults (process.stdout.columns - 1) || 30
     */
    readonly width!: number;
    /**
     * @defaults (process.stdout.rows - 1) || 20
     */
    readonly height!: number;
    /** dts2md break */
    /**
     * The nodes to be rendered
     */
    childNodes!: Node[];
    /** dts2md break */
    /**
     * The background charactor
     * (falsy values in output buffer will be
     * finally rendered as background charactors)
     */
    background!: string;
    /** dts2md break */
    /**
     * Clear the buffer
     */
    clear() {
        const { buffer, width, height } = this;
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                buffer[j][i] = null;
            }
        }
    }
    /** dts2md break */
    /**
     * Compose the root
     * (that is, render all nodes to the output buffer)
     */
    compose() {
        const { buffer } = this;
        this.childNodes.forEach(node => {
            node.render(buffer);
        });
    }
    /** dts2md break */
    /**
     * Render the output buffer to the given output stream
     * @param output the output stream (default: process.stdout)
     * @param resetCursor whether to reset the cursor to (0, 0)
     * before rendering (default: true)
     */
    render(output = process.stdout, resetCursor = true) {
        if (resetCursor && output.cursorTo) {
            output.cursorTo(0, 0);
        }
        const { background } = this;
        this.buffer.forEach((row, i) => {
            if (i) { // i > 0
                output.write('\n');
            }
            row.forEach(char => {
                output.write(char || background);
            });
        });
    }
    /** dts2md break */
    /**
     * A utility method that invokes `clear()`, `compose()`
     * and `render()` in that order, with optional parameters
     * for `render()`. (In most cases, you just need to invoke
     * this method to update the buffer and output it)
     */
    tick(output?: WriteStream, resetCursor?: boolean) {
        this.clear();
        this.compose();
        this.render(output, resetCursor);
    }

}
