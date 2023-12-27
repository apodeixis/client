import { createI18n } from 'vue-i18n';
import ua from './ua';
import en from './en';


const i18n = createI18n({
    locale: 'en',
    messages: {
        ua,
        en
    }
})

export default i18n;