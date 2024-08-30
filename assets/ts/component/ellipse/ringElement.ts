import { Ring } from "./Ring";
import { Color } from "../../util/color";
interface Transform {
  x: number;
  y: number;
}
export class RingElement extends HTMLElement {
  private ring: Ring;
  private width: number;
  private height: number;

  /* 属性値の種類 */
  static get obsedrvedAttributes() {
    return ["line-width", "move-range", "number", "color"];
  }

  /* RingSvgとスタイルを適用して子要素にする */
  /* WARNING : superのコンストラクタは必ず最初に呼ぶ */
  constructor() {
    super();
    this.ring = new Ring();
    this.initRingSetting();
    const style = document.createElement("style");
    style.textContent = `
    :host {
        position : absolute;
        display : block;
        overflow:hidden;
        }
        svg {
            display : block;
            height : 100%;
            width : 100%;
        }
            `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(this.ring.svg);
    this.shadowRoot?.appendChild(style);
    this.ring.createRings();
  }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    console.log(`Attribute changed: ${name} from ${oldValue} to ${newValue}`);
  }

  private initRingSetting() {
    const lineWidth: number = this.getFloatAttribute("line-width");
    const moveRange: number = this.getFloatAttribute("move-range");
    const numberRing: number = this.getFloatAttribute("number");
    const color: Color = this.getColorAttribute("color");
    this.ring.setLineWidth(lineWidth);
    this.ring.setMoveRange(moveRange);
    this.ring.setNumberRing(numberRing);
    this.ring.setColor(`rgba(${color.r},${color.g},${color.b},${color.a})`);
  }

  /* 実数の属性をゲット */
  private getFloatAttribute(value: string): number {
    return parseFloat(this.getAttribute(value) || "0");
  }
  /* 色の属性をゲット */
  private getColorAttribute(value: string): Color {
    // 要素の "color" 属性を取得
    const color = this.getAttribute(value);
    // 色の属性が存在する場合
    if (color) {
      // 色の値をカンマで分割して配列に変換
      const parts = color.split(",").map((part) => {
        const num = Number(part);
        return !isNaN(num) ? num : null; // 数値に変換できなければ null を返す
      });

      // 色の成分がすべて数値であることを確認
      const [r, g, b, a] = parts;
      if (r !== null && g !== null && b !== null && a !== null) {
        // Color オブジェクトを作成し、返す
        return new Color(r, g, b, a);
      }
    }
    // 色の属性が存在しないか、無効な値の場合は 白 を返す
    return new Color(255, 255, 255, 1);
  }
  /* REVIEW : さらに疎結合にできる余地あり*/
  /* 回転に合わせて、左端をx1,y1の座標に移動する */
  public setTransform(node: Transform) {
    this.style.left = `${node.x}px`;
    this.style.top = `${node.y}px`;
  }
  /* 横幅を変数とスタイルにセット */
  public setWidth(width: number) {
    this.width = width;
    this.style.width = `${width}px`;
  }
  /* 高さを変数とスタイルにセット */
  public setHeight(height: number) {
    this.height = height;
    this.style.height = `${height}px`;
  }
}
