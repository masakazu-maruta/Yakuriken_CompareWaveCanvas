import { BackGradientElement } from "./component/backGradient/backGradientElement";
import { RingElement } from "./component/ellipse/ringElement";
import { WaveElement } from "./component/wave/waveElement";
import { WindElement } from "./component/wind/windElement";

customElements.define("custom-wave", WaveElement);
customElements.define("custom-wind", WindElement);
customElements.define("custom-ring", RingElement);
customElements.define("custom-back-gradient", BackGradientElement);
