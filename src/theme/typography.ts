import { Platform } from "react-native"

export const typography = {

  primary: Platform.select({ ios: "Helvetica", android: "normal" }),

  secondary: Platform.select({ ios: "Arial", android: "sans-serif" }),

  code: Platform.select({ ios: "Courier", android: "monospace" }),
}
