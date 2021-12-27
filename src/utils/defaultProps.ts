// @ts-nocheck
import { Text, TextInput, StyleSheet } from 'react-native';

import { RFValue } from './normalize';

const setCustomText = customProps => {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    const oldProps = props;
    const style = StyleSheet.flatten([{}, customProps.style, props.style]);
    const fontSize = RFValue(style.fontSize ?? 14);
    style.fontSize = fontSize;
    props = { ...props, style };
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};

const setCustomTextInput = customProps => {
  const TextInputRender = TextInput.render;
  const initialDefaultProps = TextInput.defaultProps;
  TextInput.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  TextInput.render = function render(props) {
    const oldProps = props;
    const style = StyleSheet.flatten([{}, customProps.style, props.style]);
    const fontSize = RFValue(style.fontSize || 14);
    style.fontSize = fontSize;
    props = { ...props, style };
    try {
      return TextInputRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
};


const setDefaultsComponentsProps = () => {
  setCustomText({
    suppressHighlighting: true, // disable highlight text on press
    allowFontScaling: false, // disable scale font with system scaling
  });
  setCustomTextInput({
    allowFontScaling: false,
  });
};

export default setDefaultsComponentsProps();
