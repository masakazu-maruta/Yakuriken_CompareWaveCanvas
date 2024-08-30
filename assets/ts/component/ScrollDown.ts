export class ScrollDown {
  public div: HTMLElement;
  public a: HTMLElement;
  public fontSize: number;
  constructor(public color: string) {
    this.div = document.createElement("div");
    this.div.className = "scroll_down";
    this.a = document.createElement("a");
    this.a.textContent = "scroll";
    this.div.appendChild(this.a);
    this.fontSize = 0;
    this.handleResize();
    window.addEventListener("resize", () => this.handleResize);
  }

  handleResize(): void {
    const w: number = window.innerWidth; // ウィンドウの幅を取得
    if (w < 1280) {
      this.fontSize = 1.44;
    } else if (w <= 768) {
      this.fontSize = 1.6;
    } else if (w <= 420) {
      this.fontSize = 1.96;
    } else {
      this.fontSize = 0.72;
    }
    this.styleScrollDown(this.div);
    this.styleA(this.a);
    this.addScrolDownStyles();
  }

  styleScrollDown(element: HTMLElement) {
    element.style.position = "absolute";
    element.style.height = "16%";
    element.style.bottom = "4%";
    element.style.right = "8%";
  }
  styleA(element: HTMLElement) {
    element.style.position = "absolute";
    element.style.top = `${-this.fontSize * 5}vw`;
    element.style.color = this.color;
    element.style.fontSize = `${this.fontSize}vw`;
    element.style.fontFamily = "'Josefin Sans', sans-serif;";
    element.style.letterSpacing = ".2em";
    element.style.writingMode = "vertical-lr";
    element.style.textDecoration = "none";
    element.style.transform = "translateX(-50%)";
  }

  // script.js
  addScrolDownStyles() {
    // スタイルを追加するための <style> タグを作成
    const style = document.createElement("style");

    // スタイルの内容を定義
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&display=swap');

      .scroll_down::before {
        content: "";
        position: absolute;
        transform-origin : "center";
        bottom: 0;
        left : -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${this.color};
        animation:
          circlemove 2.4s linear infinite,
          cirlemovehide 2.4s ease-out infinite;
      }
      @keyframes circlemove {
        0% { bottom: 100%; }
        25% { bottom: 100%; }
        100% { bottom: 0px; }
      }
      @keyframes cirlemovehide {
        0% { opacity: 0; }
        25% { opacity: 0; }
        50% { opacity: 1; }
        80% { opacity: 0.8; }
        100% { opacity: 0; }
      }
      .scroll_down::after {
        content: "";
        position: absolute;
        bottom: 0;

        left: -0.5px;
        width: 1px;
        height: 100%;
        background: ${this.color};

      }
    `;

    // <style> タグを <head> に追加
    document.head.appendChild(style);
  }
}
