import { Platform } from 'react-native'
import _ActionSheetIOS from './ActionSheet.ios'
import _ActionSheetCustom from './ActionSheet.android'

export const ActionSheetCustom = _ActionSheetCustom

let ActionSheet

if (Platform.OS === 'ios') {
  ActionSheet = _ActionSheetIOS
} else {
  ActionSheet = _ActionSheetCustom
}


export default ActionSheet;