import { init } from "@paralleldrive/cuid2"

export const createId = (length?: number) => {
  return init({
    length: length ?? 10,
    fingerprint: "dosya-"
  })();
}