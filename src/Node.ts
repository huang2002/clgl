import { Shader } from './Shaders';
import { shade } from './shade';
import { OutputBuffer } from './Root';

export type NodeOptions = Partial<{
    visible: boolean;
    left: number;
    top: number;
    width: number;
    height: number;
    shader: Shader | null;
    fixedOrigin: boolean;
    childNodes: Node[];
}>;
/** dts2md break */
/**
 * CLGL uses nodes to manage graphic objects.
 * Each node has some properties indicating how
 * it should be rendered, such as its left/top
 * position and shader. (You will need a root
 * to contain your nodes and render them to
 * specific output, such as the console.)
 */
export class Node implements Required<NodeOptions> {
    /** dts2md break */
    /**
     * Defaults of node options
     */
    static defaults: NodeOptions = {
        visible: true,
        left: 0,
        top: 0,
        width: 1,
        height: 1,
        shader: null,
        fixedOrigin: false,
    };
    /** dts2md break */
    constructor(options?: Readonly<NodeOptions>) {
        Object.assign(this, Node.defaults, options);
        if (!this.childNodes) {
            this.childNodes = [];
        }
    }
    /** dts2md break */
    /**
     * Whether the node (and its child nodes) should be visible
     * @default true
     */
    visible!: boolean;
    /** dts2md break */
    /**
     * The offset of the node from the left of root
     * @default 0
     */
    left!: number;
    /** dts2md break */
    /**
     * Th offset of the node from the top of root
     * @default 0
     */
    top!: number;
    /** dts2md break */
    /**
     * The width of the node
     * @default 1
     */
    width!: number;
    /** dts2md break */
    /**
     * The height of the node
     * @default 1
     */
    height!: number;
    /** dts2md break */
    /**
     * The shader to use (built-in shader generator are
     * available under the `Shaders` namespace; nothing
     * will be rendered if this is set to `null`)
     * @default null
     */
    shader!: Shader | null;
    /** dts2md break */
    /**
     * Child nodes
     */
    childNodes!: Node[];
    /** dts2md break */
    /**
     * Whether the shading origin should be fixed
     * (see explanation section in shader docs)
     * @default false
     */
    fixedOrigin!: boolean;
    /** dts2md break */
    /**
     * Render the node to the output buffer
     * (this will be invoked automatically by roots)
     */
    render(output: OutputBuffer) {

        if (!this.visible) {
            return;
        }

        const { shader } = this;
        if (!shader) {
            return;
        }

        const { left, top } = this;

        shade(
            output,
            left,
            top,
            this.width,
            this.height,
            shader,
            this.fixedOrigin,
        );

        this.childNodes.forEach(node => {
            node.render(output);
        });

    }

}
