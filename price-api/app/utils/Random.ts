import Rand from "random-seed";

export default class Random {
  static boolean(seed?: string): boolean {
    const rand = Rand.create(seed)

    return rand.random() > 0.5
  }

  static number(seed?: string, min?: number, max?: number): number {
    const rand = Rand.create(seed)

    if (min && max) {
      const range = max - min

      return min + rand.range(range)
    }

    return rand.random()
  }
}
