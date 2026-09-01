// id-երի mapping՝ մեկ translation key մի քանի HTML id-ի վրա կիրառելու համար
const idMap = {
    about: ["about", "about2", "about3"],
    contact: ["contact", "contact2", "contact3"],
};

function changeLanguage(lang) {
    // save selected language
    localStorage.setItem("selectedLanguage", lang);

    const languageNames = {
        hy: "Հայ",
        en: "Eng",
        ru: "Рус",
    };

    // helper function
    function setText(id, value, isHTML = false) {
        const element = document.getElementById(id);
        if (element && value !== undefined) {
            if (isHTML) {
                element.innerHTML = value;
            } else {
                element.innerText = value;
            }
        }
    }

    // language button(s)
    const currentLangs = document.querySelectorAll(".currentLang");
    currentLangs.forEach(btn => {
        btn.innerHTML = `${languageNames[lang]}`;
    });

    // meta description — թարմացվում է դինամիկ (օգտակար է share-երի համար,
    // թեև crawler-ները սովորաբար կարդում են page load-ի պահին եղած default արժեքը)
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && translations[lang].description) {
        metaDescription.setAttribute("content", translations[lang].description);
    }

    // page title — թարմացվում է դինամիկ (browser tab-ում, bookmark-ներում)
    if (translations[lang].pageTitle) {
        document.title = translations[lang].pageTitle;
    }

    // html lang attribute-ը թարմացնում ենք ևս, օգտակար է accessibility/SEO-ի համար
    document.documentElement.setAttribute("lang", lang);

    // menu — կրկնվող id-երը (about/about2/about3, contact/contact2/contact3)
    Object.entries(idMap).forEach(([key, ids]) => {
        ids.forEach(id => setText(id, translations[lang][key]));
    });

    // index page
    setText("title", translations[lang].title);
    setText("subtitle", translations[lang].subtitle);

    setText("aboutUsText", translations[lang].aboutUsText, true);

    setText("mission", translations[lang].mission);
    setText("missionText", translations[lang].missionText);

    setText("vision", translations[lang].vision);
    setText("visionText", translations[lang].visionText, true);

    setText("address", translations[lang].address);
}

// load saved language on page open
document.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "hy";
    changeLanguage(savedLanguage);
});