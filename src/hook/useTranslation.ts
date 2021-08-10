import React, { useCallback } from 'react';
import { switchLanguage } from '../i18n/i18n';
let currentLanguage = 'vn';
type lang = 'vn' | 'en' 
export const useTranslation = () => {
  const [language, setLang] = React.useState<lang>(currentLanguage as lang);


  const setLanguage = useCallback((locale: lang) => {
    if(language == 'en') {
        switchLanguage('vn')
        setLang('vn')
    }else {
        switchLanguage('en')
        setLang('en')
    }
  },[language])
  return { language, setLanguage };
};