import Vue from 'vue'
import VueI18n from 'vue-i18n'

// User defined lang
import enLocale from './en'
import zhLocale from './fr'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
    },
    fr: {
        ...zhLocale,
    },
}

function getLang() {
    if (navigator.languages != undefined)
        return navigator.languages[0];
    else
        return navigator.language;
}

const i18n = new VueI18n({
    locale: getLang(),
    messages
})

export default i18n
