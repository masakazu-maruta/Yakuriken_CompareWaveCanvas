import { BackGradient } from "./BackGradient";
import { Color } from "../../util/color";

export class BackGradientElement extends HTMLElement {
  private backGradient: BackGradient;

  static get observedAttributes() {
    return ["color1", "color2"];
  }

  constructor() {
    super();
    this.backGradient = new BackGradient();
    this.initbackGradientSetting();
    this.backGradient.createSVG();
    const style = document.createElement("style");
    style.textContent = `
        :host{
            position : absolute;
            display:block;
        }
        svg {
            filter : blur(6em);
            height : 100%;
            width : 100%;
        }
    `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(this.backGradient.svg);
    this.shadowRoot?.appendChild(style);
  }
  private initbackGradientSetting() {
    const color1: Color = this.getColorAttribute("color1");
    const color2: Color = this.getColorAttribute("color2");
    this.backGradient.setColor1(
      `rgba(${color1.r},${color1.g},${color1.b},${color1.a})`
    );
    this.backGradient.setColor2(
      `rgba(${color2.r},${color2.g},${color2.b},${color2.a})`
    );
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
}
