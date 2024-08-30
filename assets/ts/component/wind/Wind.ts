export class Wind {
  public readonly canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private mainColor: string = "";
  private fadeColor: string = "";
  private lineWidth: number = 0;
  private frequency: number = 0;
  private shift: number = 0;
  private currentTime: number = 0;
  private createTime: number;
  private animationId: number | null = null;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;
    this.createTime = Date.now();
    this.startAnimation();
  }
  /* 風を描画 */
  drawWind() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.strokeStyle = this.coloring();
    for (let i = 0; i < this.canvas.width; i++) {
      const y: number = this.getYByX(i);
      this.context.lineTo(i, y);
    }
    this.context.stroke();
  }
  /* 色を付ける関数 */
  public coloring(): CanvasGradient {
    const destination = this.canvas.clientWidth;
    const gradient = this.context.createLinearGradient(0, 0, destination, 0);
    const time_s = (Date.now() - this.createTime) / 1000;
    const ratio =
      (((destination * time_s) / 8) % (destination * 1.3)) / destination;
    gradient.addColorStop(
      Math.min(Math.max(ratio - 0.3, 0), 1),
      this.fadeColor
    );
    gradient.addColorStop(
      Math.min(Math.max(ratio - 0.15, 0), 1),
      this.mainColor
    );
    gradient.addColorStop(Math.min(Math.max(ratio, 0), 1), this.fadeColor);
    return gradient;
  }
  /* idを利用してアニメーションを管理、currentTimeを使う
  /* HACK : currentTime周りはもっとうまくやれそう */
  private startAnimation() {
    this.stopAnimation(); // 既存のアニメーションがあれば停止
    const animate = (currentTime) => {
      this.currentTime = currentTime;
      this.drawWind();
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  }
  /* アニメーションIDをnullにしてストップ */
  public stopAnimation() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  /* 波の高さを返す関数 */
  public getYByX(x: number): number {
    const phase = Math.PI * 2 * this.frequency * (x / this.canvas.width);
    const theta = phase + this.shift;
    return this.getAmplitude() * Math.sin(theta) + this.canvas.clientHeight / 2;
  }

  /* 波の線の真ん中をTransformOriginとするので、高さの半分から線の太さの半分を引く */
  public getAmplitude(): number {
    return this.canvas.clientHeight / 2 - this.lineWidth / 2;
  }

  /* 周波数をセット　画面に現れる周期の数 */
  public setFrequency(frequency: number) {
    this.frequency = frequency;
  }

  /* 波のズレをセット */
  public setShift(shift: number) {
    this.shift = shift;
  }
  /* 波の線の太さをセット */
  public setLineWidth(lineWidth: number) {
    this.context.lineWidth = lineWidth;
    this.lineWidth = lineWidth;
  }
  public setMainColor(r: number, g: number, b: number, a: number) {
    this.mainColor = `rgba(${r},${g},${b},${a})`;
  }
  public setFadeColor(r: number, g: number, b: number, a: number) {
    this.fadeColor = `rgba(${r},${g},${b},${a})`;
  }

  /* WARNING : 波の色が黒くなってしまうときはこれが原因かも
  /* 波を最適化　
  /* スケールが変わった直後にやる　
  /* 色変更などのあとにやると初期化されてしまうのでやらないでください */
  public optimazeContext() {
    this.canvas.height = this.canvas.clientHeight * devicePixelRatio;
    this.canvas.width = this.canvas.clientWidth * devicePixelRatio;
    /* FIXME : 波が塗りつぶされてしまう原因？ */
    this.context.scale(devicePixelRatio, devicePixelRatio);
  }
}
