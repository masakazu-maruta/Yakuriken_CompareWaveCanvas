export class Wave {
  public readonly canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private color: string = "";
  private lineWidth: number = 0;
  private frequency: number = 0;
  private shift: number = 0;
  private speed: number = 0;
  private currentTime: number = 0;
  private createTime: number;
  private animationId: number | null = null;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;
    this.createTime = Date.now();
    this.startAnimation();
  }

  /* 時間差をつかって波を描画 */
  /* XXX : optimizeContextを最初に呼ぶ理由がわかっていない */
  public drawWave() {
    this.optimizeContext();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    this.context.clearRect(
      0,
      0,
      this.canvas.clientWidth,
      this.canvas.clientHeight
    );
    this.context.beginPath();
    const firstY = this.getYByX(0);
    this.context.moveTo(0, firstY);
    for (let i = 0; i < this.canvas.clientWidth; i++) {
      const y = this.getYByX(i);
      this.context.lineTo(i, y);
    }
    this.context.stroke();
  }

  /* idを利用してアニメーションを管理、currentTimeを使う
  /* HACK : currentTime周りはもっとうまくやれそう */
  private startAnimation() {
    this.stopAnimation();
    const animate = (currentTime) => {
      this.currentTime = currentTime;
      this.drawWave();
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

  /* 波の高さを返す関数　時間の情報を使って波をずらす */
  public getYByX(x: number): number {
    const phase = this.frequency * Math.PI * 2 * (x / this.canvas.clientWidth);
    const speedEffect =
      (-this.speed * (this.currentTime - this.createTime)) / 1000;
    const theta = phase + speedEffect + this.shift;
    const centerOffset = this.canvas.clientHeight / 2;
    return this.getAmplitude() * Math.sin(theta) + centerOffset;
  }
  /* 波の線の真ん中をTransformOriginとするので、高さの半分から線の太さの半分を引く */
  public getAmplitude(): number {
    //１は外周にかさならないようにするための数値
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
  /* 波のスピードをセット */
  public setSpeed(speed: number) {
    this.speed = speed;
  }
  /* 波の線の太さをセット */
  public setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }
  /* 波の色をセット */
  public setColor(r: number, g: number, b: number, a: number) {
    this.color = `rgba(${r},${g},${b},${a})`;
  }

  /* WARNING : 波の色が黒くなってしまうときはこれが原因かも
  /* 波を最適化　
  /* スケールが変わった直後にやる　
  /* 色変更などのあとにやると初期化されてしまうのでやらないでください */
  public optimizeContext() {
    const dpr = devicePixelRatio * 2 || 1;
    this.canvas.height = this.canvas.clientHeight * dpr;
    this.canvas.width = this.canvas.clientWidth * dpr;
    /* XXX : draw関数で毎回呼び出すと直る */
    this.context.scale(dpr, dpr);
  }
}
