export class Formula {
  public static calculateHypotenuse(width: number, height: number) {
    const powHypotenuse = Math.pow(width, 2) + Math.pow(height, 2);
    return Math.sqrt(powHypotenuse);
  }

  public static distanceBetweenPoints(
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) {
    const width = Math.abs(p2.x - p1.x);
    const height = Math.abs(p2.y - p1.y);
    return this.calculateHypotenuse(width, height);
  }
  public static AngleBetweenPoints(
    p1: { x: number; y: number },
    p2: { x: number; y: number }
  ) {
    const xDiff = p2.x - p1.x;
    const yDiff = p2.y - p1.y;
    const angleInRadians = Math.atan2(yDiff, xDiff); //-π ~ π;
    return angleInRadians * (180 / Math.PI); //-180 ~ 180;
  }
}
