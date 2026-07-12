(function () {
  "use strict";

  const LANGUAGE_KEY = "edu-ebook-reader:language";
  const TRANSLATIONS = {
    en: {
      languageLabel: "Language",
      installTitle: "Install the application on your device",
      installSubtitle: "Open educational books and notes locally, with basic safety, an offline app shell and support for mobile, tablet and desktop use.",
      installButton: "Install application",
      openWithoutInstall: "Open without installing",
      installInfo: "Installation information",
      androidStep1: "Press “Install application”.",
      androidStep2: "In the prompt, press Install.",
      androidStep3: "Open Edu Ebook Reader from the new icon on the home screen.",
      androidStep4: "If no prompt appears, open the Chrome menu and choose Add to Home screen or Install app.",
      iosStep1: "Open the page in Safari.",
      iosStep2: "Tap the Share button.",
      iosStep3: "Choose Add to Home Screen.",
      iosStep4: "Tap Add to place the icon on the home screen.",
      desktopTitle: "Desktop",
      desktopStep1: "Open the page with Chrome or Edge.",
      desktopStep2: "Press “Install application”.",
      desktopStep3: "If no prompt appears, use the install icon in the address bar or the browser menu.",
      desktopStep4: "After installation, open the app from the Start Menu, Dock or desktop.",
      authorTitle: "Author",
      swError: "The offline app shell could not be enabled in this environment.",
      installedButton: "Application installed",
      installedStatus: "You can open Edu Ebook Reader from the device icon.",
      iosButton: "iPhone / iPad instructions",
      iosStatus: "Safari: Share → Add to Home Screen. Then it opens like an app from the home screen.",
      fileButton: "Open from online link",
      fileStatus: "Installation works when the page is opened from the application online link, not from a local file.",
      defaultStatus: "Press the install button. If no prompt appears, use the instructions for your device.",
      promptReadyButton: "Install application",
      promptReadyStatus: "The app is ready to install on this device.",
      appInstalledButton: "Installed",
      appInstalledStatus: "Installation completed.",
      acceptedStatus: "Installation started.",
      dismissedStatus: "Installation cancelled.",
      iosClickStatus: "On iPhone/iPad: tap Share, then Add to Home Screen.",
      fileClickStatus: "Open the app from the online link you were given, then press install again.",
      fallbackStatus: "Android/Chrome: menu → Add to Home screen. Desktop/Chrome or Edge: menu → Install app."
    },
    el: {
      languageLabel: "Γλώσσα",
      installTitle: "Εγκατάσταση της εφαρμογής στη συσκευή",
      installSubtitle: "Ανοίγει εκπαιδευτικά βιβλία και σημειώσεις τοπικά, με βασική ασφάλεια, offline app shell και υποστήριξη για κινητό, tablet και υπολογιστή.",
      installButton: "Εγκατάσταση εφαρμογής",
      openWithoutInstall: "Άνοιγμα χωρίς εγκατάσταση",
      installInfo: "Πληροφορίες εγκατάστασης",
      androidStep1: "Πάτησε “Εγκατάσταση εφαρμογής”.",
      androidStep2: "Στο παράθυρο που θα εμφανιστεί, πάτησε Install ή Εγκατάσταση.",
      androidStep3: "Άνοιξε το Edu Ebook Reader από το νέο εικονίδιο στην αρχική οθόνη.",
      androidStep4: "Αν δεν εμφανιστεί παράθυρο, άνοιξε το μενού του Chrome και πάτησε Add to Home screen ή Install app.",
      iosStep1: "Άνοιξε τη σελίδα με Safari.",
      iosStep2: "Πάτησε το κουμπί Share.",
      iosStep3: "Διάλεξε Add to Home Screen.",
      iosStep4: "Πάτησε Add για να εμφανιστεί το εικονίδιο στην αρχική οθόνη.",
      desktopTitle: "Υπολογιστής",
      desktopStep1: "Άνοιξε τη σελίδα με Chrome ή Edge.",
      desktopStep2: "Πάτησε “Εγκατάσταση εφαρμογής”.",
      desktopStep3: "Αν δεν εμφανιστεί παράθυρο, πάτησε το εικονίδιο εγκατάστασης στη γραμμή διεύθυνσης ή το μενού του browser.",
      desktopStep4: "Μετά την εγκατάσταση, άνοιξε την εφαρμογή από το Start Menu, το Dock ή την επιφάνεια εργασίας.",
      authorTitle: "Δημιουργός",
      swError: "Το offline app shell δεν ενεργοποιήθηκε σε αυτό το περιβάλλον.",
      installedButton: "Η εφαρμογή είναι εγκατεστημένη",
      installedStatus: "Μπορείς να ανοίγεις το Edu Ebook Reader από το εικονίδιο της συσκευής.",
      iosButton: "Οδηγίες για iPhone / iPad",
      iosStatus: "Safari: Share → Add to Home Screen. Μετά ανοίγει σαν εφαρμογή από την αρχική οθόνη.",
      fileButton: "Άνοιγμα από online link",
      fileStatus: "Η εγκατάσταση λειτουργεί όταν η σελίδα ανοίγει από το online link της εφαρμογής, όχι από τοπικό αρχείο.",
      defaultStatus: "Πάτησε το κουμπί εγκατάστασης. Αν δεν εμφανιστεί παράθυρο, χρησιμοποίησε τις οδηγίες για τη συσκευή σου.",
      promptReadyButton: "Εγκατάσταση εφαρμογής",
      promptReadyStatus: "Η εφαρμογή είναι έτοιμη για εγκατάσταση σε αυτή τη συσκευή.",
      appInstalledButton: "Εγκαταστάθηκε",
      appInstalledStatus: "Η εγκατάσταση ολοκληρώθηκε.",
      acceptedStatus: "Η εγκατάσταση ξεκίνησε.",
      dismissedStatus: "Η εγκατάσταση ακυρώθηκε.",
      iosClickStatus: "Σε iPhone/iPad: πάτησε Share και μετά Add to Home Screen.",
      fileClickStatus: "Άνοιξε την εφαρμογή από το online link που σου έχει δοθεί και ξαναπάτησε εγκατάσταση.",
      fallbackStatus: "Android/Chrome: μενού → Add to Home screen. Υπολογιστής/Chrome ή Edge: μενού → Install app."
    }
  };

  let deferredInstallPrompt = null;
  let language = loadLanguage();

  const installButton = document.getElementById("installAppButton");
  const languageSelect = document.getElementById("installLanguageSelect");
  const status = document.getElementById("installStatus");

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);

  languageSelect.addEventListener("change", () => {
    language = languageSelect.value === "el" ? "el" : "en";
    saveLanguage();
    applyTranslations();
    setInitialInstallState();
  });

  applyTranslations();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      setStatus(t("swError"));
    });
  }

  setInitialInstallState();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installButton.disabled = false;
    installButton.textContent = t("promptReadyButton");
    setStatus(t("promptReadyStatus"));
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    installButton.disabled = true;
    installButton.textContent = t("appInstalledButton");
    setStatus(t("appInstalledStatus"));
  });

  installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const result = await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      setStatus(result.outcome === "accepted" ? t("acceptedStatus") : t("dismissedStatus"));
      return;
    }

    if (isIos) {
      setStatus(t("iosClickStatus"));
      return;
    }

    if (location.protocol === "file:") {
      setStatus(t("fileClickStatus"));
      return;
    }

    setStatus(t("fallbackStatus"));
  });

  function setInitialInstallState() {
    if (isStandalone) {
      installButton.textContent = t("installedButton");
      installButton.disabled = true;
      setStatus(t("installedStatus"));
    } else if (isIos) {
      installButton.textContent = t("iosButton");
      installButton.disabled = false;
      setStatus(t("iosStatus"));
    } else if (location.protocol === "file:") {
      installButton.textContent = t("fileButton");
      installButton.disabled = false;
      setStatus(t("fileStatus"));
    } else {
      installButton.textContent = t("installButton");
      installButton.disabled = false;
      setStatus(t("defaultStatus"));
    }
  }

  function loadLanguage() {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      return saved === "el" ? "el" : "en";
    } catch (_) {
      return "en";
    }
  }

  function saveLanguage() {
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch (_) {
      // Language still applies for this session.
    }
  }

  function t(key) {
    return (TRANSLATIONS[language] && TRANSLATIONS[language][key]) || TRANSLATIONS.en[key] || key;
  }

  function applyTranslations() {
    languageSelect.value = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
  }

  function setStatus(message) {
    status.textContent = message;
  }
})();
