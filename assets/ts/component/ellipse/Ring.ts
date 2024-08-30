const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class Ring {
  public readonly svg: SVGSVGElement;
  private numberRing: number;
  private moveRange: number;
  private lineWidth: number;
  private color: string;
  public radius = 50;
  constructor() {
    this.svg = document.createElementNS(SVG_NAMESPACE, "svg") as SVGSVGElement;
    this.svg.setAttribute(
      "viewBox",
      `${-this.radius} ${-this.radius} ${this.radius * 2} ${this.radius * 2}`
    );
  }

  public createRings() {
    for (let i = 0; i < this.numberRing; i++) {
      const ratio = i / (this.numberRing * 2);
      const g = this.createEllipse(
        this.radius * 0.9,
        this.radius,
        1 - ratio,
        ratio * 64,
        ratio * 90
      );
      this.svg.appendChild(g);
    }
  }
  private createEllipse(
    rx: number,
    ry: number,
    opacity: number,
    durationSec: number,
    rotation: number
  ): SVGGElement {
    const r = 0;
    const g = document.createElementNS(SVG_NAMESPACE, "g") as SVGGElement;
    const ellipse = document.createElementNS(
      SVG_NAMESPACE,
      "ellipse"
    ) as SVGEllipseElement;
    ellipse.setAttribute("cx", `${r}`);
    ellipse.setAttribute("cy", `${r}`);
    ellipse.setAttribute("rx", `${rx}`);
    ellipse.setAttribute("ry", `${ry}`);
    ellipse.setAttribute("stroke-width", `${this.lineWidth}`);
    ellipse.setAttribute("stroke", this.color);
    ellipse.setAttribute("opacity", `${opacity}`);
    ellipse.setAttribute("fill", "none");

    const animateTransform = document.createElementNS(
      SVG_NAMESPACE,
      "animateTransform"
    ) as SVGAnimateTransformElement;
    animateTransform.setAttribute("attributeName", "transform");
    animateTransform.setAttribute("type", "rotate");
    animateTransform.setAttribute("from", `${rotation} ${r} ${r}`);
    animateTransform.setAttribute("to", `${rotation + 360} ${r} ${r}`);
    animateTransform.setAttribute("dur", `${durationSec}`);
    animateTransform.setAttribute("repeatCount", "indefinite");

    ellipse.appendChild(animateTransform);
    g.appendChild(ellipse);

    return g;
  }

  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  public setNumberRing(numberRing: number) {
    this.numberRing = numberRing;
  }

  public setMoveRange(moveRange: number) {
    this.moveRange = moveRange;
  }

  public setColor(color: string) {
    this.color = color;
  }
}
