import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"
import  { useTranslation } from '../../hook'
/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  const { language } = useTranslation()
  // grab the props
  const { preset = "default", tx, txOptions, text, children, style: styleOverride, ...rest } = props

  // figure out which content to use
  let i18nText = tx && translate(tx, txOptions)
  let content = i18nText || text || children

  const style = presets[preset] || presets.default
  const styles = [style, styleOverride]
  
  React.useEffect(() => {
    i18nText = tx && translate(tx, txOptions)
    content = i18nText || text || children
  },[language])

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
