(function () {
  "use strict";

  const MAX_BYTES = {
    epub: 250 * 1024 * 1024,
    pdf: 150 * 1024 * 1024,
    text: 20 * 1024 * 1024,
    markdown: 20 * 1024 * 1024,
    html: 20 * 1024 * 1024,
    docx: 80 * 1024 * 1024,
    odt: 80 * 1024 * 1024,
    fb2: 40 * 1024 * 1024,
    cbz: 250 * 1024 * 1024
  };
  const EPUB_SOURCE = "edu-ebook-reader";
  const ACCESSIBILITY_KEY = "edu-ebook-reader:accessibility";
  const LEARNING_KEY_PREFIX = "edu-ebook-reader:learning:";
  const ACCESSIBILITY_DEFAULTS = {
    fontScale: 1,
    theme: "paper",
    fontFamily: "system",
    lineHeight: 1.65,
    textWidth: "normal",
    letterSpacing: false,
    reduceMotion: false
  };
  const FONT_STACKS = {
    system: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    readable: "Verdana, Atkinson Hyperlegible, Arial, sans-serif",
    serif: "Georgia, \"Times New Roman\", serif",
    mono: "ui-monospace, SFMono-Regular, Consolas, \"Liberation Mono\", monospace"
  };
  const TEXT_WIDTHS = {
    narrow: "62ch",
    normal: "76ch",
    wide: "96ch"
  };
  const THEMES = ["paper", "sepia", "night", "highContrast"];
  const LANGUAGE_KEY = "edu-ebook-reader:language";
  const SUPPORTED_LANGUAGES = ["en", "el"];
  const TRANSLATIONS = {
    en: {
      bookPanel: "Book panel",
      previous: "Previous",
      next: "Next",
      smallerText: "Smaller text",
      largerText: "Larger text",
      readingTheme: "Reading theme",
      languageLabel: "Language",
      fileButton: "File",
      installApp: "Install",
      contentsTitle: "Contents",
      searchLabel: "Search",
      searchPlaceholder: "Term...",
      accessibilityTitle: "Accessibility",
      fontSizeLabel: "Text size",
      themeLabel: "Reading theme",
      themePaper: "Default",
      themeSepia: "Sepia",
      themeNight: "Night",
      themeHighContrast: "High contrast",
      fontFamilyLabel: "Font",
      fontSystem: "System",
      fontReadable: "Readable",
      fontSerif: "Book serif",
      fontMono: "Monospace",
      lineHeightLabel: "Line spacing",
      textWidthLabel: "Text width",
      widthNarrow: "Narrow",
      widthNormal: "Normal",
      widthWide: "Wide",
      letterSpacingLabel: "Increase letter spacing",
      reduceMotionLabel: "Reduce motion",
      readAloudButton: "Read aloud",
      stopButton: "Stop",
      securityTitle: "Security",
      securityLocal: "Local file",
      securitySandbox: "Sandbox",
      securityNetwork: "External network blocked in EPUB sandbox",
      securityDrm: "Does not bypass DRM",
      drmBlocked: "This EPUB appears to use DRM or encrypted resources. This reader does not bypass DRM; open it with an authorized reader, or use an unprotected file you have the right to use.",
      authorTitle: "Author",
      readerArea: "EPUB reading area",
      emptyTitle: "Educational reading on every screen",
      emptySubtitle: "Open local EPUB 3, PDF, TXT, Markdown, HTML, DOCX, ODT, FB2 or CBZ files for teaching, studio work and independent study.",
      openFile: "Open file",
      featuresLabel: "Features",
      chipMobile: "Mobile",
      chipDesktop: "Desktop",
      epubContent: "EPUB content",
      pdfPage: "PDF page",
      readingNavigation: "Reading navigation",
      backButton: "Back",
      forwardButton: "Forward",
      noBook: "No book loaded",
      unsupportedFile: "Supported files: EPUB, PDF, TXT, Markdown, HTML, DOCX, ODT, FB2 and CBZ.",
      fileTooLarge: "{format} is too large for this prototype.",
      openingFile: "Opening {format}...",
      fileOpened: "{format} opened locally.",
      openError: "I could not open this file.",
      serviceWorkerError: "The offline app shell could not be enabled in this environment.",
      pdfNoPages: "The PDF has no pages.",
      pdfIndexing: "Building PDF search index...",
      textLabel: "Plain text",
      markdownLabel: "Markdown text",
      htmlLabel: "HTML file",
      docxLabel: "DOCX text",
      odtLabel: "ODT text",
      fb2Book: "FB2 book",
      fb2Label: "FB2 text",
      cbzNoImages: "The CBZ file contains no images.",
      pageLabel: "Page {number}",
      morePages: "... {number} more pages",
      chapterLabel: "Chapter {number}",
      textResultLabel: "Text",
      searchMin: "Type at least 2 characters.",
      searchEmpty: "No results found.",
      chapterMissing: "This chapter is missing from the EPUB.",
      containerMissing: "META-INF/container.xml was not found.",
      packageMissing: "Package document was not found.",
      packageFileMissing: "The package document is missing from the EPUB.",
      epubBook: "EPUB book",
      epubNoChapters: "The EPUB has no readable chapters.",
      emptyReadableText: "This file does not contain readable text.",
      sandboxRuntimeError: "The book ran a script with an error inside the sandbox.",
      externalBlocked: "External link blocked.",
      linkNoChapter: "This link does not match an EPUB chapter.",
      speechUnsupported: "This browser does not support read aloud.",
      speechNoText: "No readable text was found on this page.",
      invalidXml: "The file contains invalid XML.",
      markdownLinkBlocked: "Links are blocked in local Markdown",
      learningTitle: "My learning",
      learningEmpty: "Open a book to keep local progress.",
      learningProgress: "Visited {visited} of {total} sections ({percent}%).",
      addBookmark: "Add bookmark",
      bookmarkAdded: "Bookmark saved locally.",
      bookmarkExists: "This location is already bookmarked.",
      bookmarksTitle: "Bookmarks",
      bookmarksEmpty: "No bookmarks yet.",
      noteLabel: "Note for this page",
      notePlaceholder: "Write a local note...",
      saveNote: "Save note",
      noteAdded: "Note saved locally.",
      noteEmpty: "Write a note first.",
      notesEmpty: "No notes yet.",
      deleteLearningItem: "Delete",
      exportLearning: "Export notes",
      learningExported: "Bookmarks and notes exported locally.",
      chapterLocation: "Chapter {number}",
      pageLocation: "Page {number}",
      documentLocation: "Document",
      fallbackBookTitle: "Book"
    },
    el: {
      bookPanel: "Πίνακας βιβλίου",
      previous: "Προηγούμενο",
      next: "Επόμενο",
      smallerText: "Μικρότερα γράμματα",
      largerText: "Μεγαλύτερα γράμματα",
      readingTheme: "Θέμα ανάγνωσης",
      languageLabel: "Γλώσσα",
      fileButton: "Αρχείο",
      installApp: "Εγκατάσταση",
      contentsTitle: "Περιεχόμενα",
      searchLabel: "Αναζήτηση",
      searchPlaceholder: "Όρος...",
      accessibilityTitle: "Προσβασιμότητα",
      fontSizeLabel: "Μέγεθος γραμμάτων",
      themeLabel: "Θέμα ανάγνωσης",
      themePaper: "Κανονικό",
      themeSepia: "Σέπια",
      themeNight: "Νύχτα",
      themeHighContrast: "Υψηλή αντίθεση",
      fontFamilyLabel: "Γραμματοσειρά",
      fontSystem: "Συστήματος",
      fontReadable: "Ευανάγνωστη",
      fontSerif: "Βιβλίου",
      fontMono: "Σταθερού πλάτους",
      lineHeightLabel: "Διάστιχο",
      textWidthLabel: "Πλάτος κειμένου",
      widthNarrow: "Στενό",
      widthNormal: "Κανονικό",
      widthWide: "Πλατύ",
      letterSpacingLabel: "Περισσότερη απόσταση στα γράμματα",
      reduceMotionLabel: "Μειωμένη κίνηση",
      readAloudButton: "Ανάγνωση φωναχτά",
      stopButton: "Στοπ",
      securityTitle: "Ασφάλεια",
      securityLocal: "Τοπικό αρχείο",
      securitySandbox: "Sandbox",
      securityNetwork: "Χωρίς εξωτερικό δίκτυο στο sandbox του EPUB",
      securityDrm: "Δεν παρακάμπτει DRM",
      drmBlocked: "Αυτό το EPUB φαίνεται να χρησιμοποιεί DRM ή κρυπτογραφημένους πόρους. Ο reader δεν παρακάμπτει DRM· άνοιξέ το με εξουσιοδοτημένο reader ή χρησιμοποίησε μη προστατευμένο αρχείο που έχεις δικαίωμα να χρησιμοποιήσεις.",
      authorTitle: "Στοιχεία",
      readerArea: "Περιοχή ανάγνωσης EPUB",
      emptyTitle: "Βιβλία και σημειώσεις σε κάθε οθόνη",
      emptySubtitle: "Άνοιγμα τοπικού EPUB 3, PDF, TXT, Markdown, HTML, DOCX, ODT, FB2 ή CBZ για μάθημα, εργαστήριο ή ατομική μελέτη.",
      openFile: "Άνοιγμα αρχείου",
      featuresLabel: "Χαρακτηριστικά",
      chipMobile: "Κινητό",
      chipDesktop: "Υπολογιστής",
      epubContent: "Περιεχόμενο EPUB",
      pdfPage: "Σελίδα PDF",
      readingNavigation: "Πλοήγηση ανάγνωσης",
      backButton: "Πίσω",
      forwardButton: "Μπροστά",
      noBook: "Χωρίς βιβλίο",
      unsupportedFile: "Υποστηρίζονται EPUB, PDF, TXT, Markdown, HTML, DOCX, ODT, FB2 και CBZ.",
      fileTooLarge: "Το {format} είναι πολύ μεγάλο για αυτό το prototype.",
      openingFile: "Άνοιγμα {format}...",
      fileOpened: "{format} άνοιξε τοπικά.",
      openError: "Δεν μπόρεσα να ανοίξω το αρχείο.",
      serviceWorkerError: "Το offline app shell δεν ενεργοποιήθηκε σε αυτό το περιβάλλον.",
      pdfNoPages: "Το PDF δεν έχει σελίδες.",
      pdfIndexing: "Δημιουργία ευρετηρίου αναζήτησης PDF...",
      textLabel: "Απλό κείμενο",
      markdownLabel: "Markdown κείμενο",
      htmlLabel: "HTML αρχείο",
      docxLabel: "DOCX κείμενο",
      odtLabel: "ODT κείμενο",
      fb2Book: "FB2 βιβλίο",
      fb2Label: "FB2 κείμενο",
      cbzNoImages: "Το CBZ δεν περιέχει εικόνες.",
      pageLabel: "Σελίδα {number}",
      morePages: "... {number} ακόμη σελίδες",
      chapterLabel: "Κεφάλαιο {number}",
      textResultLabel: "Κείμενο",
      searchMin: "Γράψε τουλάχιστον 2 χαρακτήρες.",
      searchEmpty: "Δεν βρέθηκε αποτέλεσμα.",
      chapterMissing: "Το κεφάλαιο λείπει από το EPUB.",
      containerMissing: "Δεν βρέθηκε το META-INF/container.xml.",
      packageMissing: "Δεν βρέθηκε package document.",
      packageFileMissing: "Το package document λείπει από το EPUB.",
      epubBook: "EPUB βιβλίο",
      epubNoChapters: "Το EPUB δεν έχει αναγνώσιμα κεφάλαια.",
      emptyReadableText: "Το αρχείο δεν περιέχει αναγνώσιμο κείμενο.",
      sandboxRuntimeError: "Το βιβλίο έτρεξε script με σφάλμα μέσα στο sandbox.",
      externalBlocked: "Αποκλείστηκε εξωτερικός σύνδεσμος.",
      linkNoChapter: "Ο σύνδεσμος δεν αντιστοιχεί σε κεφάλαιο του EPUB.",
      speechUnsupported: "Ο browser δεν υποστηρίζει ανάγνωση φωναχτά.",
      speechNoText: "Δεν βρέθηκε αναγνώσιμο κείμενο σε αυτή τη σελίδα.",
      invalidXml: "Το αρχείο περιέχει μη έγκυρο XML.",
      markdownLinkBlocked: "Ο σύνδεσμος δεν ανοίγει από τοπικό Markdown",
      fallbackBookTitle: "Βιβλίο"
    }
  };

  Object.assign(TRANSLATIONS.el, {
    learningTitle: "\u0397 \u03bc\u03b5\u03bb\u03ad\u03c4\u03b7 \u03bc\u03bf\u03c5",
    learningEmpty: "\u0386\u03bd\u03bf\u03b9\u03be\u03b5 \u03ad\u03bd\u03b1 \u03b2\u03b9\u03b2\u03bb\u03af\u03bf \u03b3\u03b9\u03b1 \u03c4\u03bf\u03c0\u03b9\u03ba\u03ae \u03b1\u03c0\u03bf\u03b8\u03ae\u03ba\u03b5\u03c5\u03c3\u03b7 \u03c0\u03c1\u03bf\u03cc\u03b4\u03bf\u03c5.",
    learningProgress: "\u0395\u03c0\u03b9\u03c3\u03ba\u03ad\u03c6\u03b8\u03b7\u03ba\u03b1\u03bd {visited} \u03b1\u03c0\u03cc {total} \u03b5\u03bd\u03cc\u03c4\u03b7\u03c4\u03b5\u03c2 ({percent}%).",
    addBookmark: "\u03a0\u03c1\u03bf\u03c3\u03b8\u03ae\u03ba\u03b7 \u03c3\u03b5\u03bb\u03b9\u03b4\u03bf\u03b4\u03b5\u03af\u03ba\u03c4\u03b7",
    bookmarkAdded: "\u039f \u03c3\u03b5\u03bb\u03b9\u03b4\u03bf\u03b4\u03b5\u03af\u03ba\u03c4\u03b7\u03c2 \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03cd\u03c4\u03b7\u03ba\u03b5 \u03c4\u03bf\u03c0\u03b9\u03ba\u03ac.",
    bookmarkExists: "\u0391\u03c5\u03c4\u03ae \u03b7 \u03b8\u03ad\u03c3\u03b7 \u03ad\u03c7\u03b5\u03b9 \u03ae\u03b4\u03b7 \u03c3\u03b5\u03bb\u03b9\u03b4\u03bf\u03b4\u03b5\u03af\u03ba\u03c4\u03b7.",
    bookmarksTitle: "\u03a3\u03b5\u03bb\u03b9\u03b4\u03bf\u03b4\u03b5\u03af\u03ba\u03c4\u03b5\u03c2",
    bookmarksEmpty: "\u0394\u03b5\u03bd \u03c5\u03c0\u03ac\u03c1\u03c7\u03bf\u03c5\u03bd \u03b1\u03ba\u03cc\u03bc\u03b7 \u03c3\u03b5\u03bb\u03b9\u03b4\u03bf\u03b4\u03b5\u03af\u03ba\u03c4\u03b5\u03c2.",
    noteLabel: "\u03a3\u03b7\u03bc\u03b5\u03af\u03c9\u03c3\u03b7 \u03b3\u03b9\u03b1 \u03b1\u03c5\u03c4\u03ae \u03c4\u03b7 \u03c3\u03b5\u03bb\u03af\u03b4\u03b1",
    notePlaceholder: "\u0393\u03c1\u03ac\u03c8\u03b5 \u03bc\u03b9\u03b1 \u03c4\u03bf\u03c0\u03b9\u03ba\u03ae \u03c3\u03b7\u03bc\u03b5\u03af\u03c9\u03c3\u03b7...",
    saveNote: "\u0391\u03c0\u03bf\u03b8\u03ae\u03ba\u03b5\u03c5\u03c3\u03b7 \u03c3\u03b7\u03bc\u03b5\u03af\u03c9\u03c3\u03b7\u03c2",
    noteAdded: "\u0397 \u03c3\u03b7\u03bc\u03b5\u03af\u03c9\u03c3\u03b7 \u03b1\u03c0\u03bf\u03b8\u03b7\u03ba\u03b5\u03cd\u03c4\u03b7\u03ba\u03b5 \u03c4\u03bf\u03c0\u03b9\u03ba\u03ac.",
    noteEmpty: "\u0393\u03c1\u03ac\u03c8\u03b5 \u03c0\u03c1\u03ce\u03c4\u03b1 \u03bc\u03b9\u03b1 \u03c3\u03b7\u03bc\u03b5\u03af\u03c9\u03c3\u03b7.",
    notesEmpty: "\u0394\u03b5\u03bd \u03c5\u03c0\u03ac\u03c1\u03c7\u03bf\u03c5\u03bd \u03b1\u03ba\u03cc\u03bc\u03b7 \u03c3\u03b7\u03bc\u03b5\u03b9\u03ce\u03c3\u03b5\u03b9\u03c2.",
    deleteLearningItem: "\u0394\u03b9\u03b1\u03b3\u03c1\u03b1\u03c6\u03ae",
    exportLearning: "\u0395\u03be\u03b1\u03b3\u03c9\u03b3\u03ae \u03c3\u03b7\u03bc\u03b5\u03b9\u03ce\u03c3\u03b5\u03c9\u03bd",
    learningExported: "\u039f\u03b9 \u03c3\u03b5\u03bb\u03b9\u03b4\u03bf\u03b4\u03b5\u03af\u03ba\u03c4\u03b5\u03c2 \u03ba\u03b1\u03b9 \u03bf\u03b9 \u03c3\u03b7\u03bc\u03b5\u03b9\u03ce\u03c3\u03b5\u03b9\u03c2 \u03b5\u03be\u03ae\u03c7\u03b8\u03b7\u03ba\u03b1\u03bd \u03c4\u03bf\u03c0\u03b9\u03ba\u03ac.",
    chapterLocation: "\u039a\u03b5\u03c6\u03ac\u03bb\u03b1\u03b9\u03bf {number}",
    pageLocation: "\u03a3\u03b5\u03bb\u03af\u03b4\u03b1 {number}",
    documentLocation: "\u0388\u03b3\u03b3\u03c1\u03b1\u03c6\u03bf"
  });

  Object.assign(TRANSLATIONS.en, {
    skipToContent: "Skip to reading area",
    chapterAnnounce: "Section {current} of {total}: {title}",
    textVersion: "Text version (no 3D)",
    textVersionOn: "Text version: {title}",
    textVersionOff: "Interactive version: {title}",
    textVersionSuffix: "text version",
    bookA11yTitle: "Accessibility of this book",
    a11yNoMeta: "The book gives no accessibility information.",
    a11yWaysOfReading: "Ways of reading",
    a11yAdjust: "Text and layout can be adjusted (size, spacing, theme).",
    a11yNoAdjust: "Appearance may not adapt to reading settings.",
    a11yNonvisual: "All content can be read as text, with a screen reader or read aloud.",
    a11yNonvisualPartial: "Some content may not be available as text.",
    a11yAltText: "Images have text descriptions.",
    a11yLongDesc: "Complex images and 3D models have long descriptions.",
    a11yNavigation: "Navigation",
    a11yToc: "Table of contents",
    a11yStructure: "Headings and landmarks for structural navigation",
    a11yReadingOrder: "Reading order follows the content",
    a11yConformance: "Conformance",
    a11yConformsTo: "Claims: {standard}",
    a11yCertifiedBy: "Assessed by: {who}",
    a11yNoConformance: "No conformance claim.",
    a11yHazards: "Hazards",
    a11yNoHazards: "No flashing, sound or motion-simulation hazards.",
    a11yHazardList: "Declared hazards: {list}",
    a11yHazardUnknown: "Hazards not declared.",
    a11yRichContent: "Rich content",
    a11yAria: "Interactive parts use ARIA roles and labels.",
    a11ySummary: "Accessibility summary",
    a11yAllMeta: "All accessibility metadata",
    auxDocument: "Linked document",
    pdfTextSummary: "Text of this page",
    pdfTextEmpty: "This page has no text layer (it may be a scanned image).",
    pdfTextRestricted: "This PDF does not permit text extraction, so its text is not shown, searched or read aloud.",
    pageAnnounce: "Page {current} of {total}",
    keyboardHelp: "Keys: ← → previous or next section (outside text fields), Esc closes the book panel."
  });
  Object.assign(TRANSLATIONS.el, {
    skipToContent: "Μετάβαση στην περιοχή ανάγνωσης",
    chapterAnnounce: "Ενότητα {current} από {total}: {title}",
    textVersion: "Εκδοχή κειμένου (χωρίς 3D)",
    textVersionOn: "Εκδοχή κειμένου: {title}",
    textVersionOff: "Διαδραστική εκδοχή: {title}",
    textVersionSuffix: "εκδοχή κειμένου",
    bookA11yTitle: "Προσβασιμότητα του βιβλίου",
    a11yNoMeta: "Το βιβλίο δεν δίνει πληροφορίες προσβασιμότητας.",
    a11yWaysOfReading: "Τρόποι ανάγνωσης",
    a11yAdjust: "Το κείμενο και η διάταξη προσαρμόζονται (μέγεθος, αποστάσεις, θέμα).",
    a11yNoAdjust: "Η εμφάνιση ίσως δεν ακολουθεί τις ρυθμίσεις ανάγνωσης.",
    a11yNonvisual: "Όλο το περιεχόμενο διαβάζεται ως κείμενο, με αναγνώστη οθόνης ή ανάγνωση φωναχτά.",
    a11yNonvisualPartial: "Μέρος του περιεχομένου ίσως δεν υπάρχει ως κείμενο.",
    a11yAltText: "Οι εικόνες έχουν περιγραφή με κείμενο.",
    a11yLongDesc: "Τα σύνθετα σχήματα και τα 3D μοντέλα έχουν εκτενή περιγραφή.",
    a11yNavigation: "Πλοήγηση",
    a11yToc: "Πίνακας περιεχομένων",
    a11yStructure: "Επικεφαλίδες και ορόσημα για δομημένη πλοήγηση",
    a11yReadingOrder: "Η σειρά ανάγνωσης ακολουθεί το περιεχόμενο",
    a11yConformance: "Συμμόρφωση",
    a11yConformsTo: "Δηλώνει: {standard}",
    a11yCertifiedBy: "Αξιολόγηση: {who}",
    a11yNoConformance: "Δεν δηλώνεται συμμόρφωση.",
    a11yHazards: "Κίνδυνοι",
    a11yNoHazards: "Χωρίς αναβοσβήσματα, ήχο ή προσομοίωση κίνησης.",
    a11yHazardList: "Δηλωμένοι κίνδυνοι: {list}",
    a11yHazardUnknown: "Δεν δηλώνονται κίνδυνοι.",
    a11yRichContent: "Πλούσιο περιεχόμενο",
    a11yAria: "Τα διαδραστικά μέρη έχουν ρόλους και ετικέτες ARIA.",
    a11ySummary: "Σύνοψη προσβασιμότητας",
    a11yAllMeta: "Όλα τα μεταδεδομένα προσβασιμότητας",
    auxDocument: "Συνδεδεμένο έγγραφο",
    pdfTextSummary: "Κείμενο της σελίδας",
    pdfTextEmpty: "Η σελίδα δεν έχει κείμενο (ίσως είναι σαρωμένη εικόνα).",
    pdfTextRestricted: "Αυτό το PDF δεν επιτρέπει την εξαγωγή του κειμένου του· γι' αυτό το κείμενο δεν εμφανίζεται, δεν αναζητείται και δεν διαβάζεται φωναχτά.",
    pageAnnounce: "Σελίδα {current} από {total}",
    keyboardHelp: "Πλήκτρα: ← → προηγούμενη ή επόμενη ενότητα (έξω από πεδία κειμένου), Esc κλείνει τον πίνακα του βιβλίου."
  });

  let pdfjsPromise = null;
  let resizeTimer = null;
  let speechUtterance = null;
  const initialAccessibility = loadAccessibilitySettings();
  const initialLanguage = loadLanguage();

  const state = {
    format: null,
    zip: null,
    opfPath: "",
    opfBase: "",
    bookTitle: "",
    bookKey: "",
    manifest: new Map(),
    spine: [],
    toc: [],
    resourceUrls: new Map(),
    currentIndex: 0,
    pdfDoc: null,
    pdfTextAllowed: true,
    pdfPage: 1,
    pdfPageCount: 0,
    pdfRenderToken: 0,
    textRaw: "",
    textHtml: "",
    imagePages: [],
    currentImagePage: 0,
    fontScale: initialAccessibility.fontScale,
    theme: initialAccessibility.theme,
    accessibility: initialAccessibility,
    language: initialLanguage,
    searchIndex: [],
    learning: null,
    toastTimer: null,
    bookLanguage: "",
    chapterLanguage: "",
    a11yMeta: [],
    altView: false,
    currentDocPath: "",
    focusContentOnReady: false,
    preferText: false
  };

  const els = {
    input: document.getElementById("epubInput"),
    frame: document.getElementById("readerFrame"),
    pdfViewer: document.getElementById("pdfViewer"),
    pdfCanvas: document.getElementById("pdfCanvas"),
    textViewer: document.getElementById("textViewer"),
    empty: document.getElementById("emptyState"),
    sidebar: document.getElementById("sidebar"),
    menuButton: document.getElementById("menuButton"),
    bookTitle: document.getElementById("bookTitle"),
    tocList: document.getElementById("tocList"),
    searchInput: document.getElementById("searchInput"),
    searchButton: document.getElementById("searchButton"),
    searchResults: document.getElementById("searchResults"),
    progressBar: document.getElementById("progressBar"),
    chapterIndicator: document.getElementById("chapterIndicator"),
    prevButton: document.getElementById("prevButton"),
    nextButton: document.getElementById("nextButton"),
    prevEdge: document.getElementById("prevEdge"),
    nextEdge: document.getElementById("nextEdge"),
    mobilePrevButton: document.getElementById("mobilePrevButton"),
    mobileNextButton: document.getElementById("mobileNextButton"),
    fontDownButton: document.getElementById("fontDownButton"),
    fontUpButton: document.getElementById("fontUpButton"),
    themeButton: document.getElementById("themeButton"),
    bookmarkButton: document.getElementById("bookmarkButton"),
    languageSelect: document.getElementById("languageSelect"),
    fontScaleRange: document.getElementById("fontScaleRange"),
    fontScaleValue: document.getElementById("fontScaleValue"),
    themeSelect: document.getElementById("themeSelect"),
    fontFamilySelect: document.getElementById("fontFamilySelect"),
    lineHeightRange: document.getElementById("lineHeightRange"),
    lineHeightValue: document.getElementById("lineHeightValue"),
    textWidthSelect: document.getElementById("textWidthSelect"),
    letterSpacingToggle: document.getElementById("letterSpacingToggle"),
    reduceMotionToggle: document.getElementById("reduceMotionToggle"),
    readAloudButton: document.getElementById("readAloudButton"),
    stopSpeechButton: document.getElementById("stopSpeechButton"),
    addBookmarkButton: document.getElementById("addBookmarkButton"),
    exportLearningButton: document.getElementById("exportLearningButton"),
    learningProgress: document.getElementById("learningProgress"),
    bookmarkList: document.getElementById("bookmarkList"),
    noteInput: document.getElementById("noteInput"),
    saveNoteButton: document.getElementById("saveNoteButton"),
    noteList: document.getElementById("noteList"),
    aboutButton: document.getElementById("aboutButton"),
    aboutDialog: document.getElementById("aboutDialog"),
    toast: document.getElementById("toast"),
    altButton: document.getElementById("altButton"),
    announcer: document.getElementById("announcer"),
    bookHeading: document.getElementById("bookHeading"),
    bookA11y: document.getElementById("bookA11y"),
    bookA11yPanel: document.getElementById("bookA11yPanel"),
    skipLink: document.getElementById("skipLink"),
    readerPane: document.getElementById("readerPane"),
    pdfText: document.getElementById("pdfText")
  };

  els.input.addEventListener("change", handleFileInput);
  els.prevButton.addEventListener("click", () => goRelative(-1));
  els.nextButton.addEventListener("click", () => goRelative(1));
  els.prevEdge.addEventListener("click", () => goRelative(-1));
  els.nextEdge.addEventListener("click", () => goRelative(1));
  els.mobilePrevButton.addEventListener("click", () => goRelative(-1));
  els.mobileNextButton.addEventListener("click", () => goRelative(1));
  els.fontDownButton.addEventListener("click", () => adjustFont(-0.08));
  els.fontUpButton.addEventListener("click", () => adjustFont(0.08));
  els.themeButton.addEventListener("click", toggleTheme);
  els.bookmarkButton.addEventListener("click", addBookmark);
  els.addBookmarkButton.addEventListener("click", addBookmark);
  els.saveNoteButton.addEventListener("click", saveNote);
  els.exportLearningButton.addEventListener("click", exportLearning);
  els.languageSelect.addEventListener("change", () => setLanguage(els.languageSelect.value));
  els.menuButton.addEventListener("click", () => setSidebarOpen(!els.sidebar.classList.contains("open")));
  els.altButton.addEventListener("click", () => {
    if (state.format !== "epub") return;
    state.preferText = !state.altView;
    goToChapter(state.currentIndex, "", { alt: state.preferText, focus: true });
  });
  els.skipLink.addEventListener("click", (event) => {
    event.preventDefault();
    focusReadingArea();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.sidebar.classList.contains("open")) {
      setSidebarOpen(false);
      els.menuButton.focus();
      return;
    }
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const target = event.target;
    if (!target || (els.aboutDialog && els.aboutDialog.open)) return;
    const tag = (target.tagName || "").toLowerCase();
    if (["input", "textarea", "select", "iframe"].includes(tag) || target.isContentEditable) return;
    if (target.closest && target.closest(".sidebar")) return;
    if (!state.format) return;
    event.preventDefault();
    goRelative(event.key === "ArrowLeft" ? -1 : 1);
  });
  els.searchButton.addEventListener("click", runSearch);
  els.searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") runSearch();
  });
  els.fontScaleRange.addEventListener("input", () => {
    setAccessibility({ fontScale: Number(els.fontScaleRange.value) / 100 });
  });
  els.themeSelect.addEventListener("change", () => {
    setAccessibility({ theme: els.themeSelect.value });
  });
  els.fontFamilySelect.addEventListener("change", () => {
    setAccessibility({ fontFamily: els.fontFamilySelect.value });
  });
  els.lineHeightRange.addEventListener("input", () => {
    setAccessibility({ lineHeight: Number(els.lineHeightRange.value) / 100 });
  });
  els.textWidthSelect.addEventListener("change", () => {
    setAccessibility({ textWidth: els.textWidthSelect.value });
  });
  els.letterSpacingToggle.addEventListener("change", () => {
    setAccessibility({ letterSpacing: els.letterSpacingToggle.checked });
  });
  els.reduceMotionToggle.addEventListener("change", () => {
    setAccessibility({ reduceMotion: els.reduceMotionToggle.checked }, { render: false });
  });
  els.readAloudButton.addEventListener("click", readCurrentTextAloud);
  els.stopSpeechButton.addEventListener("click", stopSpeech);
  if (els.aboutButton && els.aboutDialog) {
    els.aboutButton.addEventListener("click", () => {
      if (els.aboutDialog.open) return;
      if (typeof els.aboutDialog.showModal === "function") {
        els.aboutDialog.showModal();
      } else {
        els.aboutDialog.setAttribute("open", "");
      }
    });
  }

  window.addEventListener("message", handleFrameMessage);
  window.addEventListener("resize", () => {
    if (state.format !== "pdf" || !state.pdfDoc) return;
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => renderPdfPage(state.pdfPage), 160);
  });

  if ("serviceWorker" in navigator && window.isSecureContext && location.protocol !== "file:") {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      showToast(t("serviceWorkerError"));
    });
  }

  syncLanguageControl();
  applyTranslations();
  syncAccessibilityControls();
  applyAccessibilitySettings();

  function loadLanguage() {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (SUPPORTED_LANGUAGES.includes(saved)) return saved;
    } catch (_) {
      // storage blocked: fall through to the browser language
    }
    const browser = ((navigator.languages && navigator.languages[0]) || navigator.language || "en").toLowerCase();
    return "en"; // English review derivative; an explicitly saved preference still takes precedence.
  }

  function t(key, vars = {}) {
    const dict = TRANSLATIONS[state ? state.language : initialLanguage] || TRANSLATIONS.en;
    const fallback = TRANSLATIONS.en[key] || key;
    return (dict[key] || fallback).replace(/\{(\w+)\}/g, (_, name) => {
      return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : "";
    });
  }

  function setLanguage(language) {
    state.language = SUPPORTED_LANGUAGES.includes(language) ? language : "en";
    try {
      localStorage.setItem(LANGUAGE_KEY, state.language);
    } catch (_) {
      // Language still applies for this session when storage is unavailable.
    }
    syncLanguageControl();
    applyTranslations();
    refreshLocalizedNavigation();
    renderBookAccessibility();
    updateReaderState();
  }

  function syncLanguageControl() {
    els.languageSelect.value = state.language;
    document.documentElement.lang = state.language;
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((node) => {
      node.setAttribute("title", t(node.dataset.i18nTitle));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    if (!state.format) {
      els.bookTitle.textContent = t("noBook");
    }
  }

  function loadAccessibilitySettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(ACCESSIBILITY_KEY) || "{}");
      return sanitizeAccessibility(saved);
    } catch (_) {
      return { ...ACCESSIBILITY_DEFAULTS };
    }
  }

  function sanitizeAccessibility(settings) {
    const next = { ...ACCESSIBILITY_DEFAULTS, ...(settings || {}) };
    next.fontScale = clamp(Number(next.fontScale) || ACCESSIBILITY_DEFAULTS.fontScale, 0.78, 1.6);
    next.lineHeight = clamp(Number(next.lineHeight) || ACCESSIBILITY_DEFAULTS.lineHeight, 1.4, 2.2);
    next.theme = THEMES.includes(next.theme) ? next.theme : ACCESSIBILITY_DEFAULTS.theme;
    next.fontFamily = FONT_STACKS[next.fontFamily] ? next.fontFamily : ACCESSIBILITY_DEFAULTS.fontFamily;
    next.textWidth = TEXT_WIDTHS[next.textWidth] ? next.textWidth : ACCESSIBILITY_DEFAULTS.textWidth;
    next.letterSpacing = Boolean(next.letterSpacing);
    next.reduceMotion = Boolean(next.reduceMotion);
    return next;
  }

  function saveAccessibilitySettings() {
    try {
      localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(state.accessibility));
    } catch (_) {
      // Storage can be blocked in private browsing; the settings still work for this session.
    }
  }

  function setAccessibility(partial, options = {}) {
    const shouldRender = options.render !== false;
    state.accessibility = sanitizeAccessibility({ ...state.accessibility, ...partial });
    state.fontScale = state.accessibility.fontScale;
    state.theme = state.accessibility.theme;
    saveAccessibilitySettings();
    syncAccessibilityControls();
    applyAccessibilitySettings();
    if (shouldRender) renderCurrentContent();
  }

  function syncAccessibilityControls() {
    const settings = state.accessibility;
    els.fontScaleRange.value = String(Math.round(settings.fontScale * 100));
    els.fontScaleValue.textContent = `${Math.round(settings.fontScale * 100)}%`;
    els.themeSelect.value = settings.theme;
    els.fontFamilySelect.value = settings.fontFamily;
    els.lineHeightRange.value = String(Math.round(settings.lineHeight * 100));
    els.lineHeightValue.textContent = settings.lineHeight.toFixed(2);
    els.textWidthSelect.value = settings.textWidth;
    els.letterSpacingToggle.checked = settings.letterSpacing;
    els.reduceMotionToggle.checked = settings.reduceMotion;
  }

  function applyAccessibilitySettings() {
    const settings = state.accessibility;
    document.body.classList.toggle("reader-theme-night", settings.theme === "night");
    document.body.classList.toggle("reader-theme-sepia", settings.theme === "sepia");
    document.body.classList.toggle("reader-theme-highContrast", settings.theme === "highContrast");
    document.body.classList.toggle("reduce-motion", settings.reduceMotion);
    document.documentElement.style.setProperty("--reader-font-family", FONT_STACKS[settings.fontFamily]);
    document.documentElement.style.setProperty("--reader-line-height", settings.lineHeight.toFixed(2));
    document.documentElement.style.setProperty("--reader-max-width", TEXT_WIDTHS[settings.textWidth]);
    document.documentElement.style.setProperty("--reader-letter-spacing", settings.letterSpacing ? "0.045em" : "0");
  }

  function renderCurrentContent() {
    if (!state.format) return;
    if (state.format === "epub") {
      goToChapter(state.currentIndex);
    } else if (state.format === "pdf") {
      renderPdfPage(state.pdfPage);
    } else if (state.format === "html") {
      renderHtmlDocument();
    } else if (state.format === "cbz") {
      renderCbzPage(state.currentImagePage);
    } else {
      renderTextDocument();
    }
  }

  function themePalette(theme) {
    if (theme === "night") {
      return { bg: "#151916", ink: "#eef3ec", link: "#72d5bd", tableLine: "rgba(230, 238, 232, 0.32)" };
    }
    if (theme === "sepia") {
      return { bg: "#fff8ea", ink: "#2b2419", link: "#6d4f1f", tableLine: "rgba(112, 97, 77, 0.42)" };
    }
    if (theme === "highContrast") {
      return { bg: "#000000", ink: "#ffffff", link: "#ffd400", tableLine: "#ffffff" };
    }
    return { bg: "#ffffff", ink: "#1f2924", link: "#176f60", tableLine: "rgba(120, 130, 125, 0.35)" };
  }

  function refreshLocalizedNavigation() {
    if (!state.format) return;
    if (state.format === "pdf") {
      buildPdfToc();
    } else if (state.format === "cbz") {
      state.toc = state.imagePages.map((page, index) => ({
        label: t("pageLabel", { number: index + 1 }),
        type: "cbz",
        index
      }));
    } else if (state.format === "html") {
      state.toc = [{ label: t("htmlLabel"), type: "html", index: 0 }];
    } else if (["text", "markdown", "docx", "odt", "fb2"].includes(state.format)) {
      state.toc = [{ label: labelForTextFormat(state.format), type: "text", index: 0 }];
    }
    renderTableOfContents();
  }

  function labelForTextFormat(format) {
    return {
      text: t("textLabel"),
      markdown: t("markdownLabel"),
      docx: t("docxLabel"),
      odt: t("odtLabel"),
      fb2: t("fb2Label")
    }[format] || t("textLabel");
  }

  async function handleFileInput(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const format = detectFormat(file);
    if (!format) {
      showToast(t("unsupportedFile"));
      return;
    }

    if (file.size > MAX_BYTES[format]) {
      showToast(t("fileTooLarge", { format: formatLabel(format) }));
      return;
    }

    setBusy(true);
    showToast(t("openingFile", { format: formatLabel(format) }));

    try {
      resetBook();
      state.format = format;
      state.bookTitle = titleFromFile(file.name);
      state.bookKey = `${format}:${file.name}:${file.size}:${file.lastModified || 0}`;
      loadLearningRecord();

      if (format === "epub") {
        await openEpub(file);
      } else if (format === "pdf") {
        await openPdf(file);
      } else if (format === "html") {
        await openHtml(file);
      } else if (format === "docx") {
        await openDocx(file);
      } else if (format === "odt") {
        await openOdt(file);
      } else if (format === "fb2") {
        await openFb2(file);
      } else if (format === "cbz") {
        await openCbz(file);
      } else {
        await openTextLike(file, format);
      }

      setReaderEnabled(true);
      updateReaderState();
      showToast(t("fileOpened", { format: formatLabel(format) }));
    } catch (error) {
      console.error(error);
      resetBook();
      setReaderEnabled(false);
      showToast(error.message || t("openError"));
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  function detectFormat(file) {
    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();

    if (name.endsWith(".epub") || type === "application/epub+zip") return "epub";
    if (name.endsWith(".pdf") || type === "application/pdf") return "pdf";
    if (name.endsWith(".md") || name.endsWith(".markdown") || type === "text/markdown") return "markdown";
    if (name.endsWith(".html") || name.endsWith(".htm") || name.endsWith(".xhtml") || type === "text/html") return "html";
    if (name.endsWith(".docx") || type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "docx";
    if (name.endsWith(".odt") || type === "application/vnd.oasis.opendocument.text") return "odt";
    if (name.endsWith(".fb2")) return "fb2";
    if (name.endsWith(".cbz")) return "cbz";
    if (name.endsWith(".txt") || type.startsWith("text/plain")) return "text";
    return "";
  }

  function formatLabel(format) {
    return {
      epub: "EPUB",
      pdf: "PDF",
      text: "TXT",
      markdown: "Markdown",
      html: "HTML",
      docx: "DOCX",
      odt: "ODT",
      fb2: "FB2",
      cbz: "CBZ"
    }[format] || "file";
  }

  async function openEpub(file) {
    state.zip = await JSZip.loadAsync(file);
    if (await epubHasDrm()) throw new Error(t("drmBlocked"));
    await readPackageDocument();
    await buildResourceUrls();
    await buildTableOfContents();
    renderTableOfContents();
    renderBookAccessibility();

    state.searchIndex = await buildEpubSearchIndex();

    const saved = readSavedPosition();
    const startIndex = clamp(saved.index || 0, 0, Math.max(0, state.spine.length - 1));
    await goToChapter(startIndex, saved.fragment || "");
  }

  async function openPdf(file) {
    const pdfjsLib = await getPdfjs();
    const data = new Uint8Array(await file.arrayBuffer());
    const loadingTask = pdfjsLib.getDocument({
      data,
      isEvalSupported: false,
      disableAutoFetch: true,
      disableStream: true,
      enableXfa: false
    });

    state.pdfDoc = await loadingTask.promise;
    state.pdfTextAllowed = await pdfTextExtractionAllowed(state.pdfDoc, pdfjsLib);
    state.pdfPageCount = state.pdfDoc.numPages;
    if (!state.pdfPageCount) throw new Error(t("pdfNoPages"));

    buildPdfToc();
    renderTableOfContents();

    const saved = readSavedPosition();
    const page = clamp(saved.page || 1, 1, state.pdfPageCount);
    await renderPdfPage(page);

    showToast(t("pdfIndexing"));
    state.searchIndex = await buildPdfSearchIndex();
  }

  async function openTextLike(file, format) {
    const raw = await file.text();
    state.textRaw = raw;
    state.textHtml = format === "markdown"
      ? markdownToHtml(raw)
      : `<pre class="plain-text">${escapeHtml(raw)}</pre>`;

    openTextDocument(state.textHtml, raw, labelForTextFormat(format));
  }

  async function openHtml(file) {
    state.textRaw = await file.text();
    state.toc = [{
      label: t("htmlLabel"),
      type: "html",
      index: 0
    }];
    state.searchIndex = [{
      index: 0,
      text: htmlToPlainText(state.textRaw).toLowerCase(),
      preview: htmlToPlainText(state.textRaw).slice(0, 220)
    }];
    renderTableOfContents();
    renderHtmlDocument();
  }

  async function openDocx(file) {
    const zip = await JSZip.loadAsync(file);
    const documentFile = zipFile(zip, "word/document.xml");
    if (!documentFile) throw new Error("DOCX is missing word/document.xml.");

    const xml = await documentFile.async("text");
    const doc = parseXml(xml);
    const paragraphs = extractParagraphsByLocalNames(doc, ["p"]);
    openTextDocument(paragraphsToHtml(paragraphs, labelForTextFormat("docx")), paragraphs.join("\n\n"), labelForTextFormat("docx"));
  }

  async function openOdt(file) {
    const zip = await JSZip.loadAsync(file);
    const contentFile = zipFile(zip, "content.xml");
    if (!contentFile) throw new Error("ODT is missing content.xml.");

    const xml = await contentFile.async("text");
    const doc = parseXml(xml);
    const paragraphs = extractParagraphsByLocalNames(doc, ["h", "p"]);
    openTextDocument(paragraphsToHtml(paragraphs, labelForTextFormat("odt")), paragraphs.join("\n\n"), labelForTextFormat("odt"));
  }

  async function openFb2(file) {
    const xml = await file.text();
    const doc = parseXml(xml);
    const title = cleanText((firstByLocalName(doc, "book-title") || {}).textContent || state.bookTitle || t("fb2Book"));
    state.bookTitle = title;
    const paragraphs = extractParagraphsByLocalNames(doc, ["p", "v"]);
    openTextDocument(paragraphsToHtml(paragraphs, title), paragraphs.join("\n\n"), labelForTextFormat("fb2"));
  }

  async function openCbz(file) {
    const zip = await JSZip.loadAsync(file);
    const imageFiles = Object.values(zip.files)
      .filter((entry) => !entry.dir && /\.(png|jpe?g|webp|gif|svg)$/i.test(entry.name))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

    if (!imageFiles.length) throw new Error(t("cbzNoImages"));

    state.imagePages = [];
    for (const entry of imageFiles) {
      const ext = entry.name.split(".").pop().toLowerCase();
      const mediaType = {
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        webp: "image/webp",
        gif: "image/gif",
        svg: "image/svg+xml"
      }[ext] || "application/octet-stream";
      state.imagePages.push({
        label: entry.name.split("/").pop(),
        url: dataUrl(mediaType, await entry.async("base64"))
      });
    }

    state.toc = state.imagePages.map((page, index) => ({
      label: t("pageLabel", { number: index + 1 }),
      type: "cbz",
      index
    }));
    state.searchIndex = [];
    renderTableOfContents();
    renderCbzPage(0);
  }

  function openTextDocument(html, rawText, label) {
    state.textHtml = html;
    state.textRaw = rawText || "";
    state.toc = [{
      label,
      type: "text",
      index: 0
    }];
    state.searchIndex = cleanText(state.textRaw) ? [{
      index: 0,
      text: cleanText(state.textRaw).toLowerCase(),
      preview: cleanText(state.textRaw).slice(0, 220)
    }] : [];

    renderTableOfContents();
    renderTextDocument();
  }

  async function getPdfjs() {
    if (!pdfjsPromise) {
      pdfjsPromise = import("./vendor/pdf.min.mjs").then((pdfjsLib) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "./vendor/pdf.worker.min.mjs";
        return pdfjsLib;
      });
    }
    return pdfjsPromise;
  }

  async function readPackageDocument() {
    const containerFile = getZipFile("META-INF/container.xml");
    if (!containerFile) throw new Error(t("containerMissing"));

    const containerXml = await containerFile.async("text");
    const containerDoc = parseXml(containerXml);
    const rootfile = firstByLocalName(containerDoc, "rootfile");
    const opfPath = rootfile && rootfile.getAttribute("full-path");
    if (!opfPath) throw new Error(t("packageMissing"));

    const normalizedOpfPath = normalizeZipPath(opfPath);
    const opfFile = getZipFile(normalizedOpfPath);
    if (!opfFile) throw new Error(t("packageFileMissing"));

    state.opfPath = normalizedOpfPath;
    state.opfBase = dirname(normalizedOpfPath);

    const opfXml = await opfFile.async("text");
    const opfDoc = parseXml(opfXml);
    const titleNode = firstByLocalName(opfDoc, "title");
    state.bookTitle = cleanText(titleNode ? titleNode.textContent : "") || state.bookTitle || t("epubBook");
    const languageNode = firstByLocalName(opfDoc, "language");
    state.bookLanguage = cleanText(languageNode ? languageNode.textContent : "");
    state.a11yMeta = readAccessibilityMetadata(opfDoc);

    state.manifest = new Map();
    for (const item of allByLocalName(opfDoc, "item")) {
      const id = item.getAttribute("id");
      const href = item.getAttribute("href");
      if (!id || !href) continue;

      const mediaType = item.getAttribute("media-type") || "";
      const properties = item.getAttribute("properties") || "";
      const resolved = resolveHref(state.opfBase, href);
      if (resolved.external || !resolved.path) continue;

      state.manifest.set(id, {
        id,
        href,
        mediaType,
        properties,
        fallback: item.getAttribute("fallback") || "",
        path: resolved.path
      });
    }

    state.spine = [];
    for (const itemref of allByLocalName(opfDoc, "itemref")) {
      const idref = itemref.getAttribute("idref");
      const item = state.manifest.get(idref);
      if (!item) continue;
      if (!isDocumentItem(item)) continue;
      state.spine.push(item);
    }

    if (!state.spine.length) throw new Error(t("epubNoChapters"));
  }

  async function buildResourceUrls() {
    revokeResourceUrls();

    const cssItems = [];
    for (const item of state.manifest.values()) {
      const file = getZipFile(item.path);
      if (!file) continue;

      if (item.mediaType === "text/css") {
        cssItems.push(item);
        continue;
      }

      if (isDocumentItem(item)) continue;

      const base64 = await file.async("base64");
      state.resourceUrls.set(item.path, dataUrl(item.mediaType || "application/octet-stream", base64));
    }

    for (const item of cssItems) {
      const file = getZipFile(item.path);
      if (!file) continue;

      const cssText = await file.async("text");
      const rewritten = rewriteCssUrls(cssText, dirname(item.path));
      state.resourceUrls.set(item.path, textDataUrl("text/css", rewritten));
    }
  }

  async function buildTableOfContents() {
    const navItem = [...state.manifest.values()].find((item) => {
      return item.properties.split(/\s+/).includes("nav") && isDocumentItem(item);
    });

    if (navItem) {
      const file = getZipFile(navItem.path);
      if (file) {
        const html = await file.async("text");
        state.toc = parseNavToc(html, navItem.path);
      }
    }

    if (!state.toc.length) {
      state.toc = state.spine.map((item, index) => ({
        label: item.id || t("chapterLabel", { number: index + 1 }),
        type: "epub",
        path: item.path,
        fragment: "",
        index
      }));
    }
  }

  function parseNavToc(html, navPath) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const navs = [...doc.querySelectorAll("nav")];
    const tocNav = navs.find((nav) => {
      const type = `${nav.getAttribute("epub:type") || ""} ${nav.getAttribute("role") || ""}`;
      return type.toLowerCase().includes("toc");
    }) || navs[0] || doc;

    const entries = [];
    for (const anchor of tocNav.querySelectorAll("a[href]")) {
      const label = cleanText(anchor.textContent);
      const href = anchor.getAttribute("href") || "";
      const resolved = resolveHref(dirname(navPath), href);
      if (!label || resolved.external) continue;

      const spineIndex = findSpineIndex(resolved.path || navPath);
      entries.push({
        label,
        type: "epub",
        path: resolved.path || navPath,
        fragment: resolved.fragment || "",
        index: spineIndex
      });
    }

    return entries.filter((entry) => entry.index >= 0);
  }

  function buildPdfToc() {
    const visiblePages = Math.min(state.pdfPageCount, 160);
    state.toc = Array.from({ length: visiblePages }, (_, index) => ({
      label: t("pageLabel", { number: index + 1 }),
      type: "pdf",
      index
    }));

    if (state.pdfPageCount > visiblePages) {
      state.toc.push({
        label: t("morePages", { number: state.pdfPageCount - visiblePages }),
        type: "note",
        disabled: true
      });
    }
  }

  function renderTableOfContents() {
    els.tocList.replaceChildren();

    const fragment = document.createDocumentFragment();
    state.toc.forEach((entry) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = entry.label;
      button.disabled = Boolean(entry.disabled);
      button.addEventListener("click", () => {
        state.focusContentOnReady = true;
        navigateToEntry(entry);
        setSidebarOpen(false);
      });
      li.appendChild(button);
      fragment.appendChild(li);
    });

    els.tocList.appendChild(fragment);
    markActiveToc();
  }

  function navigateToEntry(entry) {
    if (!entry || entry.disabled) return;
    if (entry.type === "epub") {
      goToChapter(entry.index, entry.fragment || "");
    } else if (entry.type === "pdf") {
      renderPdfPage(entry.index + 1);
    } else if (entry.type === "cbz") {
      renderCbzPage(entry.index);
    } else if (entry.type === "text") {
      els.textViewer.scrollTo({ top: 0, behavior: "smooth" });
    } else if (entry.type === "html") {
      renderHtmlDocument();
    }
  }

  async function buildEpubSearchIndex() {
    const entries = [];

    for (let index = 0; index < state.spine.length; index += 1) {
      const item = state.spine[index];
      const file = getZipFile(item.path);
      if (!file) continue;

      const html = await file.async("text");
      const doc = new DOMParser().parseFromString(html, "text/html");
      doc.querySelectorAll("script, style, svg").forEach((node) => node.remove());
      const text = cleanText(doc.body ? doc.body.textContent : doc.textContent);
      entries.push({ index, text: text.toLowerCase(), preview: text.slice(0, 220) });
    }

    return entries;
  }

  async function buildPdfSearchIndex() {
    const entries = [];
    if (!state.pdfTextAllowed) return entries;

    for (let pageNumber = 1; pageNumber <= state.pdfPageCount; pageNumber += 1) {
      const page = await state.pdfDoc.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = cleanText(content.items.map((item) => item.str || "").join(" "));
      if (text) {
        entries.push({
          index: pageNumber - 1,
          text: text.toLowerCase(),
          preview: text.slice(0, 220)
        });
      }
    }

    return entries;
  }

  function runSearch() {
    const query = cleanText(els.searchInput.value).toLowerCase();
    els.searchResults.replaceChildren();

    if (!query || query.length < 2) {
      showToast(t("searchMin"));
      return;
    }

    const matches = state.searchIndex
      .filter((entry) => entry.text.includes(query))
      .slice(0, 12);

    if (!matches.length) {
      const empty = document.createElement("p");
      empty.textContent = t("searchEmpty");
      els.searchResults.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    for (const match of matches) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `${searchResultLabel(match.index)}: ${match.preview}`;
      button.addEventListener("click", () => {
        goToSearchResult(match.index);
        els.sidebar.classList.remove("open");
      });
      fragment.appendChild(button);
    }

    els.searchResults.appendChild(fragment);
  }

  function searchResultLabel(index) {
    if (state.format === "pdf") return t("pageLabel", { number: index + 1 });
    if (state.format === "epub") return t("chapterLabel", { number: index + 1 });
    if (state.format === "html") return "HTML";
    return t("textResultLabel");
  }

  function goToSearchResult(index) {
    if (state.format === "pdf") {
      renderPdfPage(index + 1);
    } else if (state.format === "epub") {
      goToChapter(index);
    } else if (state.format === "html") {
      renderHtmlDocument();
    } else if (["text", "markdown", "docx", "odt", "fb2"].includes(state.format)) {
      els.textViewer.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goRelative(delta) {
    if (state.format === "epub") {
      goToChapter(state.currentIndex + delta);
    } else if (state.format === "pdf") {
      renderPdfPage(state.pdfPage + delta);
    } else if (state.format === "cbz") {
      renderCbzPage(state.currentImagePage + delta);
    }
  }

  async function goToChapter(index, fragment, options = {}) {
    if (state.format !== "epub" || !state.zip || !state.spine.length) return;
    if (index < 0 || index >= state.spine.length) return;

    const item = state.spine[index];
    const fallbackItem = textFallbackFor(item);
    const wantAlt = options.alt !== undefined ? options.alt : state.preferText;
    const useAlt = Boolean(wantAlt && fallbackItem);
    const docItem = options.docItem || (useAlt ? fallbackItem : item);
    const file = getZipFile(docItem.path);
    if (!file) {
      showToast(t("chapterMissing"));
      return;
    }

    const changed = index !== state.currentIndex || useAlt !== state.altView || docItem.path !== state.currentDocPath;
    state.currentIndex = index;
    state.altView = useAlt;
    state.currentDocPath = docItem.path;
    if (options.focus) state.focusContentOnReady = true;
    const html = await file.async("text");
    els.frame.srcdoc = prepareChapterDocument(html, docItem.path, fragment || "");
    const title = sectionTitle(index) + (useAlt ? ` (${t("textVersionSuffix")})` : (options.docItem ? ` (${t("auxDocument")})` : ""));
    els.frame.title = title;
    showPanel("epub");
    updateReaderState();
    if (changed) announce(t("chapterAnnounce", { current: index + 1, total: state.spine.length, title }));
    savePosition({ index: state.currentIndex, fragment: fragment || "" });
  }

  function textFallbackFor(item) {
    // EPUB manifest fallback chain: a scripted/foreign spine item may name an XHTML text version.
    let next = item && item.fallback ? state.manifest.get(item.fallback) : null;
    const seen = new Set();
    while (next && !seen.has(next.id)) {
      seen.add(next.id);
      if (isDocumentItem(next)) return next;
      next = next.fallback ? state.manifest.get(next.fallback) : null;
    }
    return null;
  }

  function sectionTitle(index) {
    const exact = state.toc.find((entry) => entry.type === "epub" && entry.index === index && !entry.fragment);
    const any = exact || state.toc.find((entry) => entry.type === "epub" && entry.index === index);
    return any ? any.label : t("chapterLabel", { number: index + 1 });
  }

  function announce(message) {
    if (!els.announcer) return;
    els.announcer.textContent = "";
    window.setTimeout(() => { els.announcer.textContent = message; }, 80);
  }

  function setSidebarOpen(open) {
    els.sidebar.classList.toggle("open", open);
    els.menuButton.setAttribute("aria-expanded", String(open));
    if (open && window.matchMedia("(max-width: 860px)").matches) {
      const first = els.sidebar.querySelector("button.active, button:not(:disabled), input, select");
      if (first) first.focus();
    }
  }

  function focusReadingArea() {
    if (!els.frame.hidden) {
      state.focusContentOnReady = false;
      els.frame.focus();
      postToFrame({ type: "focus-content" });
    } else {
      els.readerPane.focus();
    }
  }

  function postToFrame(payload) {
    if (els.frame.contentWindow) els.frame.contentWindow.postMessage(Object.assign({ source: EPUB_SOURCE }, payload), "*");
  }

  function readAccessibilityMetadata(opfDoc) {
    const out = [];
    for (const meta of allByLocalName(opfDoc, "meta")) {
      const property = meta.getAttribute("property") || meta.getAttribute("name") || "";
      if (!/^(schema:access|dcterms:conformsTo|a11y:)/i.test(property)) continue;
      const value = cleanText(meta.getAttribute("content") || meta.textContent || "");
      if (value) out.push({ property: property.replace(/^schema:/i, "schema:"), value });
    }
    for (const link of allByLocalName(opfDoc, "link")) {
      const rel = link.getAttribute("rel") || "";
      if (/dcterms:conformsTo/i.test(rel)) out.push({ property: "dcterms:conformsTo", value: link.getAttribute("href") || "" });
    }
    return out;
  }

  function renderBookAccessibility() {
    const meta = state.a11yMeta || [];
    const show = state.format === "epub";
    els.bookA11yPanel.hidden = !show;
    if (!show) return;
    els.bookA11y.replaceChildren();
    const values = (name) => meta.filter((m) => m.property.toLowerCase() === name.toLowerCase())
      .flatMap((m) => m.value.split(/\s*,\s*/).length > 1 && name !== "schema:accessModeSufficient" ? m.value.split(/\s*,\s*/) : [m.value]);
    const has = (name, value) => values(name).some((v) => v.toLowerCase() === value.toLowerCase());
    if (!meta.length) {
      const p = document.createElement("p");
      p.textContent = t("a11yNoMeta");
      els.bookA11y.appendChild(p);
      return;
    }
    const group = (heading, items) => {
      if (!items.length) return;
      const h = document.createElement("h3");
      h.textContent = heading;
      const ul = document.createElement("ul");
      items.forEach((text) => { const li = document.createElement("li"); li.textContent = text; ul.appendChild(li); });
      els.bookA11y.append(h, ul);
    };
    const sufficient = values("schema:accessModeSufficient").map((v) => v.replace(/\s+/g, "").toLowerCase());
    const ways = [];
    ways.push(has("schema:accessibilityFeature", "displayTransformability") ? t("a11yAdjust") : t("a11yNoAdjust"));
    ways.push(sufficient.includes("textual") ? t("a11yNonvisual") : t("a11yNonvisualPartial"));
    if (has("schema:accessibilityFeature", "alternativeText")) ways.push(t("a11yAltText"));
    if (has("schema:accessibilityFeature", "longDescription")) ways.push(t("a11yLongDesc"));
    group(t("a11yWaysOfReading"), ways);
    const nav = [];
    if (has("schema:accessibilityFeature", "tableOfContents")) nav.push(t("a11yToc"));
    if (has("schema:accessibilityFeature", "structuralNavigation")) nav.push(t("a11yStructure"));
    if (has("schema:accessibilityFeature", "readingOrder")) nav.push(t("a11yReadingOrder"));
    group(t("a11yNavigation"), nav);
    const rich = [];
    if (has("schema:accessibilityFeature", "ARIA")) rich.push(t("a11yAria"));
    group(t("a11yRichContent"), rich);
    const conf = values("dcterms:conformsTo").map((v) => t("a11yConformsTo", { standard: v }))
      .concat(values("a11y:certifiedBy").map((v) => t("a11yCertifiedBy", { who: v })));
    group(t("a11yConformance"), conf.length ? conf : [t("a11yNoConformance")]);
    const hazards = values("schema:accessibilityHazard").map((v) => v.trim());
    let hazardText = t("a11yHazardUnknown");
    if (hazards.some((h) => h.toLowerCase() === "none") || ["noFlashingHazard", "noSoundHazard", "noMotionSimulationHazard"].every((h) => hazards.includes(h))) hazardText = t("a11yNoHazards");
    else if (hazards.length) hazardText = t("a11yHazardList", { list: hazards.join(", ") });
    group(t("a11yHazards"), [hazardText]);
    const summary = values("schema:accessibilitySummary").join(" ");
    if (summary) {
      const h = document.createElement("h3");
      h.textContent = t("a11ySummary");
      const p = document.createElement("p");
      p.textContent = summary;
      if (state.bookLanguage) p.lang = state.bookLanguage;
      els.bookA11y.append(h, p);
    }
    const details = document.createElement("details");
    const sum = document.createElement("summary");
    sum.textContent = t("a11yAllMeta");
    const ul = document.createElement("ul");
    meta.forEach((m) => { const li = document.createElement("li"); li.textContent = `${m.property}: ${m.value}`; ul.appendChild(li); });
    details.append(sum, ul);
    els.bookA11y.appendChild(details);
  }

  async function renderPdfPage(pageNumber) {
    if (state.format !== "pdf" || !state.pdfDoc) return;
    const nextPage = clamp(pageNumber, 1, state.pdfPageCount);
    const token = state.pdfRenderToken + 1;
    state.pdfRenderToken = token;
    const pageChanged = state.pdfPage !== nextPage || !els.pdfCanvas.dataset.renderedPage;
    state.pdfPage = nextPage;
    if (pageChanged) announce(t("pageAnnounce", { current: nextPage, total: state.pdfPageCount }));

    showPanel("pdf");
    updateReaderState();

    const page = await state.pdfDoc.getPage(nextPage);
    if (token !== state.pdfRenderToken) return;

    const baseViewport = page.getViewport({ scale: 1 });
    const availableWidth = Math.max(320, els.pdfViewer.clientWidth - 32);
    const fitScale = clamp(availableWidth / baseViewport.width, 0.5, 2.4);
    const viewport = page.getViewport({ scale: fitScale * state.fontScale });
    const canvas = els.pdfCanvas;
    const context = canvas.getContext("2d", { alpha: false });
    const ratio = window.devicePixelRatio || 1;

    canvas.removeAttribute("data-rendered-page");
    canvas.width = Math.floor(viewport.width * ratio);
    canvas.height = Math.floor(viewport.height * ratio);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, viewport.width, viewport.height);

    await page.render({ canvasContext: context, viewport }).promise;
    canvas.dataset.renderedPage = String(nextPage);
    canvas.setAttribute("aria-label", t("pageAnnounce", { current: nextPage, total: state.pdfPageCount }));
    savePosition({ page: state.pdfPage });
    // Text alternative for the canvas: the page's own text layer, in reading order as PDF.js returns it.
    if (!state.pdfTextAllowed) {
      els.pdfText.textContent = t("pdfTextRestricted");
      return;
    }
    try {
      const content = await page.getTextContent();
      if (token !== state.pdfRenderToken) return;
      const text = content.items.map((item) => (item.str || "") + (item.hasEOL ? "\n" : " ")).join("").replace(/[ \t]+\n/g, "\n").trim();
      els.pdfText.textContent = text || t("pdfTextEmpty");
    } catch (_) {
      els.pdfText.textContent = t("pdfTextEmpty");
    }
  }

  function renderTextDocument() {
    els.textViewer.style.setProperty("--doc-font-scale", state.fontScale.toFixed(2));
    els.textViewer.innerHTML = state.textHtml;
    showPanel("text");
    updateReaderState();
    savePosition({ index: 0 });
  }

  function renderHtmlDocument() {
    els.frame.srcdoc = prepareChapterDocument(state.textRaw, "standalone.html", "");
    showPanel("epub");
    updateReaderState();
    savePosition({ index: 0 });
  }

  function renderCbzPage(index) {
    if (state.format !== "cbz" || !state.imagePages.length) return;
    const nextImage = clamp(index, 0, state.imagePages.length - 1);
    if (nextImage !== state.currentImagePage) announce(t("pageAnnounce", { current: nextImage + 1, total: state.imagePages.length }));
    state.currentImagePage = nextImage;
    const page = state.imagePages[state.currentImagePage];
    els.textViewer.style.setProperty("--doc-font-scale", "1");
    els.textViewer.innerHTML = `
      <figure class="image-page">
        <img src="${page.url}" alt="${escapeHtml(page.label)}">
        <figcaption>${escapeHtml(page.label)}</figcaption>
      </figure>
    `;
    showPanel("text");
    updateReaderState();
    savePosition({ index: state.currentImagePage });
  }

  function prepareChapterDocument(html, chapterPath, fragment) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const baseDir = dirname(chapterPath);

    doc.querySelectorAll("base, iframe, object, embed").forEach((node) => node.remove());
    doc.querySelectorAll("meta[http-equiv]").forEach((node) => {
      const value = (node.getAttribute("http-equiv") || "").toLowerCase();
      if (value.includes("refresh") || value.includes("content-security-policy")) node.remove();
    });
    doc.querySelectorAll("form").forEach((form) => {
      form.removeAttribute("action");
      form.setAttribute("autocomplete", "off");
    });

    rewriteElementUrls(doc, baseDir);
    rewriteInteractiveLinks(doc, chapterPath);
    rewriteInlineStyles(doc, baseDir);

    const title = escapeHtml(state.bookTitle);
    const root = doc.documentElement;
    const lang = root.getAttribute("lang") || root.getAttribute("xml:lang") || state.bookLanguage || "";
    const dir = root.getAttribute("dir") || "";
    const dark = state.accessibility.theme === "night" || state.accessibility.theme === "highContrast";
    const htmlAttrs = [
      lang ? `lang="${escapeHtml(lang)}"` : "",
      dir ? `dir="${escapeHtml(dir)}"` : "",
      root.getAttribute("class") ? `class="${escapeHtml(root.getAttribute("class"))}"` : "",
      `data-theme="${dark ? "dark" : "light"}"`,
      `data-reader-theme="${escapeHtml(state.accessibility.theme)}"`,
      state.accessibility.reduceMotion ? 'data-reduced-motion="true"' : ""
    ].filter(Boolean).join(" ");
    const head = doc.head ? doc.head.innerHTML : "";
    const body = doc.body ? doc.body.innerHTML : doc.documentElement.innerHTML;
    const readerCss = readerShellCss();
    const bridge = readerBridgeScript(fragment);
    const csp = [
      "default-src 'none'",
      "img-src data: blob:",
      "media-src data: blob:",
      "font-src data:",
      "style-src 'unsafe-inline' data:",
      "script-src 'unsafe-inline' data:",
      "connect-src blob:",
      "worker-src blob:",
      "frame-src 'none'",
      "form-action 'none'",
      "base-uri 'none'"
    ].join("; ");

    return `<!doctype html>
<html ${htmlAttrs}>
<head>
  <meta charset="utf-8">
  <meta name="color-scheme" content="${dark ? "dark" : "light"}">
  <meta http-equiv="Content-Security-Policy" content="${csp}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>${readerCss}</style>
  ${head}
</head>
<body>${body}${bridge}</body>
</html>`;
  }

  function rewriteElementUrls(doc, baseDir) {
    const attrTargets = [
      ["img", "src"],
      ["image", "href"],
      ["audio", "src"],
      ["video", "src"],
      ["source", "src"],
      ["track", "src"],
      ["script", "src"]
    ];

    for (const [selector, attr] of attrTargets) {
      doc.querySelectorAll(`${selector}[${attr}]`).forEach((node) => {
        const value = node.getAttribute(attr);
        const rewritten = resourceUrlFor(baseDir, value);
        if (rewritten) {
          node.setAttribute(attr, rewritten);
        } else {
          node.removeAttribute(attr);
        }
      });
    }

    doc.querySelectorAll("[srcset]").forEach((node) => node.removeAttribute("srcset"));

    doc.querySelectorAll("[poster]").forEach((node) => {
      const value = node.getAttribute("poster");
      const rewritten = resourceUrlFor(baseDir, value);
      if (rewritten) node.setAttribute("poster", rewritten);
      else node.removeAttribute("poster");
    });

    doc.querySelectorAll("link[href]").forEach((node) => {
      const rel = (node.getAttribute("rel") || "").toLowerCase();
      const value = node.getAttribute("href");
      if (rel.includes("stylesheet")) {
        const rewritten = resourceUrlFor(baseDir, value);
        if (rewritten) node.setAttribute("href", rewritten);
        else node.remove();
      } else if (isBlockedProtocol(value || "")) {
        node.remove();
      }
    });
  }

  function rewriteInteractiveLinks(doc, chapterPath) {
    doc.querySelectorAll("a[href]").forEach((anchor) => {
      const href = anchor.getAttribute("href") || "";
      const lowered = href.trim().toLowerCase();
      if (lowered.startsWith("javascript:")) {
        anchor.removeAttribute("href");
        return;
      }

      anchor.setAttribute("data-epub-href", href);
      anchor.setAttribute("href", "#");
      anchor.setAttribute("rel", "noopener noreferrer");
    });

    doc.documentElement.setAttribute("data-epub-path", chapterPath);
  }

  function rewriteInlineStyles(doc, baseDir) {
    doc.querySelectorAll("style").forEach((node) => {
      node.textContent = rewriteCssUrls(node.textContent || "", baseDir);
    });

    doc.querySelectorAll("[style]").forEach((node) => {
      const style = node.getAttribute("style") || "";
      node.setAttribute("style", rewriteCssUrls(style, baseDir));
    });
  }

  function rewriteCssUrls(cssText, baseDir) {
    return cssText.replace(/url\(\s*(['"]?)(.*?)\1\s*\)/gi, (match, quote, rawUrl) => {
      const value = rawUrl.trim();
      if (!value || value.startsWith("#") || value.startsWith("data:") || value.startsWith("blob:")) {
        return match;
      }

      const rewritten = resourceUrlFor(baseDir, value);
      return rewritten ? `url("${rewritten}")` : "url(\"\")";
    }).replace(/@import\s+(['"])(.*?)\1/gi, (match, quote, rawUrl) => {
      const rewritten = resourceUrlFor(baseDir, rawUrl);
      return rewritten ? `@import "${rewritten}"` : "";
    });
  }

  function resourceUrlFor(baseDir, rawHref) {
    if (!rawHref) return "";
    const href = rawHref.trim();
    if (href.startsWith("data:") || href.startsWith("blob:")) return href;
    if (isBlockedProtocol(href)) return "";
    const resolved = resolveHref(baseDir, href);
    if (resolved.external || !resolved.path) return "";
    return state.resourceUrls.get(resolved.path) || "";
  }

  function readerShellCss() {
    const settings = state.accessibility;
    const palette = themePalette(settings.theme);
    const scale = state.fontScale.toFixed(2);
    const maxWidth = TEXT_WIDTHS[settings.textWidth];
    const fontFamily = FONT_STACKS[settings.fontFamily];
    const letterSpacing = settings.letterSpacing ? "0.045em" : "0";

    return `
      html {
        background: ${palette.bg};
        color: ${palette.ink};
        color-scheme: ${settings.theme === "night" || settings.theme === "highContrast" ? "dark" : "light"};
        font-size: calc(18px * ${scale});
      }
      body:has(canvas, [role="application"], .stage) {
        max-width: none !important;
        padding: 12px clamp(8px, 2vw, 24px) 48px !important;
      }
      body {
        max-width: ${maxWidth};
        margin: 0 auto;
        padding: 32px clamp(18px, 5vw, 56px) 72px;
        font-family: ${fontFamily};
        line-height: ${settings.lineHeight.toFixed(2)};
        letter-spacing: ${letterSpacing};
        overflow-wrap: anywhere;
      }
      img, video, svg, canvas {
        max-width: 100%;
        height: auto;
      }
      body:has(#renderCanvas) {
        max-width: none !important;
        height: auto !important;
        min-height: 0 !important;
        padding: 0 !important;
        overflow: auto !important;
      }
      body:has(#renderCanvas) .viewer-stage {
        height: clamp(320px, 54vh, 520px) !important;
        min-height: clamp(320px, 54vh, 520px) !important;
      }
      body:has(#renderCanvas) #renderCanvas {
        height: clamp(320px, 54vh, 520px) !important;
        min-height: clamp(320px, 54vh, 520px) !important;
      }
      body:has(#renderCanvas) .viewer-stage:fullscreen,
      body:has(#renderCanvas) .viewer-stage:-webkit-full-screen {
        width: 100vw !important;
        height: 100vh !important;
        min-height: 100vh !important;
      }
      body:has(#renderCanvas) .viewer-stage:fullscreen #renderCanvas,
      body:has(#renderCanvas) .viewer-stage:-webkit-full-screen #renderCanvas {
        height: 100vh !important;
        min-height: 100vh !important;
      }
      audio, video {
        width: 100%;
      }
      a {
        color: ${palette.link};
      }
      button, input, select, textarea {
        font: inherit;
      }
      table {
        max-width: 100%;
        border-collapse: collapse;
      }
      td, th {
        border: 1px solid ${palette.tableLine};
        padding: 0.35em 0.5em;
      }
      @media (max-width: 640px) {
        body {
          padding: 22px 16px 64px;
        }
      }
    `;
  }

  function readerBridgeScript(fragment) {
    return `<script>
(() => {
  const source = ${JSON.stringify(EPUB_SOURCE)};
  const fragment = ${JSON.stringify(fragment || "")};
  const send = (payload) => parent.postMessage(Object.assign({ source }, payload), "*");

  const focusTarget = (target, atTop) => {
    if (!target) return;
    if (!target.hasAttribute("tabindex") && !/^(a|button|input|select|textarea)$/i.test(target.tagName)) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    if (atTop) window.scrollTo(0, 0);
    else if (target.scrollIntoView) target.scrollIntoView({ block: "start" });
  };
  document.addEventListener("click", (event) => {
    const anchor = event.target.closest && event.target.closest("a[data-epub-href]");
    if (!anchor) return;
    event.preventDefault();
    const href = anchor.getAttribute("data-epub-href") || "";
    if (href.startsWith("#") && href.length > 1) {
      let id = href.slice(1);
      try { id = decodeURIComponent(id); } catch (_) {}
      const target = document.getElementById(id) || document.getElementsByName(id)[0];
      if (target) { focusTarget(target); return; }
    }
    send({ type: "navigate", href });
  });
  window.addEventListener("message", (event) => {
    if (event.source !== parent) return;
    const data = event.data || {};
    if (data.source !== source) return;
    if (data.type === "focus-content") {
      const target = (fragment && (document.getElementById(fragment) || document.getElementsByName(fragment)[0]))
        || ["main h1", "h1", "[role=main]", "main"].map((s) => document.querySelector(s)).find(Boolean) || document.body;
      focusTarget(target, !fragment);
    }
  });

  window.addEventListener("error", (event) => {
    send({ type: "runtime-error", message: event.message || "Script error" });
  });

  const jumpToFragment = () => {
    if (!fragment) return;
    const target = document.getElementById(fragment) || document.getElementsByName(fragment)[0];
    if (target && target.scrollIntoView) target.scrollIntoView();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", jumpToFragment, { once: true });
  } else {
    jumpToFragment();
  }
  send({ type: "ready", lang: document.documentElement.lang || "", title: document.title || "" });
})();
</script>`;
  }

  function markdownToHtml(markdown) {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    const html = [];
    let inCode = false;
    let codeLines = [];
    let listOpen = false;
    let paragraph = [];

    const closeList = () => {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
    };

    const flushParagraph = () => {
      if (!paragraph.length) return;
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    };

    for (const line of lines) {
      if (/^\s*```/.test(line)) {
        flushParagraph();
        closeList();
        if (inCode) {
          html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
          codeLines = [];
          inCode = false;
        } else {
          inCode = true;
        }
        continue;
      }

      if (inCode) {
        codeLines.push(line);
        continue;
      }

      if (!line.trim()) {
        flushParagraph();
        closeList();
        continue;
      }

      const heading = line.match(/^(#{1,6})\s+(.+)$/);
      if (heading) {
        flushParagraph();
        closeList();
        const level = heading[1].length;
        html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
        continue;
      }

      const bullet = line.match(/^\s*[-*+]\s+(.+)$/);
      if (bullet) {
        flushParagraph();
        if (!listOpen) {
          html.push("<ul>");
          listOpen = true;
        }
        html.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
        continue;
      }

      paragraph.push(line.trim());
    }

    flushParagraph();
    closeList();
    if (inCode) html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);

    return html.join("\n") || `<p>${escapeHtml(t("emptyReadableText"))}</p>`;
  }

  function inlineMarkdown(text) {
    const code = [];
    let output = escapeHtml(text).replace(/`([^`]+)`/g, (match, value) => {
      const token = `@@CODE${code.length}@@`;
      code.push(`<code>${value}</code>`);
      return token;
    });

    output = output
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<span class="blocked-link" title="${escapeHtml(t("markdownLinkBlocked"))}">$1</span>`);

    code.forEach((value, index) => {
      output = output.replace(`@@CODE${index}@@`, value);
    });
    return output;
  }

  function paragraphsToHtml(paragraphs, title) {
    const body = paragraphs.length
      ? paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")
      : `<p>${escapeHtml(t("emptyReadableText"))}</p>`;
    return `<h1>${escapeHtml(title)}</h1>\n${body}`;
  }

  function extractParagraphsByLocalNames(doc, names) {
    const wanted = new Set(names);
    return [...doc.getElementsByTagName("*")]
      .filter((node) => wanted.has(node.localName))
      .map((node) => cleanText(node.textContent || ""))
      .filter(Boolean);
  }

  function htmlToPlainText(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    doc.querySelectorAll("script, style, svg").forEach((node) => node.remove());
    return cleanText(doc.body ? doc.body.textContent : doc.textContent);
  }

  function handleFrameMessage(event) {
    if (state.format !== "epub") return;
    if (!els.frame.contentWindow || event.source !== els.frame.contentWindow) return;
    const data = event.data || {};
    if (data.source !== EPUB_SOURCE) return;

    if (data.type === "navigate") {
      handleBookLink(data.href || "");
      return;
    }

    if (data.type === "runtime-error") {
      showToast(t("sandboxRuntimeError"));
      return;
    }

    if (data.type === "ready") {
      state.chapterLanguage = typeof data.lang === "string" ? data.lang : "";
      if (state.focusContentOnReady) {
        state.focusContentOnReady = false;
        els.frame.focus();
        postToFrame({ type: "focus-content" });
      }
    }
  }

  function handleBookLink(href) {
    const current = state.spine[state.currentIndex];
    if (!current) return;

    const basePath = state.currentDocPath || current.path;
    const resolved = resolveHref(dirname(basePath), href);
    if (resolved.external) {
      showToast(t("externalBlocked"));
      return;
    }

    const targetPath = resolved.path || basePath;
    const targetIndex = findSpineIndex(targetPath);
    if (targetIndex >= 0) {
      // Following a link to an interactive page means the reader wants that page, not its text version.
      if (textFallbackFor(state.spine[targetIndex])) state.preferText = false;
      goToChapter(targetIndex, resolved.fragment || "", { alt: false, focus: true });
      return;
    }
    // Not in the spine: a manifest fallback (text version) or another document of the book.
    const targetItem = [...state.manifest.values()].find((item) => item.path === targetPath && isDocumentItem(item));
    if (!targetItem) {
      showToast(t("linkNoChapter"));
      return;
    }
    const owner = state.spine.findIndex((item) => {
      const fb = textFallbackFor(item);
      return fb && fb.path === targetPath;
    });
    if (owner >= 0) {
      goToChapter(owner, resolved.fragment || "", { alt: true, focus: true });
    } else {
      goToChapter(state.currentIndex, resolved.fragment || "", { docItem: targetItem, focus: true });
    }
  }

  async function readCurrentTextAloud() {
    if (!("speechSynthesis" in window)) {
      showToast(t("speechUnsupported"));
      return;
    }

    const text = cleanText(await currentReadableText());
    if (!text) {
      showToast(t("speechNoText"));
      return;
    }

    window.speechSynthesis.cancel();
    speechUtterance = new SpeechSynthesisUtterance(text.slice(0, 12000));
    const contentLanguage = state.format === "epub" ? (state.chapterLanguage || state.bookLanguage) : "";
    speechUtterance.lang = contentLanguage || (state.language === "el" ? "el-GR" : "en-US");
    speechUtterance.rate = 0.95;
    speechUtterance.onend = () => {
      speechUtterance = null;
      updateReaderState();
    };
    speechUtterance.onerror = () => {
      speechUtterance = null;
      updateReaderState();
    };
    window.speechSynthesis.speak(speechUtterance);
    els.stopSpeechButton.disabled = false;
    updateReaderState();
  }

  function stopSpeech() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    speechUtterance = null;
    if (els.stopSpeechButton) els.stopSpeechButton.disabled = true;
  }

  async function currentReadableText() {
    if (state.format === "epub") {
      const item = state.spine[state.currentIndex];
      const file = item && getZipFile(state.currentDocPath || item.path);
      return file ? htmlToPlainText(await file.async("text")) : "";
    }
    if (state.format === "pdf" && state.pdfDoc) {
      if (!state.pdfTextAllowed) return "";
      const page = await state.pdfDoc.getPage(state.pdfPage);
      const content = await page.getTextContent();
      return content.items.map((item) => item.str || "").join(" ");
    }
    if (state.format === "html") return htmlToPlainText(state.textRaw);
    if (state.format === "cbz") {
      const page = state.imagePages[state.currentImagePage];
      return page ? `${t("pageLabel", { number: state.currentImagePage + 1 })}. ${page.label}` : "";
    }
    return state.textRaw || htmlToPlainText(state.textHtml || "");
  }

  function adjustFont(delta) {
    if (!state.format) return;
    setAccessibility({ fontScale: Number((state.fontScale + delta).toFixed(2)) });
  }

  function toggleTheme() {
    const current = THEMES.indexOf(state.theme);
    const nextTheme = THEMES[(current + 1) % THEMES.length] || "paper";
    setAccessibility({ theme: nextTheme });
  }

  function showPanel(panel) {
    els.empty.hidden = panel !== "empty";
    els.frame.hidden = panel !== "epub";
    els.pdfViewer.hidden = panel !== "pdf";
    els.textViewer.hidden = panel !== "text";
  }

  function updateReaderState() {
    const position = currentPosition();
    const current = position.current;
    const total = position.total;
    const progress = total ? (current / total) * 100 : 0;
    const title = state.bookTitle || t("noBook");

    els.bookTitle.textContent = state.format ? `${title} - ${current} / ${total}` : t("noBook");
    els.chapterIndicator.textContent = `${current} / ${total}`;
    els.progressBar.style.width = `${progress}%`;

    const canMove = state.format === "epub" || state.format === "pdf" || state.format === "cbz";
    const atStart = current <= 1;
    const atEnd = current >= total;
    els.prevButton.disabled = !canMove || atStart;
    els.mobilePrevButton.disabled = !canMove || atStart;
    els.nextButton.disabled = !canMove || atEnd;
    els.mobileNextButton.disabled = !canMove || atEnd;
    els.prevEdge.hidden = !canMove;
    els.nextEdge.hidden = !canMove;
    els.prevEdge.disabled = !canMove || atStart;
    els.nextEdge.disabled = !canMove || atEnd;
    els.readerPane.classList.toggle("with-edges", canMove);
    els.bookHeading.hidden = !state.format;
    els.bookHeading.textContent = state.format ? title : "";
    const fallbackAvailable = state.format === "epub" && Boolean(textFallbackFor(state.spine[state.currentIndex]));
    els.altButton.hidden = !fallbackAvailable;
    els.altButton.setAttribute("aria-pressed", String(fallbackAvailable && state.altView));
    els.fontDownButton.disabled = !state.format;
    els.fontUpButton.disabled = !state.format;
    els.themeButton.disabled = !state.format;
    els.bookmarkButton.disabled = !state.format;
    els.addBookmarkButton.disabled = !state.format;
    els.noteInput.disabled = !state.format;
    els.saveNoteButton.disabled = !state.format;
    els.exportLearningButton.disabled = !state.format;
    els.searchInput.disabled = !state.searchIndex.length;
    els.searchButton.disabled = !state.searchIndex.length;
    els.readAloudButton.disabled = !state.format || !("speechSynthesis" in window);
    els.stopSpeechButton.disabled = !("speechSynthesis" in window) || (!window.speechSynthesis.speaking && !speechUtterance);
    markActiveToc();
  }

  function currentPosition() {
    if (state.format === "epub") {
      return { current: state.currentIndex + 1, total: state.spine.length || 1 };
    }
    if (state.format === "pdf") {
      return { current: state.pdfPage || 1, total: state.pdfPageCount || 1 };
    }
    if (state.format === "cbz") {
      return { current: state.currentImagePage + 1, total: state.imagePages.length || 1 };
    }
    if (state.format === "text" || state.format === "markdown" || state.format === "docx" || state.format === "odt" || state.format === "fb2" || state.format === "html") {
      return { current: 1, total: 1 };
    }
    return { current: 0, total: 0 };
  }

  function markActiveToc() {
    const buttons = [...els.tocList.querySelectorAll("button")];
    buttons.forEach((button, index) => {
      const entry = state.toc[index];
      let active = false;
      if (entry && entry.type === "epub") active = entry.index === state.currentIndex;
      if (entry && entry.type === "pdf") active = entry.index + 1 === state.pdfPage;
      if (entry && entry.type === "cbz") active = entry.index === state.currentImagePage;
      if (entry && entry.type === "html") active = state.format === "html";
      if (entry && entry.type === "text") active = ["text", "markdown", "docx", "odt", "fb2"].includes(state.format);
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function setReaderEnabled(enabled) {
    if (enabled) {
      updateReaderState();
      return;
    }

    [
      els.prevButton,
      els.nextButton,
      els.mobilePrevButton,
      els.mobileNextButton,
      els.fontDownButton,
      els.fontUpButton,
      els.themeButton,
      els.bookmarkButton,
      els.addBookmarkButton,
      els.noteInput,
      els.saveNoteButton,
      els.exportLearningButton,
      els.searchInput,
      els.searchButton,
      els.readAloudButton,
      els.stopSpeechButton
    ].forEach((control) => {
      control.disabled = true;
    });

    els.prevEdge.hidden = true;
    els.nextEdge.hidden = true;
    els.progressBar.style.width = "0";
    els.chapterIndicator.textContent = "0 / 0";
    els.bookTitle.textContent = t("noBook");
    els.searchResults.replaceChildren();
    els.tocList.replaceChildren();
  }

  function setBusy(isBusy) {
    document.body.classList.toggle("is-busy", isBusy);
  }

  function resetBook() {
    stopSpeech();
    revokeResourceUrls();
    state.format = null;
    state.zip = null;
    state.opfPath = "";
    state.opfBase = "";
    state.bookTitle = "";
    state.bookKey = "";
    state.manifest = new Map();
    state.spine = [];
    state.toc = [];
    state.currentIndex = 0;
    state.pdfDoc = null;
    state.pdfTextAllowed = true;
    state.pdfPage = 1;
    state.pdfPageCount = 0;
    state.pdfRenderToken += 1;
    state.textRaw = "";
    state.textHtml = "";
    state.imagePages = [];
    state.currentImagePage = 0;
    state.searchIndex = [];
    state.learning = null;
    state.bookLanguage = "";
    state.chapterLanguage = "";
    state.a11yMeta = [];
    state.altView = false;
    state.currentDocPath = "";
    state.focusContentOnReady = false;
    els.bookA11yPanel.hidden = true;
    els.bookA11y.replaceChildren();
    els.frame.removeAttribute("srcdoc");
    els.textViewer.replaceChildren();
    const context = els.pdfCanvas.getContext("2d");
    context.clearRect(0, 0, els.pdfCanvas.width, els.pdfCanvas.height);
    showPanel("empty");
    renderLearningPanel();
    setReaderEnabled(false);
  }

  function revokeResourceUrls() {
    state.resourceUrls = new Map();
  }

  function savePosition(position) {
    if (!state.bookKey) return;
    try {
      localStorage.setItem(`edu-ebook:${state.bookKey}`, JSON.stringify(position || {}));
    } catch (_) {
      // Position and learning data remain available for this session when storage is blocked.
    }
    recordLearningProgress(position || {});
  }

  function readSavedPosition() {
    if (!state.bookKey) return {};
    try {
      return JSON.parse(localStorage.getItem(`edu-ebook:${state.bookKey}`) || "{}");
    } catch {
      return {};
    }
  }

  function learningStorageKey() {
    return state.bookKey ? `${LEARNING_KEY_PREFIX}${state.bookKey}` : "";
  }

  function emptyLearningRecord() {
    return { version: 1, bookmarks: [], notes: [], visited: [] };
  }

  function loadLearningRecord() {
    state.learning = emptyLearningRecord();
    const key = learningStorageKey();
    if (!key) return;
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "{}");
      state.learning.bookmarks = Array.isArray(saved.bookmarks) ? saved.bookmarks.slice(0, 200) : [];
      state.learning.notes = Array.isArray(saved.notes) ? saved.notes.slice(0, 300) : [];
      state.learning.visited = Array.isArray(saved.visited) ? saved.visited.slice(0, 2000) : [];
    } catch (_) {
      // Start a fresh local learning record if an old value cannot be read.
    }
    renderLearningPanel();
  }

  function saveLearningRecord() {
    const key = learningStorageKey();
    if (!key || !state.learning) return;
    try {
      localStorage.setItem(key, JSON.stringify(state.learning));
    } catch (_) {
      // Keep the record in memory if storage is unavailable.
    }
  }

  function learningLocation(position = {}) {
    if (state.format === "epub") {
      return { kind: "epub", index: state.currentIndex, fragment: position.fragment || "" };
    }
    if (state.format === "pdf") return { kind: "pdf", page: state.pdfPage };
    if (state.format === "cbz") return { kind: "cbz", index: state.currentImagePage };
    return { kind: "document", index: 0 };
  }

  function locationKey(location) {
    if (location.kind === "epub") return `epub:${location.index}`;
    if (location.kind === "pdf") return `pdf:${location.page}`;
    if (location.kind === "cbz") return `cbz:${location.index}`;
    return "document:0";
  }

  function locationLabel(location) {
    if (location.kind === "epub") return t("chapterLocation", { number: Number(location.index || 0) + 1 });
    if (location.kind === "pdf") return t("pageLocation", { number: Number(location.page || 1) });
    if (location.kind === "cbz") return t("pageLocation", { number: Number(location.index || 0) + 1 });
    return t("documentLocation");
  }

  function recordLearningProgress(position) {
    if (!state.learning || !state.format) return;
    const location = learningLocation(position);
    const key = locationKey(location);
    if (!state.learning.visited.includes(key)) state.learning.visited.push(key);
    saveLearningRecord();
    renderLearningPanel();
  }

  function addBookmark() {
    if (!state.learning || !state.format) return;
    const location = learningLocation(readSavedPosition());
    const key = locationKey(location);
    if (state.learning.bookmarks.some((bookmark) => locationKey(bookmark.location || {}) === key)) {
      showToast(t("bookmarkExists"));
      return;
    }
    state.learning.bookmarks.unshift({
      id: `bookmark-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      location,
      createdAt: new Date().toISOString()
    });
    saveLearningRecord();
    renderLearningPanel();
    showToast(t("bookmarkAdded"));
  }

  function saveNote() {
    if (!state.learning || !state.format) return;
    const text = cleanText(els.noteInput.value);
    if (!text) {
      showToast(t("noteEmpty"));
      return;
    }
    state.learning.notes.unshift({
      id: `note-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text,
      location: learningLocation(readSavedPosition()),
      createdAt: new Date().toISOString()
    });
    els.noteInput.value = "";
    saveLearningRecord();
    renderLearningPanel();
    showToast(t("noteAdded"));
  }

  function goToLearningLocation(location) {
    if (!location || !state.format) return;
    if (location.kind === "epub" && state.format === "epub") {
      goToChapter(clamp(Number(location.index) || 0, 0, Math.max(0, state.spine.length - 1)), location.fragment || "");
    } else if (location.kind === "pdf" && state.format === "pdf") {
      renderPdfPage(clamp(Number(location.page) || 1, 1, state.pdfPageCount));
    } else if (location.kind === "cbz" && state.format === "cbz") {
      renderCbzPage(clamp(Number(location.index) || 0, 0, Math.max(0, state.imagePages.length - 1)));
    }
  }

  function removeLearningItem(type, id) {
    if (!state.learning) return;
    const key = type === "bookmark" ? "bookmarks" : "notes";
    state.learning[key] = state.learning[key].filter((item) => item.id !== id);
    saveLearningRecord();
    renderLearningPanel();
  }

  function createLearningItem(label, action, removeAction) {
    const item = document.createElement("li");
    const main = document.createElement("button");
    main.type = "button";
    main.className = "learning-item-main";
    main.textContent = label;
    main.addEventListener("click", action);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "learning-item-delete";
    remove.textContent = "×";
    remove.setAttribute("aria-label", t("deleteLearningItem"));
    remove.title = t("deleteLearningItem");
    remove.addEventListener("click", removeAction);
    item.append(main, remove);
    return item;
  }

  function renderLearningPanel() {
    const active = Boolean(state.format && state.learning);
    els.learningProgress.textContent = active
      ? t("learningProgress", {
        visited: Math.min(state.learning.visited.length, currentPosition().total),
        total: currentPosition().total,
        percent: Math.round((Math.min(state.learning.visited.length, currentPosition().total) / Math.max(1, currentPosition().total)) * 100)
      })
      : t("learningEmpty");
    els.bookmarkList.replaceChildren();
    els.noteList.replaceChildren();
    if (!active || !state.learning.bookmarks.length) {
      const empty = document.createElement("li");
      empty.className = "learning-empty";
      empty.textContent = t("bookmarksEmpty");
      els.bookmarkList.appendChild(empty);
    } else {
      state.learning.bookmarks.forEach((bookmark) => {
        els.bookmarkList.appendChild(createLearningItem(
          locationLabel(bookmark.location || {}),
          () => goToLearningLocation(bookmark.location),
          () => removeLearningItem("bookmark", bookmark.id)
        ));
      });
    }
    if (!active || !state.learning.notes.length) {
      const empty = document.createElement("li");
      empty.className = "learning-empty";
      empty.textContent = t("notesEmpty");
      els.noteList.appendChild(empty);
    } else {
      state.learning.notes.forEach((note) => {
        const label = `${locationLabel(note.location || {})}: ${note.text}`;
        els.noteList.appendChild(createLearningItem(
          label,
          () => goToLearningLocation(note.location),
          () => removeLearningItem("note", note.id)
        ));
      });
    }
  }

  function exportLearning() {
    if (!state.learning || !state.format) return;
    const data = {
      app: "Edu Ebook Reader",
      exportedAt: new Date().toISOString(),
      book: { title: state.bookTitle, format: state.format },
      bookmarks: state.learning.bookmarks,
      notes: state.learning.notes
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFileName(state.bookTitle || "learning-notes")}-notes.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    showToast(t("learningExported"));
  }

  function parseXml(text) {
    // A UTF-8 byte-order mark before the XML declaration makes DOMParser fail; it is not content.
    const doc = new DOMParser().parseFromString(String(text || "").replace(/^\uFEFF/, ""), "application/xml");
    if (doc.querySelector("parsererror")) throw new Error(t("invalidXml"));
    return doc;
  }

  // Respect the PDF's permission flags: text is extracted (shown, searched, read aloud) only when
  // the document allows copying, or allows extraction for accessibility. No restriction is removed.
  async function pdfTextExtractionAllowed(doc, lib) {
    try {
      const perms = await doc.getPermissions();
      if (!perms) return true;
      const flags = (lib && lib.PermissionFlag) || { COPY: 16, COPY_FOR_ACCESSIBILITY: 512 };
      return perms.includes(flags.COPY) || perms.includes(flags.COPY_FOR_ACCESSIBILITY);
    } catch (_) {
      return false;
    }
  }

  async function epubHasDrm() {
    if (!state.zip) return false;
    const names = Object.keys(state.zip.files || {}).map((n) => n.toLowerCase());
    const hasMarker = names.some((n) =>
      n === "meta-inf/rights.xml" || n.endsWith("/rights.xml") ||
      n === "meta-inf/license.lcpl" || n.endsWith("/license.lcpl") || n.endsWith(".lcpl"));
    if (hasMarker) return true;
    const enc = getZipFile("META-INF/encryption.xml");
    if (enc) {
      try {
        const doc = parseXml(await enc.async("text"));
        const fontAlgos = ["http://www.idpf.org/2008/embedding", "http://ns.adobe.com/pdf/enc#rc"];
        const methods = allByLocalName(doc, "EncryptionMethod");
        const realEncryption = methods.some((m) => {
          const algo = (m.getAttribute("Algorithm") || "").toLowerCase();
          return algo && !fontAlgos.includes(algo);
        });
        if (realEncryption) return true;
      } catch (err) {
        return true;
      }
    }
    return false;
  }

  function getZipFile(path) {
    if (!state.zip) return null;
    return state.zip.file(path) || state.zip.file(path.replace(/\//g, "\\"));
  }

  function zipFile(zip, path) {
    return zip.file(path) || zip.file(path.replace(/\//g, "\\"));
  }

  function dataUrl(mediaType, base64) {
    return `data:${mediaType};base64,${base64}`;
  }

  function textDataUrl(mediaType, text) {
    return `data:${mediaType};charset=utf-8,${encodeURIComponent(text)}`;
  }

  function allByLocalName(root, localName) {
    return [...root.getElementsByTagName("*")].filter((node) => node.localName === localName);
  }

  function firstByLocalName(root, localName) {
    return allByLocalName(root, localName)[0] || null;
  }

  function isDocumentItem(item) {
    return /xhtml|html/i.test(item.mediaType) || /\.(xhtml|html|htm)$/i.test(item.path);
  }

  function resolveHref(baseDir, rawHref) {
    const href = (rawHref || "").trim();
    if (!href) return { path: "", fragment: "" };
    if (isBlockedProtocol(href)) return { external: true, path: "", fragment: "" };

    const hashIndex = href.indexOf("#");
    const pathPart = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    const fragment = hashIndex >= 0 ? href.slice(hashIndex + 1) : "";

    if (!pathPart) return { path: "", fragment: safeDecode(fragment) };

    const noQuery = pathPart.split("?")[0];
    const decoded = safeDecode(noQuery);
    const path = decoded.startsWith("/")
      ? normalizeZipPath(decoded.slice(1))
      : normalizeZipPath(`${baseDir}/${decoded}`);

    return { path, fragment: safeDecode(fragment) };
  }

  function isBlockedProtocol(value) {
    const trimmed = value.trim().toLowerCase();
    if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) return false;
    return /^[a-z][a-z0-9+.-]*:/.test(trimmed);
  }

  function normalizeZipPath(path) {
    const parts = [];
    for (const part of path.replace(/\\/g, "/").split("/")) {
      if (!part || part === ".") continue;
      if (part === "..") {
        parts.pop();
      } else {
        parts.push(part);
      }
    }
    return parts.join("/");
  }

  function dirname(path) {
    const normalized = normalizeZipPath(path);
    const index = normalized.lastIndexOf("/");
    return index >= 0 ? normalized.slice(0, index) : "";
  }

  function safeDecode(value) {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  function cleanText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function findSpineIndex(path) {
    const normalized = normalizeZipPath(path);
    return state.spine.findIndex((item) => item.path === normalized);
  }

  function titleFromFile(fileName) {
    return fileName.replace(/\.[^.]+$/, "") || t("fallbackBookTitle");
  }

  function safeFileName(value) {
    return String(value || "book")
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "book";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function showToast(message) {
    if (!message) return;
    window.clearTimeout(state.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("visible");
    state.toastTimer = window.setTimeout(() => {
      els.toast.classList.remove("visible");
    }, 3200);
  }
})();
