const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class Ellipse {
  public svg: SVGSVGElement;
  public r = 50;
  public color: string;
  public offset = 8;
  constructor(r: number, g: number, b: number, a: number) {
    const svgElement = document.createElementNS("svg", SVG_NAMESPACE);
    this.color = `rgba(${r},${g},${b},${a})`;
    if (svgElement instanceof SVGSVGElement) {
      this.svg = svgElement;
      this.svg.setAttribute("width", `${(this.r + this.offset) * 2}`);
      this.svg.setAttribute("height", `${(this.r + this.offset) * 2}`);
      this.svg.setAttribute(
        "viewBox",
        `0 0 ${(this.r + this.offset) * 2} ${(this.r + this.offset) * 2}`
      );
      this.svg.appendChild(
        this.createEllipse(
          `${this.r + this.offset}`,
          `${this.r + this.offset}`,
          `${this.r}`,
          `${this.r * 0.9}`,
          this.color,
          "0.9",
          "40s",
          "0"
        )
      );
      this.svg.appendChild(
        this.createEllipse(
          `${this.r + this.offset}`,
          `${this.r + this.offset}`,
          `${this.r}`,
          `${this.r * 0.95}`,
          this.color,
          "0.5",
          "24s",
          "13"
        )
      );
      this.svg.appendChild(
        this.createEllipse(
          `${this.r + this.offset}`,
          `${this.r + this.offset}`,
          `${this.r * 0.9}`,
          `${this.r}`,
          this.color,
          "0.4",
          "12s",
          "31"
        )
      );
      this.svg.appendChild(
        this.createEllipse(
          `${this.r + this.offset}`,
          `${this.r + this.offset}`,
          `${this.r * 0.95}`,
          `${this.r}`,
          this.color,
          "0.3",
          "32s",
          "57"
        )
      );
    } else {
    }
  }
  private createEllipse(
    cx: string,
    cy: string,
    rx: string,
    ry: string,
    strokeColor: string,
    opacity: string,
    duration: string,
    rotation: string,
    centerX: number = this.r + this.offset,
    centerY: number = this.r + this.offset
  ): SVGGElement {
    const g = document.createElementNS(SVG_NAMESPACE, "g") as SVGGElement;
    g.setAttribute("transform", `rotate(${rotation} ${centerX} ${centerY})`);

    const ellipse = document.createElementNS(
      SVG_NAMESPACE,
      "ellipse"
    ) as SVGEllipseElement;
    ellipse.setAttribute("cx", cx);
    ellipse.setAttribute("cy", cy);
    ellipse.setAttribute("rx", rx);
    ellipse.setAttribute("ry", ry);
    ellipse.setAttribute("stroke", strokeColor);
    ellipse.setAttribute("fill", "none");
    ellipse.setAttribute("stroke-width", "0.5");
    ellipse.setAttribute("opacity", opacity);
    console.log(`${cx} ; ${cy};${rx};${ry}`);

    const animateTransform = document.createElementNS(
      SVG_NAMESPACE,
      "animateTransform"
    ) as SVGAnimateTransformElement;
    animateTransform.setAttribute("attributeName", "transform");
    animateTransform.setAttribute("type", "rotate");
    animateTransform.setAttribute(
      "from",
      ` 0 ${centerX - this.offset} ${centerY - this.offset}`
    );
    animateTransform.setAttribute(
      "to",
      `360 ${centerX + this.offset} ${centerY + this.offset}`
    );
    animateTransform.setAttribute("dur", duration);
    animateTransform.setAttribute("repeatCount", "indefinite");

    ellipse.appendChild(animateTransform);
    g.appendChild(ellipse);

    return g;
  }
}
