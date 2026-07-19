const APP_VERSION = "0.5.4";

const text = {
  en: {
    subtitle: "Create EPUB 3 learning books for Edu Ebook Reader",
    uiLanguage: "Language",
    newProject: "New",
    saveProject: "Save JSON",
    openProject: "Open JSON",
    checkEpub: "Check EPUB",
    exportEpub: "Export EPUB",
    chapters: "Chapters",
    addChapter: "Add chapter",
    importMenu: "Import…",
    importHtml: "Import HTML chapter",
    importWord: "Import Word",
    wordImporting: "Importing Word document…",
    wordImported: "Word document imported.",
    mammothMissing: "Word import library is missing.",
    importDoc: "Import text/Markdown",
    importEpub: "Import EPUB",
    mdImported: "Markdown imported.",
    txtImported: "Text imported.",
    epubImporting: "Importing EPUB…",
    epubImported: "EPUB chapters imported.",
    noEpubChapters: "No readable chapters found in this EPUB.",
    markedMissing: "Markdown library is missing.",
    drmBlockedImport: "This EPUB appears to use DRM or encryption and cannot be imported.",
    importHtmlPackage: "Import HTML package",
    moveUp: "Up",
    moveDown: "Down",
    deleteChapter: "Delete",
    assets: "Assets",
    assetHint: "Use Insert asset to add a new file into the chapter. Double-click an existing asset here to insert it again.",
    title: "Title",
    creator: "Author",
    language: "Book language",
    license: "License",
    chapterTitle: "Chapter title",
    description: "Book description",
    visual: "Visual",
    source: "XHTML",
    preview: "Preview",
    alignLeft: "Align left",
    alignCenter: "Center",
    alignRight: "Align right",
    alignJustify: "Justify",
    note: "Note",
    quiz: "Quiz",
    columnSplit: "Left %",
    twoColumns: "2 Columns",
    leftColumn: "Left column",
    rightColumn: "Right column",
    twoColumnsInserted: "Two-column layout inserted.",
    insertAsset: "Insert asset",
    status: "Status",
    ready: "Ready.",
    exported: "EPUB exported.",
    validationPassed: "EPUB check passed. Ready to export.",
    validationIssues: "The EPUB check found {count} item(s). Review them before export.",
    validationClean: "No issues found. The EPUB is ready to export.",
    validationExport: "Export anyway",
    saved: "Project JSON saved.",
    loaded: "Project loaded.",
    assetAdded: "Assets added.",
    assetInserted: "Asset inserted.",
    sourceFormatted: "XHTML updated.",
    libraryTitle: "Code library",
    libraryHint: "Insert ready EPUB-safe learning blocks into the current chapter.",
    librarySearch: "Search blocks",
    libraryCategory: "Category",
    allSnippets: "All",
    insertSnippet: "Insert",
    snippetInserted: "Library block inserted.",
    chooseAssetFile: "Choose a file to insert into the chapter.",
    htmlAdded: "HTML chapter imported.",
    htmlPackageAdded: "HTML package imported.",
    noHtmlInPackage: "No HTML file found in the selected package.",
    noChapter: "No chapter selected.",
    selectAsset: "Select an asset first.",
    visualOnly: "This tool can be used only in XHTML chapters.",
    jszipMissing: "JSZip is missing. Check that vendor/jszip.min.js exists.",
    confirmNew: "Start a new project and discard unsaved changes?",
    confirmDelete: "Delete this chapter?",
    cover: "Cover",
    chooseCover: "Choose image",
    removeCover: "Remove",
    coverSet: "Cover image set.",
    coverRemoved: "Cover image removed.",
    coverInvalid: "Please choose an image file for the cover.",
    loadError: "Could not open this project file.",
    importError: "Could not import this file.",
    linkButton: "Link",
    altButton: "Alt text",
    deleteAsset: "Delete asset",
    confirmDeleteAsset: "Remove this asset from the book?",
    assetDeleted: "Asset removed.",
    linkPrompt: "Enter the link URL:",
    altPrompt: "Describe the image (alt text):",
    altSet: "Image description updated.",
    noImageSelected: "Click an image in the editor first.",
    restorePrompt: "Restore your unsaved project from the last session?",
  },
  el: {
    subtitle: "Δημιουργία EPUB 3 εκπαιδευτικών βιβλίων για τον Edu Ebook Reader",
    uiLanguage: "Γλώσσα",
    newProject: "Νέο",
    saveProject: "Αποθήκευση JSON",
    openProject: "Άνοιγμα JSON",
    exportEpub: "Εξαγωγή EPUB",
    chapters: "Κεφάλαια",
    addChapter: "Προσθήκη κεφαλαίου",
    importMenu: "Εισαγωγή…",
    importHtml: "Εισαγωγή HTML κεφαλαίου",
    importWord: "Εισαγωγή Word",
    wordImporting: "Εισαγωγή εγγράφου Word…",
    wordImported: "Το έγγραφο Word εισήχθη.",
    mammothMissing: "Λείπει η βιβλιοθήκη εισαγωγής Word.",
    importDoc: "Εισαγωγή κειμένου/Markdown",
    importEpub: "Εισαγωγή EPUB",
    mdImported: "Το Markdown εισήχθη.",
    txtImported: "Το κείμενο εισήχθη.",
    epubImporting: "Εισαγωγή EPUB…",
    epubImported: "Τα κεφάλαια του EPUB εισήχθησαν.",
    noEpubChapters: "Δεν βρέθηκαν αναγνώσιμα κεφάλαια στο EPUB.",
    markedMissing: "Λείπει η βιβλιοθήκη Markdown.",
    drmBlockedImport: "Αυτό το EPUB φαίνεται να έχει DRM/κρυπτογράφηση και δεν μπορεί να εισαχθεί.",
    importHtmlPackage: "Εισαγωγή HTML πακέτου",
    moveUp: "Πάνω",
    moveDown: "Κάτω",
    deleteChapter: "Διαγραφή",
    assets: "Αρχεία",
    assetHint: "Το Insert asset προσθέτει νέο αρχείο στο κεφάλαιο. Με διπλό κλικ σε υπάρχον asset το εισάγεις ξανά.",
    title: "Τίτλος",
    creator: "Συγγραφέας",
    language: "Γλώσσα βιβλίου",
    license: "Άδεια",
    chapterTitle: "Τίτλος κεφαλαίου",
    description: "Περιγραφή βιβλίου",
    visual: "Οπτική επεξεργασία",
    source: "XHTML",
    preview: "Προεπισκόπηση",
    alignLeft: "Στοίχιση αριστερά",
    alignCenter: "Κεντράρισμα",
    alignRight: "Στοίχιση δεξιά",
    alignJustify: "Πλήρης στοίχιση",
    note: "Σημείωση",
    quiz: "Ερώτηση",
    columnSplit: "Αριστερή %",
    twoColumns: "2 στήλες",
    leftColumn: "Αριστερή στήλη",
    rightColumn: "Δεξιά στήλη",
    twoColumnsInserted: "Η δίστηλη διάταξη εισήχθη.",
    insertAsset: "Εισαγωγή αρχείου",
    status: "Κατάσταση",
    ready: "Έτοιμο.",
    exported: "Το EPUB εξήχθη.",
    saved: "Το project JSON αποθηκεύτηκε.",
    loaded: "Το project φορτώθηκε.",
    assetAdded: "Τα αρχεία προστέθηκαν.",
    assetInserted: "Το αρχείο εισήχθη στο κεφάλαιο.",
    chooseAssetFile: "Επίλεξε αρχείο για να εισαχθεί στο κεφάλαιο.",
    htmlAdded: "Το HTML κεφάλαιο εισήχθη.",
    htmlPackageAdded: "Το HTML πακέτο εισήχθη.",
    noHtmlInPackage: "Δεν βρέθηκε HTML αρχείο στο επιλεγμένο πακέτο.",
    noChapter: "Δεν έχει επιλεγεί κεφάλαιο.",
    selectAsset: "Επίλεξε πρώτα ένα αρχείο.",
    visualOnly: "Αυτό το εργαλείο χρησιμοποιείται μόνο σε XHTML κεφάλαια.",
    jszipMissing: "Λείπει το JSZip. Έλεγξε ότι υπάρχει το vendor/jszip.min.js.",
    confirmNew: "Να ξεκινήσει νέο project και να χαθούν οι μη αποθηκευμένες αλλαγές;",
    confirmDelete: "Να διαγραφεί αυτό το κεφάλαιο;",
    cover: "Εξώφυλλο",
    chooseCover: "Επιλογή εικόνας",
    removeCover: "Αφαίρεση",
    coverSet: "Το εξώφυλλο ορίστηκε.",
    coverRemoved: "Το εξώφυλλο αφαιρέθηκε.",
    coverInvalid: "Επίλεξε αρχείο εικόνας για το εξώφυλλο.",
    loadError: "Δεν ήταν δυνατό το άνοιγμα του αρχείου project.",
    importError: "Δεν ήταν δυνατή η εισαγωγή του αρχείου.",
    linkButton: "Σύνδεσμος",
    altButton: "Εναλλ. κείμενο",
    deleteAsset: "Διαγραφή αρχείου",
    confirmDeleteAsset: "Να αφαιρεθεί αυτό το αρχείο από το βιβλίο;",
    assetDeleted: "Το αρχείο αφαιρέθηκε.",
    linkPrompt: "Δώσε τη διεύθυνση του συνδέσμου:",
    altPrompt: "Περιγραφή εικόνας (alt):",
    altSet: "Η περιγραφή της εικόνας ενημερώθηκε.",
    noImageSelected: "Κάνε πρώτα κλικ σε μια εικόνα στον επεξεργαστή.",
    restorePrompt: "Να επαναφερθεί το μη αποθηκευμένο project από την προηγούμενη συνεδρία;",
  },
};

Object.assign(text.el, {
  libraryTitle: "\u0392\u03b9\u03b2\u03bb\u03b9\u03bf\u03b8\u03ae\u03ba\u03b7 \u03ba\u03ce\u03b4\u03b9\u03ba\u03b1",
  libraryHint: "\u0395\u03b9\u03c3\u03ac\u03b3\u03b5\u03b9 \u03ad\u03c4\u03bf\u03b9\u03bc\u03b1 EPUB-safe \u03b5\u03ba\u03c0\u03b1\u03b9\u03b4\u03b5\u03c5\u03c4\u03b9\u03ba\u03ac blocks \u03c3\u03c4\u03bf \u03c4\u03c1\u03ad\u03c7\u03bf\u03bd \u03ba\u03b5\u03c6\u03ac\u03bb\u03b1\u03b9\u03bf.",
  librarySearch: "\u0391\u03bd\u03b1\u03b6\u03ae\u03c4\u03b7\u03c3\u03b7 blocks",
  libraryCategory: "\u039a\u03b1\u03c4\u03b7\u03b3\u03bf\u03c1\u03af\u03b1",
  allSnippets: "\u038c\u03bb\u03b1",
  insertSnippet: "\u0395\u03b9\u03c3\u03b1\u03b3\u03c9\u03b3\u03ae",
  snippetInserted: "\u03a4\u03bf block \u03c4\u03b7\u03c2 \u03b2\u03b9\u03b2\u03bb\u03b9\u03bf\u03b8\u03ae\u03ba\u03b7\u03c2 \u03b5\u03b9\u03c3\u03ae\u03c7\u03b8\u03b7.",
  checkEpub: "\u0388\u03bb\u03b5\u03b3\u03c7\u03bf\u03c2 EPUB",
  validationPassed: "\u039f \u03ad\u03bb\u03b5\u03b3\u03c7\u03bf\u03c2 EPUB \u03bf\u03bb\u03bf\u03ba\u03bb\u03b7\u03c1\u03ce\u03b8\u03b7\u03ba\u03b5. \u0388\u03c4\u03bf\u03b9\u03bc\u03bf \u03b3\u03b9\u03b1 \u03b5\u03be\u03b1\u03b3\u03c9\u03b3\u03ae.",
  validationIssues: "\u039f \u03ad\u03bb\u03b5\u03b3\u03c7\u03bf\u03c2 EPUB \u03b2\u03c1\u03ae\u03ba\u03b5 {count} \u03b8\u03ad\u03bc\u03b1(\u03c4\u03b1). \u0394\u03b5\u03c2 \u03c4\u03b1 \u03c0\u03c1\u03b9\u03bd \u03c4\u03b7\u03bd \u03b5\u03be\u03b1\u03b3\u03c9\u03b3\u03ae.",
  validationClean: "\u0394\u03b5\u03bd \u03b2\u03c1\u03ad\u03b8\u03b7\u03ba\u03b1\u03bd \u03c0\u03c1\u03bf\u03b2\u03bb\u03ae\u03bc\u03b1\u03c4\u03b1. \u03a4\u03bf EPUB \u03b5\u03af\u03bd\u03b1\u03b9 \u03ad\u03c4\u03bf\u03b9\u03bc\u03bf \u03b3\u03b9\u03b1 \u03b5\u03be\u03b1\u03b3\u03c9\u03b3\u03ae.",
  validationExport: "\u0395\u03be\u03b1\u03b3\u03c9\u03b3\u03ae \u03bf\u03cd\u03c4\u03c9\u03c2 \u03ae \u03ac\u03bb\u03bb\u03c9\u03c2"
});

const state = {
  uiLanguage: "en",
  selectedChapterId: "",
  selectedAssetId: "",
  activeMode: "visual",
  meta: {
    title: "Interactive Learning Book",
    creator: "Georgios Korakakis",
    language: "en",
    license: "CC BY 4.0",
    description: "An educational EPUB created with Edu EPUB Creator.",
  },
  chapters: [],
  assets: [],
  cover: null,
};

const exportText = {
  en: { toc: "Contents", navTitle: "Navigation", cover: "Cover", start: "Start reading" },
  el: { toc: "Περιεχόμενα", navTitle: "Πλοήγηση", cover: "Εξώφυλλο", start: "Αρχή ανάγνωσης" },
};

let projectDirty = false;
let lastSelectedImage = null;
let autosaveTimer = null;
let savedEditorRange = null;
let pendingValidatedExport = false;
const AUTOSAVE_KEY = "eduEpubCreator:autosave";

const els = {};

const codeLibrarySnippets = [
  {
    id: "learning-objectives",
    category: "Structure",
    title: "Learning objectives",
    description: "A short objective list at the beginning of a section.",
    code: `<section class="callout learning-objectives">
  <h2>Learning objectives</h2>
  <ul>
    <li>Explain the main concept in your own words.</li>
    <li>Identify the key visual or interactive evidence.</li>
    <li>Apply the idea to a short activity.</li>
  </ul>
</section>`
  },
  {
    id: "key-concept",
    category: "Structure",
    title: "Key concept",
    description: "Definition block for an important term or principle.",
    code: `<section class="definition-card">
  <h2>Key concept</h2>
  <p><strong>Term:</strong> Write the scientific term here.</p>
  <p>Write a clear definition and one short example.</p>
</section>`
  },
  {
    id: "two-column-explanation",
    category: "Layout",
    title: "Two-column explanation",
    description: "Text on one side and visual or activity material on the other.",
    code: () => {
      const left = sanitizeColumnPercent(els.columnLeftInput.value);
      const right = 100 - left;
      return [
        `<section class="edu-columns" data-columns="2" data-left="${left}" data-right="${right}" style="grid-template-columns: ${left}fr ${right}fr;">`,
        `  <div class="edu-column">`,
        `    <h2>Explanation</h2>`,
        `    <p>Write the core explanation here.</p>`,
        `  </div>`,
        `  <div class="edu-column">`,
        `    <h2>Activity</h2>`,
        `    <p>Add an image, video, 3D model or question here.</p>`,
        `  </div>`,
        `</section>`
      ].join("\n");
    }
  },
  {
    id: "image-figure",
    category: "Media",
    title: "Image with caption",
    description: "Accessible figure markup. Replace src with an inserted asset path.",
    code: `<figure class="image-figure">
  <img src="../assets/images/example.png" alt="Describe the educational meaning of the image" />
  <figcaption>Figure 1. Write a short explanatory caption.</figcaption>
</figure>`
  },
  {
    id: "video-transcript",
    category: "Media",
    title: "Video with transcript",
    description: "Video block with accessible transcript text.",
    code: `<section class="media-transcript">
  <h2>Video activity</h2>
  <video controls="controls" src="../assets/video/example.mp4">
    Video file: example.mp4
  </video>
  <details>
    <summary>Transcript</summary>
    <p>Write the spoken text or a concise description of the video here.</p>
  </details>
</section>`
  },
  {
    id: "interactive-3d",
    category: "Interactive",
    title: "Interactive 3D frame",
    description: "Iframe block for an HTML/Babylon/Three.js interactive asset.",
    code: `<section class="interactive-asset">
  <h2>Interactive 3D model</h2>
  <iframe class="interactive-asset-frame" src="../assets/interactive/model.html" title="Interactive 3D model"></iframe>
  <p>Use the model to rotate, zoom and inspect the structure.</p>
</section>`
  },
  {
    id: "interactive-3d-lesson",
    category: "Interactive",
    title: "3D lesson with accessible alternative",
    description: "A complete 3D activity with learning goal, instructions, text alternative and self-check.",
    code: `<section class="interactive-lesson" data-interactive="3d">
  <h2>3D lesson title</h2>
  <p class="learning-goal"><strong>Learning goal:</strong> State what learners should identify or explain after exploring the model.</p>
  <iframe class="interactive-asset-frame" src="../assets/interactive/model.html" title="Interactive 3D model: describe the model"></iframe>
  <p class="interaction-guide"><strong>How to use it:</strong> Drag to rotate, use the mouse wheel or pinch gesture to zoom, then reset the view when needed.</p>
  <details class="interactive-fallback">
    <summary>Text alternative to the 3D model</summary>
    <p>Describe the important shapes, parts, spatial relationships and the scientific conclusion. Add a labelled 2D image if the model is essential to the activity.</p>
  </details>
  <section class="knowledge-check">
    <h3>Check your understanding</h3>
    <p>What observation in the model supports the learning goal?</p>
    <details><summary>Suggested answer</summary><p>Write a concise answer and explanation.</p></details>
  </section>
</section>`
  },
  {
    id: "self-check",
    category: "Assessment",
    title: "Self-check question",
    description: "Multiple-choice question with a hidden answer.",
    code: `<section class="callout quiz">
  <h2>Check your understanding</h2>
  <p><strong>Question:</strong> Write your question here.</p>
  <ol>
    <li>Option A</li>
    <li>Option B</li>
    <li>Option C</li>
  </ol>
  <details>
    <summary>Show answer</summary>
    <p>Write the correct answer and a short explanation.</p>
  </details>
</section>`
  },
  {
    id: "reflection-prompt",
    category: "Assessment",
    title: "Reflection prompt",
    description: "Short metacognitive activity for students.",
    code: `<section class="reflection-prompt">
  <h2>Reflection</h2>
  <p>What was the most important idea in this section?</p>
  <p>Write one example where this idea appears in a real learning context.</p>
</section>`
  },
  {
    id: "data-table",
    category: "Data",
    title: "Accessible data table",
    description: "Table with caption, header row and clear labels.",
    code: `<table class="data-table">
  <caption>Table 1. Replace with a descriptive table title.</caption>
  <thead>
    <tr>
      <th scope="col">Variable</th>
      <th scope="col">Observation</th>
      <th scope="col">Interpretation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Example</td>
      <td>Write the observation</td>
      <td>Write the interpretation</td>
    </tr>
  </tbody>
</table>`
  },
  {
    id: "summary-box",
    category: "Structure",
    title: "Summary box",
    description: "End-of-section recap with the main points.",
    code: `<section class="summary-box">
  <h2>Summary</h2>
  <ul>
    <li>First key point.</li>
    <li>Second key point.</li>
    <li>One open question for further study.</li>
  </ul>
</section>`
  },
  {
    id: "lead-paragraph",
    category: "Text",
    title: "Lead paragraph",
    description: "Larger introductory paragraph to open a section.",
    code: `<p class="lead">Write an engaging introduction that sets up the section.</p>`
  },
  {
    id: "pull-quote",
    category: "Text",
    title: "Pull quote",
    description: "Highlighted quotation with attribution.",
    code: `<blockquote class="pullquote">
  <p>Write a memorable quotation here.</p>
  <cite>Source or author</cite>
</blockquote>`
  },
  {
    id: "drop-cap",
    category: "Text",
    title: "Drop-cap paragraph",
    description: "Decorative large first letter for a chapter opening.",
    code: `<p class="dropcap">Write the opening paragraph. The first letter becomes a decorative drop cap.</p>`
  },
  {
    id: "decorative-divider",
    category: "Text",
    title: "Decorative divider",
    description: "Centered horizontal rule between sections.",
    code: `<hr class="edu-divider" />`
  },
  {
    id: "page-break",
    category: "Text",
    title: "Page break",
    description: "Forces the following content onto a new page in the reader.",
    code: `<div class="page-break" role="separator" aria-hidden="true"></div>`
  },
  {
    id: "tip-box",
    category: "Callouts",
    title: "Tip box",
    description: "Friendly hint or study tip.",
    code: `<section class="callout tip">
  <h2>Tip</h2>
  <p>Write a helpful tip or shortcut here.</p>
</section>`
  },
  {
    id: "warning-box",
    category: "Callouts",
    title: "Warning box",
    description: "Caution or safety note.",
    code: `<section class="callout warning">
  <h2>Warning</h2>
  <p>Write an important caution or safety note here.</p>
</section>`
  },
  {
    id: "important-box",
    category: "Callouts",
    title: "Important box",
    description: "Critical information to emphasize.",
    code: `<section class="callout important">
  <h2>Important</h2>
  <p>Write the critical point students must remember.</p>
</section>`
  },
  {
    id: "worked-example",
    category: "Callouts",
    title: "Worked example",
    description: "Step-by-step worked example.",
    code: `<section class="callout example">
  <h2>Example</h2>
  <p>Describe the problem, then show the steps to the solution.</p>
</section>`
  },
  {
    id: "did-you-know",
    category: "Callouts",
    title: "Did you know?",
    description: "Interesting fact to spark curiosity.",
    code: `<section class="callout did-you-know">
  <h2>Did you know?</h2>
  <p>Share a surprising fact related to the topic.</p>
</section>`
  },
  {
    id: "key-terms",
    category: "Callouts",
    title: "Key terms",
    description: "Glossary list of terms and definitions.",
    code: `<section class="callout key-terms">
  <h2>Key terms</h2>
  <dl>
    <dt>Term one</dt>
    <dd>Short definition.</dd>
    <dt>Term two</dt>
    <dd>Short definition.</dd>
  </dl>
</section>`
  },
  {
    id: "text-image-right",
    category: "Layout",
    title: "Text + image (right)",
    description: "Explanation on the left, image placeholder on the right.",
    code: `<section class="edu-columns" data-columns="2" data-left="60" data-right="40" style="grid-template-columns: 60fr 40fr;">
  <div class="edu-column">
    <h2>Explanation</h2>
    <p>Write the explanation here.</p>
  </div>
  <div class="edu-column">
    <figure class="image-figure figure-center">
      <div class="image-placeholder">Click here, then use Insert asset to add an image.</div>
      <figcaption>Short caption.</figcaption>
    </figure>
  </div>
</section>`
  },
  {
    id: "image-left-text",
    category: "Layout",
    title: "Image + text (left)",
    description: "Image placeholder on the left, explanation on the right.",
    code: `<section class="edu-columns" data-columns="2" data-left="40" data-right="60" style="grid-template-columns: 40fr 60fr;">
  <div class="edu-column">
    <figure class="image-figure figure-center">
      <div class="image-placeholder">Click here, then use Insert asset to add an image.</div>
      <figcaption>Short caption.</figcaption>
    </figure>
  </div>
  <div class="edu-column">
    <h2>Explanation</h2>
    <p>Write the explanation here.</p>
  </div>
</section>`
  },
  {
    id: "three-columns",
    category: "Layout",
    title: "Three columns",
    description: "Three equal content cards in a row.",
    code: `<section class="edu-grid edu-grid-3">
  <div class="edu-card"><h3>Column 1</h3><p>Write content here.</p></div>
  <div class="edu-card"><h3>Column 2</h3><p>Write content here.</p></div>
  <div class="edu-card"><h3>Column 3</h3><p>Write content here.</p></div>
</section>`
  },
  {
    id: "card-row",
    category: "Layout",
    title: "Card row",
    description: "Two highlight cards side by side.",
    code: `<section class="edu-grid edu-grid-2">
  <div class="edu-card"><h3>Card title</h3><p>Card text.</p></div>
  <div class="edu-card"><h3>Card title</h3><p>Card text.</p></div>
</section>`
  },
  {
    id: "boxed-section",
    category: "Layout",
    title: "Boxed section",
    description: "Bordered container to group related content.",
    code: `<section class="boxed">
  <h2>Section title</h2>
  <p>Group related content inside this box.</p>
</section>`
  },
  {
    id: "image-gallery",
    category: "Media",
    title: "Image gallery",
    description: "Grid of three image placeholders with captions.",
    code: `<section class="edu-gallery">
  <figure><div class="image-placeholder">Image 1</div><figcaption>Caption 1</figcaption></figure>
  <figure><div class="image-placeholder">Image 2</div><figcaption>Caption 2</figcaption></figure>
  <figure><div class="image-placeholder">Image 3</div><figcaption>Caption 3</figcaption></figure>
</section>`
  },
  {
    id: "centered-image",
    category: "Media",
    title: "Centered image",
    description: "Single centered figure with a caption.",
    code: `<figure class="image-figure figure-center">
  <div class="image-placeholder">Click here, then use Insert asset to add an image.</div>
  <figcaption>Figure caption.</figcaption>
</figure>`
  },
  {
    id: "audio-clip",
    category: "Media",
    title: "Audio clip",
    description: "Audio player with a short description.",
    code: `<section class="media-transcript">
  <h2>Audio</h2>
  <audio controls="controls" src="../assets/audio/example.mp3">Audio file: example.mp3</audio>
  <p>Briefly describe the audio content.</p>
</section>`
  },
  {
    id: "true-false",
    category: "Assessment",
    title: "True / False",
    description: "Statement with a hidden answer.",
    code: `<section class="callout quiz">
  <h2>True or false?</h2>
  <p>Write a statement students must judge.</p>
  <details>
    <summary>Show answer</summary>
    <p>True or False - explain why.</p>
  </details>
</section>`
  },
  {
    id: "fill-blank",
    category: "Assessment",
    title: "Fill in the blank",
    description: "Sentence with a missing word and answer.",
    code: `<section class="callout quiz">
  <h2>Fill in the blank</h2>
  <p>The process of ______ converts light into chemical energy.</p>
  <details>
    <summary>Show answer</summary>
    <p>Write the correct word here.</p>
  </details>
</section>`
  },
  {
    id: "checklist",
    category: "Assessment",
    title: "Checklist",
    description: "Tick-style list of items to complete.",
    code: `<ul class="checklist">
  <li>First thing to check.</li>
  <li>Second thing to check.</li>
  <li>Third thing to check.</li>
</ul>`
  },
  {
    id: "flashcards",
    category: "Interactive",
    title: "Flashcards (accordion)",
    description: "Expandable question and answer cards.",
    code: `<section class="accordion">
  <details><summary>Question 1</summary><p>Answer 1.</p></details>
  <details><summary>Question 2</summary><p>Answer 2.</p></details>
  <details><summary>Question 3</summary><p>Answer 3.</p></details>
</section>`
  },
  {
    id: "numbered-steps",
    category: "Structure",
    title: "Numbered steps",
    description: "Step-by-step numbered procedure.",
    code: `<ol class="steps">
  <li>First step.</li>
  <li>Second step.</li>
  <li>Third step.</li>
</ol>`
  },
  {
    id: "timeline",
    category: "Structure",
    title: "Timeline",
    description: "Vertical list of events or stages.",
    code: `<ol class="timeline">
  <li><strong>Stage or date</strong><p>Describe what happens.</p></li>
  <li><strong>Stage or date</strong><p>Describe what happens.</p></li>
</ol>`
  },
  {
    id: "section-intro",
    category: "Structure",
    title: "Section intro",
    description: "Title with a subtitle line.",
    code: `<header class="section-intro">
  <h1>Section title</h1>
  <p class="section-subtitle">A short subtitle that frames the section.</p>
</header>`
  },
  {
    id: "primary-button",
    category: "Buttons",
    title: "Button",
    description: "Link styled as a button (works in readers).",
    code: `<p class="button-row"><a class="edu-button" href="#">Button label</a></p>`
  },
  {
    id: "button-group",
    category: "Buttons",
    title: "Button group",
    description: "Primary and secondary buttons side by side.",
    code: `<p class="button-row"><a class="edu-button" href="#">Primary</a><a class="edu-button ghost" href="#">Secondary</a></p>`
  },
  {
    id: "cta-box",
    category: "Buttons",
    title: "Call-to-action box",
    description: "Highlighted box with a heading and a button.",
    code: `<section class="cta-box">
  <h2>Ready to practice?</h2>
  <p>Encourage the next action here.</p>
  <p class="button-row"><a class="edu-button" href="#">Start activity</a></p>
</section>`
  },
  {
    id: "page-nav-buttons",
    category: "Buttons",
    title: "Previous / Next",
    description: "Navigation buttons between sections.",
    code: `<nav class="page-nav">
  <a class="edu-button ghost" href="#">Previous</a>
  <a class="edu-button" href="#">Next</a>
</nav>`
  }
];

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  bindEvents();
  createInitialProject();
  restoreLocalIfAvailable();
  applyLanguage();
  renderAll();
});

function bindElements() {
  [
    "languageSelect",
    "uiLanguageLabel",
    "appSubtitle",
    "newProjectButton",
    "saveProjectButton",
    "openProjectButton",
    "openProjectInput",
    "exportButton",
    "checkEpubButton",
    "chaptersTitle",
    "addChapterButton",
    "importMenuSummary",
    "importHtmlButton",
    "importHtmlInput",
    "importWordButton",
    "importWordInput",
    "importDocButton",
    "importDocInput",
    "importEpubButton",
    "importEpubInput",
    "importHtmlPackageButton",
    "importHtmlPackageInput",
    "chapterList",
    "moveUpButton",
    "moveDownButton",
    "deleteChapterButton",
    "libraryTitle",
    "libraryHint",
    "snippetSearch",
    "libraryCategoryLabel",
    "snippetCategory",
    "snippetList",
    "bookTitle",
    "bookCreator",
    "bookLanguage",
    "bookLicense",
    "coverLabel",
    "coverButton",
    "coverInput",
    "removeCoverButton",
    "coverName",
    "bookDescription",
    "titleLabel",
    "creatorLabel",
    "bookLanguageLabel",
    "licenseLabel",
    "chapterTitleLabel",
    "chapterTitleInput",
    "chapterKindBadge",
    "visualEditor",
    "sourceEditor",
    "previewFrame",
    "visualTab",
    "sourceTab",
    "previewTab",
    "insertCalloutButton",
    "insertQuizButton",
    "columnSplitLabel",
    "columnLeftInput",
    "insertColumnsButton",
    "insertLinkButton",
    "setAltButton",
    "alignLeftButton",
    "alignCenterButton",
    "alignRightButton",
    "alignJustifyButton",
    "insertAssetButton",
    "assetInsertInput",
    "assetInput",
    "assetList",
    "assetsTitle",
    "assetHint",
    "descriptionLabel",
    "statusTitle",
    "statusMessage",
    "validationDialog",
    "validationSummary",
    "validationList",
    "validationExportButton",
    "aboutButton",
    "aboutDialog",
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  els.languageSelect.addEventListener("change", () => {
    state.uiLanguage = els.languageSelect.value;
    applyLanguage();
  });

  els.newProjectButton.addEventListener("click", () => {
    if (confirm(t("confirmNew"))) {
      createInitialProject();
      clearLocal();
      renderAll();
    }
  });
  els.saveProjectButton.addEventListener("click", saveProjectJson);
  els.openProjectInput.addEventListener("change", loadProjectJson);
  els.exportButton.addEventListener("click", exportEpub);
  els.checkEpubButton.addEventListener("click", runExportCheck);
  els.validationExportButton.addEventListener("click", () => {
    pendingValidatedExport = true;
    if (els.validationDialog.open) els.validationDialog.close();
    exportEpub();
  });
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

  els.addChapterButton.addEventListener("click", () => addChapter());
  els.importHtmlButton.addEventListener("click", () => els.importHtmlInput.click());
  els.importHtmlInput.addEventListener("change", importHtmlChapter);
  els.importWordButton.addEventListener("click", () => els.importWordInput.click());
  els.importWordInput.addEventListener("change", importWordDocx);
  els.importDocButton.addEventListener("click", () => els.importDocInput.click());
  els.importDocInput.addEventListener("change", importMarkdownOrText);
  els.importEpubButton.addEventListener("click", () => els.importEpubInput.click());
  els.importEpubInput.addEventListener("change", importEpub);
  els.importHtmlPackageButton.addEventListener("click", () => els.importHtmlPackageInput.click());
  els.importHtmlPackageInput.addEventListener("change", importHtmlPackage);
  els.moveUpButton.addEventListener("click", () => moveChapter(-1));
  els.moveDownButton.addEventListener("click", () => moveChapter(1));
  els.deleteChapterButton.addEventListener("click", deleteSelectedChapter);
  els.snippetSearch.addEventListener("input", renderSnippetLibrary);
  els.snippetCategory.addEventListener("change", renderSnippetLibrary);

  els.bookTitle.addEventListener("input", syncMetaFromForm);
  els.bookCreator.addEventListener("input", syncMetaFromForm);
  els.bookLanguage.addEventListener("change", syncMetaFromForm);
  els.bookLicense.addEventListener("change", syncMetaFromForm);
  els.bookDescription.addEventListener("input", syncMetaFromForm);

  els.chapterTitleInput.addEventListener("input", () => {
    const chapter = currentChapter();
    if (!chapter) return;
    chapter.title = els.chapterTitleInput.value || "Untitled chapter";
    markDirty();
    renderChapters();
  });

  els.visualEditor.addEventListener("input", () => {
    const chapter = currentChapter();
    if (!chapter || chapter.kind !== "xhtml") return;
    chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);
    markDirty();
  });
  els.sourceEditor.addEventListener("input", () => {
    const chapter = currentChapter();
    if (!chapter) return;
    chapter.content = els.sourceEditor.value;
    markDirty();
  });

  document.querySelectorAll(".toolbar button[data-command]").forEach((button) => {
    button.addEventListener("mousedown", (event) => {
      if (state.activeMode === "visual" || state.activeMode === "source") {
        event.preventDefault();
      }
      if (state.activeMode === "visual") {
        captureEditorSelection();
      }
    });
    button.addEventListener("click", () => runCommand(button.dataset.command, button.dataset.value));
  });
  els.insertCalloutButton.addEventListener("click", insertCallout);
  els.insertQuizButton.addEventListener("click", insertQuiz);
  els.insertColumnsButton.addEventListener("click", insertColumns);
  els.insertAssetButton.addEventListener("click", requestAssetFileForInsertion);

  els.visualTab.addEventListener("click", () => setMode("visual"));
  els.sourceTab.addEventListener("click", () => setMode("source"));
  els.previewTab.addEventListener("click", () => setMode("preview"));

  els.assetInput.addEventListener("change", (event) => addAssets(event, { insertIntoChapter: false }));
  els.assetInsertInput.addEventListener("change", (event) => addAssets(event, { insertIntoChapter: true }));
  els.assetInput.addEventListener("cancel", () => {
    setStatus(t("ready"));
  });
  els.assetInsertInput.addEventListener("cancel", () => {
    setStatus(t("ready"));
  });

  els.coverInput.addEventListener("change", setCoverFromFile);
  els.removeCoverButton.addEventListener("click", removeCover);

  els.insertLinkButton.addEventListener("click", insertLink);
  els.setAltButton.addEventListener("click", setImageAltText);
  els.visualEditor.addEventListener("click", (event) => {
    if (event.target && event.target.tagName === "IMG") {
      lastSelectedImage = event.target;
    }
    captureEditorSelection();
  });
  els.visualEditor.addEventListener("keyup", captureEditorSelection);
  els.visualEditor.addEventListener("mouseup", captureEditorSelection);
  els.visualEditor.addEventListener("blur", captureEditorSelection);

  document.addEventListener("keydown", (event) => {
    if (!(event.ctrlKey || event.metaKey)) return;
    const key = event.key.toLowerCase();
    if (key === "s") {
      event.preventDefault();
      saveProjectJson();
    } else if (key === "e") {
      event.preventDefault();
      exportEpub();
    }
  });

  window.addEventListener("beforeunload", (event) => {
    if (!projectDirty) return;
    event.preventDefault();
    event.returnValue = "";
    return "";
  });
}

function createInitialProject() {
  state.meta = {
    title: "Interactive Learning Book",
    creator: "Georgios Korakakis",
    language: "en",
    license: "CC BY 4.0",
    description: "An educational EPUB created with Edu EPUB Creator.",
  };
  state.chapters = [
    {
      id: makeId("chapter"),
      title: "Introduction",
      kind: "xhtml",
      content: "<h1>Introduction</h1><p>Write the learning goals and a short introduction here.</p>",
    },
    {
      id: makeId("chapter"),
      title: "Activity",
      kind: "xhtml",
      content: "<h1>Activity</h1><p>Add text, images, video or an interactive HTML chapter.</p>",
    },
  ];
  state.assets = [];
  state.cover = null;
  state.selectedChapterId = state.chapters[0].id;
  state.selectedAssetId = "";
  state.activeMode = "visual";
  projectDirty = false;
}

function applyLanguage() {
  els.languageSelect.value = state.uiLanguage;
  els.appSubtitle.textContent = t("subtitle");
  els.uiLanguageLabel.textContent = t("uiLanguage");
  els.newProjectButton.textContent = t("newProject");
  els.saveProjectButton.textContent = t("saveProject");
  els.openProjectButton.textContent = t("openProject");
  els.checkEpubButton.textContent = t("checkEpub");
  els.exportButton.textContent = t("exportEpub");
  els.chaptersTitle.textContent = t("chapters");
  els.addChapterButton.title = t("addChapter");
  els.addChapterButton.setAttribute("aria-label", t("addChapter"));
  els.importMenuSummary.textContent = t("importMenu");
  els.importHtmlButton.textContent = t("importHtml");
  els.importWordButton.textContent = t("importWord");
  els.importDocButton.textContent = t("importDoc");
  els.importEpubButton.textContent = t("importEpub");
  els.importHtmlPackageButton.textContent = t("importHtmlPackage");
  els.moveUpButton.textContent = t("moveUp");
  els.moveDownButton.textContent = t("moveDown");
  els.deleteChapterButton.textContent = t("deleteChapter");
  els.libraryTitle.textContent = t("libraryTitle");
  els.libraryHint.textContent = t("libraryHint");
  els.snippetSearch.placeholder = t("librarySearch");
  els.libraryCategoryLabel.textContent = t("libraryCategory");
  els.assetsTitle.textContent = t("assets");
  els.assetHint.textContent = t("assetHint");
  els.titleLabel.textContent = t("title");
  els.creatorLabel.textContent = t("creator");
  els.bookLanguageLabel.textContent = t("language");
  els.licenseLabel.textContent = t("license");
  els.chapterTitleLabel.textContent = t("chapterTitle");
  els.descriptionLabel.textContent = t("description");
  els.visualTab.textContent = t("visual");
  els.sourceTab.textContent = t("source");
  els.previewTab.textContent = t("preview");
  els.insertCalloutButton.textContent = t("note");
  els.insertQuizButton.textContent = t("quiz");
  els.columnSplitLabel.textContent = t("columnSplit");
  els.insertColumnsButton.textContent = t("twoColumns");
  els.insertLinkButton.textContent = t("linkButton");
  els.setAltButton.textContent = t("altButton");
  els.alignLeftButton.title = t("alignLeft");
  els.alignLeftButton.setAttribute("aria-label", t("alignLeft"));
  els.alignCenterButton.title = t("alignCenter");
  els.alignCenterButton.setAttribute("aria-label", t("alignCenter"));
  els.alignRightButton.title = t("alignRight");
  els.alignRightButton.setAttribute("aria-label", t("alignRight"));
  els.alignJustifyButton.title = t("alignJustify");
  els.alignJustifyButton.setAttribute("aria-label", t("alignJustify"));
  els.insertAssetButton.textContent = t("insertAsset");
  els.statusTitle.textContent = t("status");
  els.validationExportButton.textContent = t("validationExport");
  els.coverLabel.textContent = t("cover");
  els.coverButton.textContent = t("chooseCover");
  els.removeCoverButton.textContent = t("removeCover");
  renderCover();
  renderSnippetLibrary();
}

function t(key) {
  return (text[state.uiLanguage] && text[state.uiLanguage][key]) || text.en[key] || key;
}

function renderAll() {
  renderMeta();
  renderChapters();
  renderSnippetLibrary();
  renderAssets();
  renderCover();
  loadCurrentChapterIntoEditor();
  setMode(state.activeMode);
  setStatus(t("ready"));
}

function renderMeta() {
  els.bookTitle.value = state.meta.title;
  els.bookCreator.value = state.meta.creator;
  els.bookLanguage.value = state.meta.language;
  els.bookLicense.value = state.meta.license;
  els.bookDescription.value = state.meta.description;
}

function syncMetaFromForm() {
  state.meta.title = els.bookTitle.value.trim() || "Untitled EPUB";
  state.meta.creator = els.bookCreator.value.trim() || "Unknown author";
  state.meta.language = els.bookLanguage.value;
  state.meta.license = els.bookLicense.value;
  state.meta.description = els.bookDescription.value.trim();
  markDirty();
}

function renderChapters() {
  els.chapterList.innerHTML = "";
  state.chapters.forEach((chapter, index) => {
    const item = document.createElement("li");
    item.className = "chapter-item" + (chapter.id === state.selectedChapterId ? " active" : "");
    item.tabIndex = 0;
    item.innerHTML = `<strong>${escapeHtml(index + 1 + ". " + chapter.title)}</strong><span>${chapter.kind.toUpperCase()}</span>`;
    item.addEventListener("click", () => selectChapter(chapter.id));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectChapter(chapter.id);
      }
    });
    els.chapterList.appendChild(item);
  });
}

function renderSnippetLibrary() {
  const previousCategory = els.snippetCategory.value || "all";
  const categories = [...new Set(codeLibrarySnippets.map((snippet) => snippet.category))];
  els.snippetCategory.innerHTML = [
    `<option value="all">${escapeHtml(t("allSnippets"))}</option>`,
    ...categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`),
  ].join("");
  els.snippetCategory.value = categories.includes(previousCategory) ? previousCategory : "all";

  const query = normalizeSearchText(els.snippetSearch.value);
  const selectedCategory = els.snippetCategory.value;
  const snippets = codeLibrarySnippets.filter((snippet) => {
    const inCategory = selectedCategory === "all" || snippet.category === selectedCategory;
    const searchable = normalizeSearchText(`${snippet.title} ${snippet.description} ${snippet.category} ${librarySnippetCode(snippet)}`);
    return inCategory && (!query || searchable.includes(query));
  });

  els.snippetList.innerHTML = "";
  snippets.forEach((snippet) => {
    const item = document.createElement("article");
    item.className = "snippet-item";
    item.innerHTML = [
      `<div class="snippet-meta">`,
      `  <span class="snippet-category">${escapeHtml(snippet.category)}</span>`,
      `  <strong>${escapeHtml(snippet.title)}</strong>`,
      `  <p>${escapeHtml(snippet.description)}</p>`,
      `</div>`,
      `<button type="button">${escapeHtml(t("insertSnippet"))}</button>`,
    ].join("");
    item.querySelector("button").addEventListener("click", () => insertLibrarySnippet(snippet));
    els.snippetList.appendChild(item);
  });

  if (!snippets.length) {
    const empty = document.createElement("p");
    empty.className = "snippet-empty";
    empty.textContent = "No matching blocks.";
    els.snippetList.appendChild(empty);
  }
}

function insertLibrarySnippet(snippet) {
  insertHtml(librarySnippetCode(snippet));
  setStatus(t("snippetInserted"));
}

function librarySnippetCode(snippet) {
  return typeof snippet.code === "function" ? snippet.code() : snippet.code;
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderAssets() {
  els.assetList.innerHTML = "";
  if (!state.assets.length) {
    const empty = document.createElement("li");
    empty.className = "asset-empty";
    empty.textContent = state.uiLanguage === "el" ? "Δεν έχουν προστεθεί αρχεία." : "No assets added yet.";
    els.assetList.appendChild(empty);
    return;
  }
  state.assets.forEach((asset) => {
    const item = document.createElement("li");
    item.className = "asset-item" + (asset.id === state.selectedAssetId ? " active" : "");
    item.tabIndex = 0;
    item.title = asset.name;
    item.innerHTML = [
      `<strong>${escapeHtml(asset.name)}</strong>`,
      `<span>${escapeHtml(assetLabel(asset))}</span>`,
      `<small>OEBPS/assets/${escapeHtml(assetPath(asset))}</small>`,
    ].join("");
    item.addEventListener("click", () => {
      state.selectedAssetId = asset.id;
      renderAssets();
    });
    item.addEventListener("dblclick", () => {
      state.selectedAssetId = asset.id;
      renderAssets();
      insertAssetIntoChapter(asset);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        state.selectedAssetId = asset.id;
        renderAssets();
        insertAssetIntoChapter(asset);
      }
      if (event.key === " ") {
        event.preventDefault();
        state.selectedAssetId = asset.id;
        renderAssets();
      }
    });
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "asset-delete";
    deleteButton.textContent = "×";
    deleteButton.title = t("deleteAsset");
    deleteButton.setAttribute("aria-label", t("deleteAsset"));
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      removeAsset(asset.id);
    });
    item.appendChild(deleteButton);
    els.assetList.appendChild(item);
  });
}

function selectChapter(id) {
  syncEditorToChapter();
  state.selectedChapterId = id;
  loadCurrentChapterIntoEditor();
  renderChapters();
}

function loadCurrentChapterIntoEditor() {
  const chapter = currentChapter();
  if (!chapter) {
    els.chapterTitleInput.value = "";
    els.visualEditor.innerHTML = "";
    els.sourceEditor.value = "";
    return;
  }
  els.chapterTitleInput.value = chapter.title;
  els.chapterKindBadge.textContent = chapter.kind.toUpperCase();
  if (chapter.kind === "xhtml") {
    els.visualEditor.innerHTML = hydrateEditorAssetUrls(chapter.content);
    els.sourceEditor.value = chapter.content;
  } else {
    els.visualEditor.innerHTML = "<p>This is a raw HTML interactive chapter. Use XHTML/source or preview mode.</p>";
    els.sourceEditor.value = chapter.content;
  }
}

function syncEditorToChapter() {
  const chapter = currentChapter();
  if (!chapter) return;
  if (state.activeMode === "source") {
    chapter.content = els.sourceEditor.value;
  } else if (state.activeMode === "visual" && chapter.kind === "xhtml") {
    chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);
  }
}

function currentChapter() {
  return state.chapters.find((chapter) => chapter.id === state.selectedChapterId) || null;
}

function addChapter(title = "New chapter", content = "<h1>New chapter</h1><p>Write your content here.</p>", kind = "xhtml") {
  syncEditorToChapter();
  const chapter = { id: makeId("chapter"), title, kind, content };
  state.chapters.push(chapter);
  state.selectedChapterId = chapter.id;
  state.activeMode = kind === "html" ? "source" : "visual";
  markDirty();
  renderChapters();
  loadCurrentChapterIntoEditor();
  setMode(state.activeMode);
}

function moveChapter(direction) {
  const index = state.chapters.findIndex((chapter) => chapter.id === state.selectedChapterId);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= state.chapters.length) return;
  const [chapter] = state.chapters.splice(index, 1);
  state.chapters.splice(target, 0, chapter);
  markDirty();
  renderChapters();
}

function deleteSelectedChapter() {
  if (state.chapters.length <= 1) return;
  const index = state.chapters.findIndex((chapter) => chapter.id === state.selectedChapterId);
  if (index < 0 || !confirm(t("confirmDelete"))) return;
  state.chapters.splice(index, 1);
  state.selectedChapterId = state.chapters[Math.max(0, index - 1)].id;
  markDirty();
  renderChapters();
  loadCurrentChapterIntoEditor();
}

function runCommand(command, value) {
  const chapter = currentChapter();
  if (!chapter || chapter.kind !== "xhtml") {
    setStatus(t("visualOnly"));
    return;
  }

  if (state.activeMode === "source") {
    runSourceCommand(command, value);
    return;
  }

  if (state.activeMode !== "visual") {
    setMode("visual");
  }
  els.visualEditor.focus();
  restoreSavedEditorSelection();
  if (command === "formatBlock" && value) {
    document.execCommand(command, false, value);
  } else {
    document.execCommand(command, false, null);
  }
  chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);
  markDirty();
  captureEditorSelection();
}

function restoreSavedEditorSelection() {
  const selection = window.getSelection ? window.getSelection() : null;
  if (!selection || !savedEditorRange || !els.visualEditor.contains(savedEditorRange.commonAncestorContainer)) {
    return false;
  }
  selection.removeAllRanges();
  selection.addRange(savedEditorRange);
  return true;
}

function runSourceCommand(command, value) {
  if (command === "bold") {
    wrapSourceSelection("strong", "bold text");
  } else if (command === "italic") {
    wrapSourceSelection("em", "italic text");
  } else if (command === "formatBlock" && value) {
    wrapSourceBlock(value);
  } else if (command === "insertUnorderedList") {
    insertSourceUnorderedList();
  } else if (typeof command === "string" && command.indexOf("justify") === 0) {
    wrapSourceAlignment(command);
  } else {
    return;
  }

  const chapter = currentChapter();
  if (chapter) {
    chapter.content = els.sourceEditor.value;
  }
  markDirty();
  setStatus(t("sourceFormatted"));
}

function wrapSourceSelection(tag, placeholder) {
  const start = els.sourceEditor.selectionStart || 0;
  const end = els.sourceEditor.selectionEnd || start;
  const selected = els.sourceEditor.value.slice(start, end);
  const content = selected || placeholder;
  const open = `<${tag}>`;
  const close = `</${tag}>`;
  replaceSourceRange(start, end, `${open}${content}${close}`, start + open.length, start + open.length + content.length);
}

function wrapSourceBlock(tag) {
  const start = els.sourceEditor.selectionStart || 0;
  const end = els.sourceEditor.selectionEnd || start;
  const value = els.sourceEditor.value;
  const lineStart = start === end ? value.lastIndexOf("\n", Math.max(0, start - 1)) + 1 : start;
  const nextBreak = start === end ? value.indexOf("\n", end) : end;
  const lineEnd = nextBreak === -1 ? value.length : nextBreak;
  const selected = value.slice(lineStart, lineEnd);
  const content = selected.trim() || (tag === "p" ? "Paragraph text" : "Heading text");
  const open = `<${tag}>`;
  const replacement = `${open}${content}</${tag}>`;
  replaceSourceRange(lineStart, lineEnd, replacement, lineStart + open.length, lineStart + open.length + content.length);
}

function insertSourceUnorderedList() {
  const start = els.sourceEditor.selectionStart || 0;
  const end = els.sourceEditor.selectionEnd || start;
  const selected = els.sourceEditor.value.slice(start, end);
  const items = selected
    ? selected.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
    : ["List item"];
  const list = `<ul>\n${items.map((item) => `  <li>${item}</li>`).join("\n")}\n</ul>`;
  replaceSourceRange(start, end, list, start + list.length, start + list.length);
}

function replaceSourceRange(start, end, replacement, selectionStart, selectionEnd) {
  const before = els.sourceEditor.value.slice(0, start);
  const after = els.sourceEditor.value.slice(end);
  els.sourceEditor.value = before + replacement + after;
  els.sourceEditor.focus();
  els.sourceEditor.setSelectionRange(selectionStart, selectionEnd);
}

function wrapSourceAlignment(command) {
  const map = { justifyLeft: "left", justifyCenter: "center", justifyRight: "right", justifyFull: "justify" };
  const align = map[command] || "left";
  const start = els.sourceEditor.selectionStart || 0;
  const end = els.sourceEditor.selectionEnd || start;
  const selected = els.sourceEditor.value.slice(start, end).trim();
  const content = selected || "Aligned text";
  const open = `<div style="text-align: ${align};">`;
  const replacement = `${open}${content}</div>`;
  replaceSourceRange(start, end, replacement, start + open.length, start + open.length + content.length);
}

function insertHtml(html) {
  const chapter = currentChapter();
  if (!chapter) {
    setStatus(t("noChapter"));
    return;
  }
  markDirty();

  if (chapter.kind === "html" || state.activeMode === "source") {
    setMode("source");
    insertIntoTextarea(els.sourceEditor, html);
    chapter.content = els.sourceEditor.value;
    setStatus(t("assetInserted"));
    return;
  }

  if (state.activeMode !== "visual") setMode("visual");
  insertHtmlIntoVisualEditor(html);
  chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);
  setStatus(t("assetInserted"));
}

function insertCallout() {
  insertHtml('<section class="callout"><h2>Note</h2><p>Add an important explanation or instruction here.</p></section>');
}

function insertQuiz() {
  insertHtml('<section class="callout quiz"><h2>Check your understanding</h2><p>Question: write your question here.</p><ol><li>Option A</li><li>Option B</li><li>Option C</li></ol><details><summary>Show answer</summary><p>Write the correct answer and explanation here.</p></details></section>');
}

function insertColumns() {
  const left = sanitizeColumnPercent(els.columnLeftInput.value);
  const right = 100 - left;
  els.columnLeftInput.value = String(left);
  insertHtml([
    `<section class="edu-columns" data-columns="2" data-left="${left}" data-right="${right}" style="grid-template-columns: ${left}fr ${right}fr;">`,
    `  <div class="edu-column"><h2>${escapeHtml(t("leftColumn"))}</h2><p>Write text, add images or insert interactive material here.</p></div>`,
    `  <div class="edu-column"><h2>${escapeHtml(t("rightColumn"))}</h2><p>Write text, add images or insert interactive material here.</p></div>`,
    `</section>`,
  ].join("\n"));
  setStatus(t("twoColumnsInserted"));
}

function sanitizeColumnPercent(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 50;
  return Math.min(80, Math.max(20, parsed));
}

function requestAssetFileForInsertion() {
  state.selectedAssetId = "";
  renderAssets();
  setStatus(t("chooseAssetFile"));
  els.assetInsertInput.click();
}

function insertAssetIntoChapter(asset) {
  const chapter = currentChapter();
  if (!chapter) {
    setStatus(t("noChapter"));
    return;
  }
  markDirty();

  if (chapter.kind === "html" || state.activeMode === "source") {
    setMode("source");
    insertIntoTextarea(els.sourceEditor, assetMarkup(asset));
    chapter.content = els.sourceEditor.value;
    setStatus(t("assetInserted"));
    return;
  }

  if (state.activeMode !== "visual") setMode("visual");
  insertHtmlIntoVisualEditor(assetMarkup(asset, { forEditor: true }));
  chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);
  setStatus(t("assetInserted"));
}

function insertHtmlIntoVisualEditor(html) {
  const selection = window.getSelection();
  let range = selection && selection.rangeCount ? selection.getRangeAt(0) : null;
  let canUseSelection = range && els.visualEditor.contains(range.commonAncestorContainer);
  if (!canUseSelection && savedEditorRange && els.visualEditor.contains(savedEditorRange.commonAncestorContainer)) {
    range = savedEditorRange;
    canUseSelection = true;
  }
  els.visualEditor.focus();
  if (canUseSelection && selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const fragment = template.content.cloneNode(true);
  const shouldInsertAsBlock = isBlockFragment(fragment);

  if (canUseSelection) {
    const columnContainer = shouldInsertAsBlock ? nearestEditorColumn(range.commonAncestorContainer) : null;
    if (columnContainer) {
      insertBlockInsideColumn(columnContainer, range.commonAncestorContainer, html.trim(), fragment);
      if (selection) selection.removeAllRanges();
      savedEditorRange = null;
      return;
    }
    const blockContainer = shouldInsertAsBlock ? findInsertionBlock(range.commonAncestorContainer) : null;
    if (blockContainer) {
      blockContainer.insertAdjacentHTML("afterend", "\n" + html.trim() + "\n");
    } else {
      range.deleteContents();
      range.insertNode(fragment);
    }
    if (selection) selection.removeAllRanges();
    savedEditorRange = null;
    return;
  }

  els.visualEditor.appendChild(fragment);
  savedEditorRange = null;
}

function captureEditorSelection() {
  const selection = window.getSelection ? window.getSelection() : null;
  if (!selection || !selection.rangeCount) return;
  const range = selection.getRangeAt(0);
  if (els.visualEditor.contains(range.commonAncestorContainer)) {
    savedEditorRange = range.cloneRange();
  }
}

function isBlockFragment(fragment) {
  const firstElement = Array.from(fragment.childNodes).find((node) => node.nodeType === Node.ELEMENT_NODE);
  if (!firstElement) return false;
  return ["SECTION", "FIGURE", "VIDEO", "AUDIO", "IFRAME", "DIV", "TABLE", "BLOCKQUOTE", "HR", "OL", "UL", "DL", "NAV", "DETAILS", "ASIDE", "HEADER", "P", "H1", "H2", "H3", "PRE"].includes(firstElement.nodeName);
}

function nearestEditorColumn(node) {
  let current = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  while (current && current !== els.visualEditor) {
    if (current.classList && current.classList.contains("edu-column")) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function insertBlockInsideColumn(column, node, html, fragment) {
  const anchor = findColumnBlockAnchor(node, column);
  if (anchor) {
    anchor.insertAdjacentHTML("afterend", "\n" + html + "\n");
    return;
  }
  column.appendChild(fragment);
}

function findColumnBlockAnchor(node, column) {
  const blockNodes = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "FIGURE", "SECTION", "DIV", "UL", "OL", "LI", "BLOCKQUOTE", "DETAILS", "TABLE", "VIDEO", "AUDIO", "IFRAME"];
  let current = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  while (current && current !== column) {
    if (blockNodes.includes(current.nodeName)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function findInsertionBlock(node) {
  const blockContainers = ["DIV", "SECTION", "LI", "BLOCKQUOTE", "DETAILS", "TD", "TH"];
  let current = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  while (current && current !== els.visualEditor) {
    const parent = current.parentElement;
    if (!parent) return null;
    if (parent === els.visualEditor || blockContainers.includes(parent.nodeName)) {
      return current;
    }
    current = parent;
  }
  return null;
}

function assetMarkup(asset, options = {}) {
  const href = `../assets/${assetPath(asset)}`;
  if (isHtmlAsset(asset)) {
    const src = options.forEditor ? asset.dataUrl : href;
    return `<section class="interactive-asset" data-asset="${escapeHtml(assetPath(asset))}"><h2>${escapeHtml(asset.name)}</h2><iframe class="interactive-asset-frame" src="${escapeHtml(src)}" data-epub-src="${href}" title="${escapeHtml(asset.name)}"></iframe><p><a href="${href}">Open ${escapeHtml(asset.name)}</a></p></section>`;
  }
  if (asset.type.startsWith("image/")) {
    const src = options.forEditor ? asset.dataUrl : href;
    return `<figure data-asset="${escapeHtml(assetPath(asset))}"><img src="${escapeHtml(src)}" data-epub-src="${href}" alt="${escapeHtml(asset.name)}" /><figcaption>${escapeHtml(asset.name)}</figcaption></figure>`;
  }
  if (asset.type.startsWith("video/")) {
    const src = options.forEditor ? asset.dataUrl : href;
    return `<video controls="controls" src="${escapeHtml(src)}" data-epub-src="${href}">Video file: ${escapeHtml(asset.name)}</video>`;
  }
  if (asset.type.startsWith("audio/")) {
    const src = options.forEditor ? asset.dataUrl : href;
    return `<audio controls="controls" src="${escapeHtml(src)}" data-epub-src="${href}">Audio file: ${escapeHtml(asset.name)}</audio>`;
  }
  return `<p><a href="${href}">${escapeHtml(asset.name)}</a></p>`;
}

function isHtmlAsset(asset) {
  return asset.type.includes("html") || /\.(xhtml|html|htm)$/i.test(asset.name) || /\.(xhtml|html|htm)$/i.test(asset.safeName) || /\.(xhtml|html|htm)$/i.test(assetPath(asset));
}

function assetLabel(asset) {
  if (isHtmlAsset(asset)) return "HTML interactive page";
  return asset.type || guessMime(asset.name);
}

function insertIntoTextarea(textarea, value) {
  const start = textarea.selectionStart || 0;
  const end = textarea.selectionEnd || start;
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);
  const spacerBefore = before && !before.endsWith("\n") ? "\n" : "";
  const spacerAfter = after && !after.startsWith("\n") ? "\n" : "";
  textarea.value = before + spacerBefore + value + spacerAfter + after;
  const cursor = (before + spacerBefore + value).length;
  textarea.focus();
  textarea.setSelectionRange(cursor, cursor);
}

function setMode(mode) {
  syncEditorToChapter();
  state.activeMode = mode;
  els.visualTab.classList.toggle("active", mode === "visual");
  els.sourceTab.classList.toggle("active", mode === "source");
  els.previewTab.classList.toggle("active", mode === "preview");
  els.visualTab.setAttribute("aria-selected", String(mode === "visual"));
  els.sourceTab.setAttribute("aria-selected", String(mode === "source"));
  els.previewTab.setAttribute("aria-selected", String(mode === "preview"));
  els.visualEditor.style.display = mode === "visual" ? "block" : "none";
  els.sourceEditor.style.display = mode === "source" ? "block" : "none";
  els.previewFrame.style.display = mode === "preview" ? "block" : "none";

  const chapter = currentChapter();
  if (!chapter) return;
  if (mode === "visual" && chapter.kind === "xhtml") {
    els.visualEditor.innerHTML = hydrateEditorAssetUrls(chapter.content);
    savedEditorRange = null;
  }
  if (mode === "source") {
    els.sourceEditor.value = chapter.content;
  }
  if (mode === "preview") {
    renderPreview();
  }
}

function renderPreview() {
  const chapter = currentChapter();
  if (!chapter) return;
  const content = chapter.kind === "html"
    ? resolvePreviewAssetUrls(chapter.content)
    : makePreviewHtml(chapter.content);
  els.previewFrame.srcdoc = applyPreviewSecurityPolicy(content);
}

function makePreviewHtml(content) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${bookCss()}</style></head><body>${resolvePreviewAssetUrls(content)}</body></html>`;
}

function applyPreviewSecurityPolicy(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("base, meta[http-equiv='Content-Security-Policy' i]").forEach((node) => node.remove());

  const policy = [
    "default-src 'none'",
    "img-src data: blob:",
    "media-src data: blob:",
    "font-src data:",
    "style-src 'unsafe-inline' data: blob:",
    "script-src 'unsafe-inline' data: blob:",
    "connect-src blob:",
    "worker-src blob:",
    "frame-src 'none'",
    "form-action 'none'",
    "base-uri 'none'"
  ].join("; ");
  const meta = doc.createElement("meta");
  meta.setAttribute("http-equiv", "Content-Security-Policy");
  meta.setAttribute("content", policy);
  doc.head.prepend(meta);
  return "<!doctype html>\n" + doc.documentElement.outerHTML;
}

function resolvePreviewAssetUrls(html, seenAssets = new Set()) {
  let output = html;
  state.assets.forEach((asset) => {
    const path = assetPath(asset);
    const previewUrl = previewAssetDataUrl(asset, seenAssets);
    const patterns = [
      `../assets/${path}`,
      `assets/${path}`,
      `./assets/${path}`,
      `../assets/${asset.safeName}`,
      `assets/${asset.safeName}`,
      `./assets/${asset.safeName}`,
    ];
    patterns.forEach((pattern) => {
      output = output.replace(new RegExp(escapeRegExp(pattern), "g"), () => previewUrl);
    });
  });
  return output;
}

function previewAssetDataUrl(asset, seenAssets) {
  if (seenAssets.has(asset.id)) return asset.dataUrl;
  if (!isTextPreviewAsset(asset)) return asset.dataUrl;
  const text = dataUrlToText(asset.dataUrl);
  if (text === null) return asset.dataUrl;
  const nextSeen = new Set(seenAssets);
  nextSeen.add(asset.id);
  return textToDataUrl(resolvePreviewAssetUrls(text, nextSeen), asset.type || guessMime(asset.name));
}

function isTextPreviewAsset(asset) {
  const type = asset.type || guessMime(asset.name || asset.safeName || "");
  const name = `${asset.name || ""} ${asset.safeName || ""} ${assetPath(asset)}`.toLowerCase();
  return type.startsWith("text/")
    || type.includes("html")
    || type.includes("javascript")
    || type === "application/json"
    || /\.(html|htm|xhtml|css|m?js|json|svg)$/i.test(name);
}

function hydrateEditorAssetUrls(html) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  wrapper.querySelectorAll("img, video, audio, iframe").forEach((node) => {
    const asset = findAssetForElement(node);
    if (!asset) return;
    node.setAttribute("data-epub-src", `../assets/${assetPath(asset)}`);
    node.setAttribute("src", asset.dataUrl);
  });
  return wrapper.innerHTML;
}

function dehydrateEditorAssetUrls(html) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  restoreEpubAssetUrls(wrapper);
  return wrapper.innerHTML;
}

function restoreEpubAssetUrls(root) {
  root.querySelectorAll("img, video, audio, iframe, source").forEach((node) => {
    const explicitSrc = node.getAttribute("data-epub-src");
    if (explicitSrc) {
      node.setAttribute("src", explicitSrc);
      node.removeAttribute("data-epub-src");
      return;
    }
    const asset = findAssetForElement(node);
    if (asset) {
      node.setAttribute("src", `../assets/${assetPath(asset)}`);
    }
  });
}

function findAssetForElement(node) {
  const src = node.getAttribute("src") || "";
  const explicitSrc = node.getAttribute("data-epub-src") || "";
  const explicitAsset = node.closest("[data-asset]")?.getAttribute("data-asset") || "";
  return state.assets.find((asset) => {
    const path = assetPath(asset);
    const href = `../assets/${path}`;
    const legacyHref = `../assets/${asset.safeName}`;
    return src === asset.dataUrl
      || src === href
      || src === `assets/${path}`
      || src === `./assets/${path}`
      || src === legacyHref
      || src === `assets/${asset.safeName}`
      || src === `./assets/${asset.safeName}`
      || explicitSrc === href
      || explicitSrc === `assets/${path}`
      || explicitSrc === legacyHref
      || explicitSrc === `assets/${asset.safeName}`
      || explicitAsset === path
      || explicitAsset === asset.safeName;
  }) || null;
}

async function addAssets(event, options = {}) {
  const shouldInsert = Boolean(options.insertIntoChapter);
  const files = Array.from(event.target.files || []);
  const addedAssets = [];
  for (const file of files) {
    const dataUrl = await fileToDataUrl(file);
    const type = file.type || guessMime(file.name);
    const path = uniqueAssetPath(file.name, type);
    const asset = {
      id: makeId("asset"),
      name: file.name,
      safeName: path.split("/").pop(),
      path,
      type,
      dataUrl,
    };
    state.assets.push(asset);
    addedAssets.push(asset);
  }
  event.target.value = "";

  if (addedAssets.length) {
    state.selectedAssetId = addedAssets[0].id;
    markDirty();
  }
  renderAssets();

  if (shouldInsert && addedAssets.length) {
    addedAssets.forEach((asset) => insertAssetIntoChapter(asset));
    return;
  }

  setStatus(t("assetAdded"));
}

async function importHtmlPackage(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;

  try {
    const records = normalizePackageRecords(files);
    const mainRecord = findMainHtmlRecord(records);
    if (!mainRecord) {
      setStatus(t("noHtmlInPackage"));
      return;
    }

    const assetRecords = createPackageAssetRecords(records.filter((record) => record !== mainRecord));
    const mainContent = rewriteHtmlPackageReferences(
      await mainRecord.file.text(),
      mainRecord.path,
      assetRecords,
      (targetRecord) => `../assets/${targetRecord.asset.path}`,
    );

    for (const record of assetRecords) {
      record.asset.dataUrl = await packageAssetDataUrl(record, assetRecords);
    }

    state.assets.push(...assetRecords.map((record) => record.asset));
    if (assetRecords.length) {
      state.selectedAssetId = assetRecords[0].asset.id;
    }
    addChapter(mainRecord.file.name, mainContent, "html");
    renderAssets();
    setStatus(t("htmlPackageAdded"));
  } catch (error) {
    setStatus(t("importError"));
  } finally {
    event.target.value = "";
  }
}

async function importHtmlChapter(event) {
  const file = (event.target.files || [])[0];
  if (!file) return;
  try {
    const content = await file.text();
    addChapter(file.name, content, "html");
    setStatus(t("htmlAdded"));
  } catch (error) {
    setStatus(t("importError"));
  } finally {
    els.importHtmlInput.value = "";
  }
}

async function importWordDocx(event) {
  const file = (event.target.files || [])[0];
  if (!file) return;
  if (!window.mammoth) {
    setStatus(t("mammothMissing"));
    els.importWordInput.value = "";
    return;
  }
  setStatus(t("wordImporting"));
  try {
    const arrayBuffer = await file.arrayBuffer();
    const baseName = safeFileBase(file.name.replace(/\.docx$/i, "")) || "word";
    let imageIndex = 0;
    const convertImage = window.mammoth.images.imgElement(async (image) => {
      const base64 = await image.read("base64");
      const type = image.contentType || "image/png";
      let ext = (type.split("/")[1] || "png").toLowerCase();
      if (ext === "jpeg") ext = "jpg";
      if (ext === "svg+xml") ext = "svg";
      imageIndex += 1;
      const name = `${baseName}-img-${imageIndex}.${ext}`;
      const dataUrl = `data:${type};base64,${base64}`;
      const path = uniqueAssetPath(name, type);
      const asset = {
        id: makeId("asset"),
        name,
        safeName: path.split("/").pop(),
        path,
        type,
        dataUrl,
      };
      state.assets.push(asset);
      return { src: `../assets/${assetPath(asset)}`, alt: image.altText || "" };
    });
    const result = await window.mammoth.convertToHtml({ arrayBuffer }, { convertImage });
    const html = (result.value || "").trim() || "<p></p>";
    const title = file.name.replace(/\.docx$/i, "") || "Imported document";
    addChapter(title, html, "xhtml");
    renderAssets();
    markDirty();
    setStatus(t("wordImported"));
  } catch (error) {
    setStatus(t("importError"));
  } finally {
    els.importWordInput.value = "";
  }
}

async function importMarkdownOrText(event) {
  const file = (event.target.files || [])[0];
  if (!file) return;
  try {
    if (/\.(md|markdown)$/i.test(file.name)) {
      await importMarkdownFile(file);
    } else {
      await importTextFile(file);
    }
  } catch (error) {
    setStatus(t("importError"));
  } finally {
    els.importDocInput.value = "";
  }
}

async function importMarkdownFile(file) {
  if (!window.marked) {
    setStatus(t("markedMissing"));
    return;
  }
  const md = await file.text();
  const html = (window.marked.parse ? window.marked.parse(md) : window.marked(md)) || "";
  const title = file.name.replace(/\.(md|markdown)$/i, "") || "Imported document";
  addChapter(title, html.trim() || "<p></p>", "xhtml");
  markDirty();
  setStatus(t("mdImported"));
}

async function importTextFile(file) {
  const raw = await file.text();
  const blocks = raw.split(/\r?\n\s*\r?\n/).map((s) => s.trim()).filter(Boolean);
  const html = blocks.length
    ? blocks.map((b) => `<p>${escapeHtml(b).replace(/\r?\n/g, "<br />")}</p>`).join("\n")
    : "<p></p>";
  const title = file.name.replace(/\.txt$/i, "") || "Imported document";
  addChapter(title, html, "xhtml");
  markDirty();
  setStatus(t("txtImported"));
}

async function epubZipHasDrm(zip) {
  const names = Object.keys(zip.files || {}).map((n) => n.toLowerCase());
  if (names.some((n) =>
    n === "meta-inf/rights.xml" || n.endsWith("/rights.xml") ||
    n.endsWith(".lcpl") || n.endsWith("/license.lcpl"))) {
    return true;
  }
  const enc = zip.file("META-INF/encryption.xml");
  if (enc) {
    try {
      const doc = new DOMParser().parseFromString(await enc.async("string"), "application/xml");
      const fontAlgos = ["http://www.idpf.org/2008/embedding", "http://ns.adobe.com/pdf/enc#rc"];
      const methods = [...doc.getElementsByTagName("*")].filter((m) => m.localName === "EncryptionMethod");
      if (methods.some((m) => {
        const algo = (m.getAttribute("Algorithm") || "").toLowerCase();
        return algo && !fontAlgos.includes(algo);
      })) return true;
    } catch (err) {
      return true;
    }
  }
  return false;
}

async function importEpub(event) {
  const file = (event.target.files || [])[0];
  if (!file) return;
  if (!window.JSZip) {
    setStatus(t("jszipMissing"));
    els.importEpubInput.value = "";
    return;
  }
  setStatus(t("epubImporting"));
  try {
    const zip = await JSZip.loadAsync(file);
    if (await epubZipHasDrm(zip)) {
      setStatus(t("drmBlockedImport"));
      return;
    }
    const containerEntry = zip.file("META-INF/container.xml");
    if (!containerEntry) { setStatus(t("noEpubChapters")); return; }
    const containerDoc = new DOMParser().parseFromString(await containerEntry.async("string"), "application/xml");
    const rootfile = [...containerDoc.getElementsByTagName("*")].find((n) => n.localName === "rootfile");
    const opfPath = rootfile && rootfile.getAttribute("full-path");
    const opfEntry = opfPath && zip.file(opfPath);
    if (!opfEntry) { setStatus(t("noEpubChapters")); return; }
    const opfDir = pathDirectory(opfPath);
    const opfDoc = new DOMParser().parseFromString(await opfEntry.async("string"), "application/xml");
    const manifest = {};
    [...opfDoc.getElementsByTagName("*")].filter((n) => n.localName === "item").forEach((it) => {
      const id = it.getAttribute("id"); const href = it.getAttribute("href"); const mt = it.getAttribute("media-type") || "";
      if (!id || !href) return;
      const abs = collapseRelativePath((opfDir ? opfDir + "/" : "") + safeDecodeUri(href));
      manifest[id] = { href: abs, mediaType: mt, properties: it.getAttribute("properties") || "" };
    });
    const spine = [...opfDoc.getElementsByTagName("*")].filter((n) => n.localName === "itemref")
      .map((r) => manifest[r.getAttribute("idref")]).filter(Boolean);
    const chapters = spine.filter((m) => /xhtml|html/i.test(m.mediaType) && !/\bnav\b/.test(m.properties));
    if (!chapters.length) { setStatus(t("noEpubChapters")); return; }
    const chapterPaths = new Set(chapters.map((m) => m.href));
    const navHref = (Object.values(manifest).find((m) => /\bnav\b/.test(m.properties)) || {}).href || null;
    const skip = (p) => {
      const l = p.toLowerCase();
      return p === "mimetype" || l.startsWith("meta-inf/") || p === opfPath || chapterPaths.has(p) || p === navHref || /\.(ncx|opf)$/i.test(p);
    };
    const assetSource = [];
    for (const p of Object.keys(zip.files)) {
      if (zip.files[p].dir || skip(p)) continue;
      const bytes = await zip.file(p).async("uint8array");
      assetSource.push({ file: new File([bytes], fileNameOnly(p), { type: guessMime(p) }), path: p });
    }
    const assetRecs = createPackageAssetRecords(assetSource);
    for (const rec of assetRecs) {
      rec.asset.dataUrl = await packageAssetDataUrl(rec, assetRecs);
    }
    state.assets.push(...assetRecs.map((r) => r.asset));
    for (const ch of chapters) {
      const entry = zip.file(ch.href);
      if (!entry) continue;
      const xml = await entry.async("string");
      const doc = new DOMParser().parseFromString(xml, "text/html");
      const titleEl = doc.querySelector("title");
      const title = (titleEl && titleEl.textContent.trim()) || fileNameOnly(ch.href).replace(/\.(xhtml|html|htm)$/i, "") || "Chapter";
      const bodyHtml = doc.body ? doc.body.innerHTML : xml;
      const rewritten = rewriteHtmlPackageReferences(bodyHtml, ch.href, assetRecs, (rec) => `../assets/${rec.asset.path}`);
      addChapter(title, rewritten, "xhtml");
    }
    renderAssets();
    markDirty();
    setStatus(t("epubImported"));
  } catch (error) {
    setStatus(t("importError"));
  } finally {
    els.importEpubInput.value = "";
  }
}

function normalizePackageRecords(files) {
  const rawRecords = files
    .map((file) => ({
      file,
      rawPath: normalizePackagePath(file.webkitRelativePath || file.name),
    }))
    .filter((record) => record.rawPath && !record.rawPath.endsWith("/"));
  const prefix = packageRootPrefix(rawRecords.map((record) => record.rawPath));
  return rawRecords
    .map((record) => ({
      file: record.file,
      path: normalizePackagePath(prefix && record.rawPath.startsWith(prefix)
        ? record.rawPath.slice(prefix.length)
        : record.rawPath),
    }))
    .filter((record) => record.path);
}

function packageRootPrefix(paths) {
  if (!paths.length) return "";
  const firstSegments = paths.map((path) => path.split("/")[0]).filter(Boolean);
  const first = firstSegments[0];
  if (!first || firstSegments.some((segment) => segment !== first)) return "";
  return paths.some((path) => path.includes("/")) ? `${first}/` : "";
}

function findMainHtmlRecord(records) {
  const htmlRecords = records.filter((record) => isHtmlFileName(record.path));
  if (!htmlRecords.length) return null;
  return htmlRecords
    .slice()
    .sort((left, right) => htmlRecordScore(left) - htmlRecordScore(right))[0];
}

function htmlRecordScore(record) {
  const name = fileNameOnly(record.path).toLowerCase();
  const depth = pathDirectory(record.path).split("/").filter(Boolean).length;
  if (name === "index.xhtml") return depth;
  if (name === "index.html") return 10 + depth;
  if (name === "index.htm") return 20 + depth;
  return 100 + depth;
}

function createPackageAssetRecords(records) {
  const reserved = new Set(state.assets.map((asset) => assetPath(asset)));
  return records.map((record) => {
    const type = record.file.type || guessMime(record.file.name || record.path);
    const name = record.file.name || fileNameOnly(record.path);
    const path = uniqueAssetPathFromReserved(name, type, reserved);
    return {
      ...record,
      type,
      asset: {
        id: makeId("asset"),
        name,
        safeName: path.split("/").pop(),
        path,
        type,
        dataUrl: "",
      },
    };
  });
}

function uniqueAssetPathFromReserved(name, type, reserved) {
  const folder = assetFolder({ name, type });
  const base = safeFileBase(name.replace(/\.[^.]+$/, ""));
  const ext = (name.match(/\.[^.]+$/) || [""])[0].toLowerCase();
  let candidate = `${folder}/${base}${ext}`;
  let counter = 2;
  while (reserved.has(candidate)) {
    candidate = `${folder}/${base}-${counter}${ext}`;
    counter += 1;
  }
  reserved.add(candidate);
  return candidate;
}

async function packageAssetDataUrl(record, assetRecords) {
  const type = record.type || record.asset.type || guessMime(record.file.name || record.path);
  if (isHtmlFileName(record.path) || type.includes("html")) {
    const rewritten = rewriteHtmlPackageReferences(
      await record.file.text(),
      record.path,
      assetRecords,
      (targetRecord) => relativeAssetHref(record.asset.path, targetRecord.asset.path),
    );
    return textToDataUrl(rewritten, type);
  }
  if (isCssFileName(record.path) || type === "text/css") {
    const rewritten = rewriteCssPackageReferences(
      await record.file.text(),
      record.path,
      assetRecords,
      (targetRecord) => relativeAssetHref(record.asset.path, targetRecord.asset.path),
    );
    return textToDataUrl(rewritten, type);
  }
  if (isScriptFileName(record.path) || type.includes("javascript")) {
    const rewritten = rewriteScriptPackageReferences(
      await record.file.text(),
      record.path,
      assetRecords,
      (targetRecord) => relativeAssetHref(record.asset.path, targetRecord.asset.path),
    );
    return textToDataUrl(rewritten, type);
  }
  return fileToDataUrl(record.file);
}

function rewriteHtmlPackageReferences(html, sourcePath, assetRecords, makeTargetHref) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const attributes = ["src", "href", "poster", "data-src", "data-href", "data-url", "data-model", "data-file"];
  doc.querySelectorAll("*").forEach((node) => {
    attributes.forEach((attribute) => {
      if (!node.hasAttribute(attribute)) return;
      const rewritten = resolvePackageReference(node.getAttribute(attribute), sourcePath, assetRecords, makeTargetHref);
      if (rewritten) node.setAttribute(attribute, rewritten);
    });
    if (node.hasAttribute("srcset")) {
      node.setAttribute("srcset", rewriteSrcsetReferences(node.getAttribute("srcset"), sourcePath, assetRecords, makeTargetHref));
    }
    if (node.hasAttribute("style")) {
      node.setAttribute("style", rewriteCssPackageReferences(node.getAttribute("style"), sourcePath, assetRecords, makeTargetHref));
    }
  });
  doc.querySelectorAll("style").forEach((node) => {
    node.textContent = rewriteCssPackageReferences(node.textContent || "", sourcePath, assetRecords, makeTargetHref);
  });
  doc.querySelectorAll("script:not([src])").forEach((node) => {
    node.textContent = rewriteScriptPackageReferences(node.textContent || "", sourcePath, assetRecords, makeTargetHref);
  });
  if (/<html[\s>]/i.test(html)) {
    const doctype = /^<!doctype/i.test(html.trim()) ? "<!doctype html>\n" : "";
    return `${doctype}${doc.documentElement.outerHTML}`;
  }
  return doc.body ? doc.body.innerHTML : html;
}

function rewriteSrcsetReferences(value, sourcePath, assetRecords, makeTargetHref) {
  return String(value || "").split(",").map((entry) => {
    const trimmed = entry.trim();
    if (!trimmed) return trimmed;
    const parts = trimmed.split(/\s+/);
    const rewritten = resolvePackageReference(parts[0], sourcePath, assetRecords, makeTargetHref);
    if (!rewritten) return trimmed;
    return [rewritten, ...parts.slice(1)].join(" ");
  }).join(", ");
}

function rewriteCssPackageReferences(css, sourcePath, assetRecords, makeTargetHref) {
  return String(css || "")
    .replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, (match, quote, value) => {
      const rewritten = resolvePackageReference(value, sourcePath, assetRecords, makeTargetHref);
      return rewritten ? `url(${quote}${rewritten}${quote})` : match;
    })
    .replace(/(@import\s+)(["'])([^"']+)(\2)/gi, (match, prefix, quote, value, suffixQuote) => {
      const rewritten = resolvePackageReference(value, sourcePath, assetRecords, makeTargetHref);
      return rewritten ? `${prefix}${quote}${rewritten}${suffixQuote}` : match;
    });
}

function rewriteScriptPackageReferences(script, sourcePath, assetRecords, makeTargetHref) {
  return String(script || "").replace(/(["'`])([^"'`\r\n]+)\1/g, (match, quote, value) => {
    if (quote === "`" && value.includes("${")) return match;
    if (!looksLikePackageReference(value)) return match;
    const rewritten = resolvePackageReference(value, sourcePath, assetRecords, makeTargetHref);
    return rewritten ? `${quote}${rewritten}${quote}` : match;
  });
}

function looksLikePackageReference(value) {
  const reference = String(value || "").trim();
  if (!reference || isExternalReference(reference)) return false;
  const { refPath } = splitReference(reference);
  return /[/.]/.test(refPath) && /\.[a-z0-9]{2,5}$/i.test(fileNameOnly(refPath));
}

function resolvePackageReference(value, sourcePath, assetRecords, makeTargetHref) {
  const rawValue = String(value || "").trim();
  if (!rawValue || isExternalReference(rawValue)) return null;
  const { refPath, suffix } = splitReference(rawValue);
  if (!refPath || isExternalReference(refPath)) return null;

  const decodedPath = safeDecodeUri(refPath);
  const baseDir = pathDirectory(sourcePath);
  const candidate = collapseRelativePath(decodedPath.startsWith("/")
    ? decodedPath.replace(/^\/+/, "")
    : `${baseDir}/${decodedPath}`);
  const normalizedCandidate = normalizePackagePath(candidate).toLowerCase();
  let targetRecord = assetRecords.find((record) => normalizePackagePath(record.path).toLowerCase() === normalizedCandidate);
  if (!targetRecord) {
    const targetName = fileNameOnly(decodedPath).toLowerCase();
    const matches = assetRecords.filter((record) => fileNameOnly(record.path).toLowerCase() === targetName);
    if (matches.length === 1) {
      targetRecord = matches[0];
    }
  }
  return targetRecord ? `${makeTargetHref(targetRecord)}${suffix}` : null;
}

function splitReference(value) {
  const hashIndex = value.indexOf("#");
  const queryIndex = value.indexOf("?");
  const indexes = [hashIndex, queryIndex].filter((index) => index >= 0);
  const splitIndex = indexes.length ? Math.min(...indexes) : -1;
  if (splitIndex === -1) return { refPath: value, suffix: "" };
  return {
    refPath: value.slice(0, splitIndex),
    suffix: value.slice(splitIndex),
  };
}

function isExternalReference(value) {
  const reference = String(value || "").trim();
  return !reference
    || reference.startsWith("#")
    || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(reference);
}

function normalizePackagePath(value) {
  return String(value || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter((segment) => segment && segment !== ".")
    .join("/");
}

function collapseRelativePath(value) {
  const output = [];
  normalizePackagePath(value).split("/").forEach((segment) => {
    if (!segment || segment === ".") return;
    if (segment === "..") {
      output.pop();
      return;
    }
    output.push(segment);
  });
  return output.join("/");
}

function pathDirectory(path) {
  const normalized = normalizePackagePath(path);
  const parts = normalized.split("/");
  parts.pop();
  return parts.join("/");
}

function fileNameOnly(path) {
  return normalizePackagePath(path).split("/").pop() || "";
}

function relativeAssetHref(sourceAssetPath, targetAssetPath) {
  return relativePath(pathDirectory(sourceAssetPath), targetAssetPath);
}

function relativePath(fromDir, targetPath) {
  const fromParts = normalizePackagePath(fromDir).split("/").filter(Boolean);
  const targetParts = normalizePackagePath(targetPath).split("/").filter(Boolean);
  let index = 0;
  while (index < fromParts.length && index < targetParts.length && fromParts[index] === targetParts[index]) {
    index += 1;
  }
  const up = fromParts.slice(index).map(() => "..");
  const down = targetParts.slice(index);
  return [...up, ...down].join("/") || fileNameOnly(targetPath);
}

function isHtmlFileName(path) {
  return /\.(xhtml|html|htm)$/i.test(fileNameOnly(path));
}

function isCssFileName(path) {
  return /\.css$/i.test(fileNameOnly(path));
}

function isScriptFileName(path) {
  return /\.m?js$/i.test(fileNameOnly(path));
}

function safeDecodeUri(value) {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}

async function saveProjectJson() {
  syncEditorToChapter();
  syncMetaFromForm();
  downloadBlob(
    new Blob([JSON.stringify({ version: APP_VERSION, state }, null, 2)], { type: "application/json" }),
    safeFileBase(state.meta.title) + "-project.json",
  );
  projectDirty = false;
  setStatus(t("saved"));
}

async function loadProjectJson(event) {
  const file = (event.target.files || [])[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const incoming = data.state || data;
    state.uiLanguage = incoming.uiLanguage || state.uiLanguage;
    state.selectedChapterId = incoming.selectedChapterId || "";
    state.selectedAssetId = incoming.selectedAssetId || "";
    state.activeMode = incoming.activeMode || "visual";
    state.meta = incoming.meta || state.meta;
    state.chapters = incoming.chapters || [];
    state.assets = incoming.assets || [];
    state.cover = incoming.cover || null;
    if (!state.chapters.length) createInitialProject();
    if (!state.selectedChapterId) state.selectedChapterId = state.chapters[0].id;
    applyLanguage();
    renderAll();
    clearLocal();
    projectDirty = false;
    setStatus(t("loaded"));
  } catch (error) {
    setStatus(t("loadError"));
  } finally {
    els.openProjectInput.value = "";
  }
}

function runExportCheck() {
  syncEditorToChapter();
  syncMetaFromForm();
  showValidationReport(validateProject(), false);
}

function validateProject() {
  const errors = [];
  const warnings = [];
  const report = (level, message) => (level === "error" ? errors : warnings).push(message);
  const chapters = Array.isArray(state.chapters) ? state.chapters : [];
  const assets = Array.isArray(state.assets) ? state.assets : [];
  const assetPaths = new Set(assets.map((asset) => `assets/${assetPath(asset)}`.replace(/\\/g, "/")));

  if (!chapters.length) report("error", "The book has no chapters.");
  if (!state.meta.title.trim()) report("warning", "Add a book title to the metadata.");
  if (!state.meta.creator.trim()) report("warning", "Add an author or rights holder to the metadata.");
  if (!state.meta.description.trim()) report("warning", "Add a short educational description to the metadata.");

  chapters.forEach((chapter, index) => {
    const label = `Chapter ${index + 1}`;
    const source = String(chapter.content || "");
    const doc = new DOMParser().parseFromString(source, "text/html");
    if (!source.trim() || !doc.body.textContent.trim() && !doc.body.querySelector("img, video, audio, iframe, canvas")) {
      report("error", `${label} is empty.`);
    }
    if (!String(chapter.title || "").trim()) report("warning", `${label} has no title.`);
    doc.querySelectorAll("img").forEach((image) => {
      if (!image.hasAttribute("alt")) report("warning", `${label} contains an image without alternative text.`);
    });
    doc.querySelectorAll("iframe").forEach((frame) => {
      if (!frame.getAttribute("title")) report("warning", `${label} contains an interactive frame without a title.`);
      const lesson = frame.closest(".interactive-lesson");
      if (lesson && !lesson.querySelector(".interactive-fallback")) {
        report("warning", `${label} has a 3D lesson without a text alternative.`);
      }
    });
    doc.querySelectorAll("[src]").forEach((node) => {
      const raw = (node.getAttribute("src") || "").trim();
      if (!raw || /^(?:https?:|data:|blob:|#)/i.test(raw)) return;
      const normalized = raw.replace(/^\.\.\//, "").replace(/^\.\//, "").replace(/\\/g, "/");
      if (normalized.startsWith("assets/") && !assetPaths.has(normalized)) {
        report("error", `${label} references a missing local asset: ${raw}`);
      }
    });
  });

  assets.forEach((asset) => {
    const dataUrl = String(asset.dataUrl || "");
    const approximateBytes = Math.floor(dataUrl.length * 0.75);
    if (approximateBytes > 50 * 1024 * 1024) {
      report("warning", `Asset “${asset.name || asset.safeName || "file"}” is larger than 50 MB and may be difficult to open on mobile devices.`);
    }
  });

  return { errors, warnings };
}

function showValidationReport(report, canExport) {
  const items = [
    ...report.errors.map((message) => ({ level: "error", message })),
    ...report.warnings.map((message) => ({ level: "warning", message })),
  ];
  const total = items.length;
  els.validationList.replaceChildren();
  if (!total) {
    const item = document.createElement("li");
    item.className = "validation-ok";
    item.textContent = t("validationClean");
    els.validationList.appendChild(item);
    els.validationSummary.textContent = t("validationPassed");
  } else {
    els.validationSummary.textContent = t("validationIssues").replace("{count}", String(total));
    items.forEach((entry) => {
      const item = document.createElement("li");
      item.className = `validation-${entry.level}`;
      item.textContent = entry.message;
      els.validationList.appendChild(item);
    });
  }
  els.validationExportButton.hidden = !canExport || !total;
  if (typeof els.validationDialog.showModal === "function") {
    if (!els.validationDialog.open) els.validationDialog.showModal();
  } else {
    setStatus(total ? els.validationSummary.textContent : t("validationPassed"));
  }
}

async function exportEpub() {
  syncEditorToChapter();
  syncMetaFromForm();
  if (!pendingValidatedExport) {
    const report = validateProject();
    if (report.errors.length || report.warnings.length) {
      showValidationReport(report, true);
      return;
    }
  }
  pendingValidatedExport = false;
  await performExportEpub();
}

async function performExportEpub() {
  syncEditorToChapter();
  syncMetaFromForm();
  if (!window.JSZip) {
    setStatus(t("jszipMissing"));
    return;
  }

  const zip = new JSZip();
  zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

  const metaInf = zip.folder("META-INF");
  metaInf.file("container.xml", containerXml());

  const oebps = zip.folder("OEBPS");
  oebps.folder("styles").file("book.css", bookCss());

  if (state.cover) {
    oebps.file(state.cover.path, dataUrlToUint8(state.cover.dataUrl));
    oebps.file("cover.xhtml", coverXhtml());
  }

  const assetsFolder = oebps.folder("assets");
  for (const asset of state.assets) {
    assetsFolder.file(assetPath(asset), dataUrlToUint8(asset.dataUrl));
  }

  const chaptersFolder = oebps.folder("chapters");
  const chapterItems = state.chapters.map((chapter, index) => {
    const extension = chapter.kind === "html" ? "html" : "xhtml";
    const href = `chapters/${String(index + 1).padStart(2, "0")}-${safeFileBase(chapter.title)}.${extension}`;
    const content = chapter.kind === "html"
      ? chapter.content
      : xhtmlDocument(chapter.title, chapter.content);
    chaptersFolder.file(href.replace("chapters/", ""), content);
    const item = {
      id: `chapter-${index + 1}`,
      href,
      title: chapter.title,
      mediaType: chapter.kind === "html" ? "text/html" : "application/xhtml+xml",
      properties: chapter.kind === "xhtml" && /<script[\s>]/i.test(chapter.content) ? "scripted" : "",
    };
    if (chapter.kind === "html") {
      item.fallbackId = `${item.id}-fallback`;
      item.fallbackHref = `chapters/${String(index + 1).padStart(2, "0")}-${safeFileBase(chapter.title)}-fallback.xhtml`;
      chaptersFolder.file(
        item.fallbackHref.replace("chapters/", ""),
        interactiveFallbackXhtml(chapter.title, chapter.content),
      );
    }
    return item;
  });

  const bookId = "urn:uuid:" + makeUuid();
  oebps.file("nav.xhtml", navXhtml(chapterItems));
  oebps.file("toc.ncx", tocNcx(chapterItems, bookId));
  oebps.file("package.opf", packageOpf(chapterItems, bookId));

  const blob = await zip.generateAsync({
    type: "blob",
    mimeType: "application/epub+zip",
    compression: "DEFLATE",
  });
  downloadBlob(blob, safeFileBase(state.meta.title) + ".epub");
  setStatus(t("exported"));
}

function containerXml() {
  return `<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/package.opf" media-type="application/oebps-package+xml" />
  </rootfiles>
</container>`;
}

function packageOpf(chapterItems, bookId) {
  const modified = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const coverMeta = state.cover ? `\n    <meta name="cover" content="cover-image" />` : "";
  const coverManifest = state.cover
    ? `\n    <item id="cover-image" href="${xmlAttr(state.cover.path)}" media-type="${xmlAttr(state.cover.type || guessMime(state.cover.name))}" properties="cover-image" />\n    <item id="cover-page" href="cover.xhtml" media-type="application/xhtml+xml" />`
    : "";
  const coverSpine = state.cover ? `<itemref idref="cover-page" />\n    ` : "";
  const a11yMeta = accessibilityMeta(chapterItems);
  const assetManifest = state.assets.map((asset, index) =>
    `<item id="asset-${index + 1}" href="assets/${xmlAttr(assetPath(asset))}" media-type="${xmlAttr(asset.type || guessMime(asset.name))}" />`
  ).join("\n    ");
  const chapterManifest = chapterItems.map((item) => {
    const properties = item.properties ? ` properties="${xmlAttr(item.properties)}"` : "";
    const fallback = item.fallbackId ? ` fallback="${xmlAttr(item.fallbackId)}"` : "";
    const primary = `<item id="${xmlAttr(item.id)}" href="${xmlAttr(item.href)}" media-type="${xmlAttr(item.mediaType)}"${properties}${fallback} />`;
    const alternative = item.fallbackId
      ? `\n    <item id="${xmlAttr(item.fallbackId)}" href="${xmlAttr(item.fallbackHref)}" media-type="application/xhtml+xml" />`
      : "";
    return primary + alternative;
  }).join("\n    ");
  const spine = chapterItems.map((item) => `<itemref idref="${xmlAttr(item.id)}" />`).join("\n    ");
  return `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">${escapeXml(bookId)}</dc:identifier>
    <dc:title>${escapeXml(state.meta.title)}</dc:title>
    <dc:creator>${escapeXml(state.meta.creator)}</dc:creator>
    <dc:language>${escapeXml(state.meta.language)}</dc:language>
    <dc:rights>${escapeXml(state.meta.license)}</dc:rights>
    <dc:description>${escapeXml(state.meta.description)}</dc:description>
    <meta property="dcterms:modified">${modified}</meta>${coverMeta}
${a11yMeta}
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
    <item id="css" href="styles/book.css" media-type="text/css" />${coverManifest}
    ${chapterManifest}
    ${assetManifest}
  </manifest>
  <spine toc="ncx">
    ${coverSpine}${spine}
  </spine>
</package>`;
}

function navXhtml(chapterItems) {
  const items = chapterItems
    .map((item) => `<li><a href="${xmlAttr(item.href)}">${escapeXml(item.title)}</a></li>`)
    .join("\n      ");
  const firstHref = chapterItems.length ? chapterItems[0].href : "";
  const coverLandmark = state.cover
    ? `<li><a epub:type="cover" href="cover.xhtml">${escapeXml(exportT("cover"))}</a></li>\n      `
    : "";
  const bodyLandmark = firstHref
    ? `<li><a epub:type="bodymatter" href="${xmlAttr(firstHref)}">${escapeXml(exportT("start"))}</a></li>`
    : "";
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${xmlAttr(state.meta.language)}" xml:lang="${xmlAttr(state.meta.language)}">
<head>
  <title>${escapeXml(exportT("navTitle"))}</title>
  <meta charset="utf-8" />
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>${escapeXml(exportT("toc"))}</h1>
    <ol>
      ${items}
    </ol>
  </nav>
  <nav epub:type="landmarks" id="landmarks" hidden="hidden">
    <h2>${escapeXml(exportT("navTitle"))}</h2>
    <ol>
      ${coverLandmark}${bodyLandmark}
    </ol>
  </nav>
</body>
</html>`;
}

function xhtmlDocument(title, content) {
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="${xmlAttr(state.meta.language)}" xml:lang="${xmlAttr(state.meta.language)}">
<head>
  <title>${escapeXml(title)}</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="../styles/book.css" />
</head>
<body>
${serializeHtmlAsXhtml(content)}
</body>
</html>`;
}

function serializeHtmlAsXhtml(html) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  restoreEpubAssetUrls(wrapper);
  removeUnsafeNodes(wrapper);
  return Array.from(wrapper.childNodes)
    .map((node) => new XMLSerializer().serializeToString(node))
    .join("\n");
}

function removeUnsafeNodes(root) {
  root.querySelectorAll("form, object, embed").forEach((node) => node.remove());
}

function bookCss() {
  return `body {
  margin: 0 auto;
  max-width: 820px;
  padding: 2rem;
  color: #17211f;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.65;
}
h1, h2, h3 {
  line-height: 1.2;
}
img, video, audio, iframe {
  max-width: 100%;
}
iframe {
  width: 100%;
  min-height: 420px;
  border: 1px solid #d6ded9;
  border-radius: 8px;
  background: #fff;
}
figure {
  margin: 1.5rem 0;
}
figcaption {
  color: #63706c;
  font-size: 0.9rem;
}
.callout {
  border-left: 4px solid #176b5b;
  background: #eef7f3;
  padding: 0.8rem 1rem;
  border-radius: 0 8px 8px 0;
}
.interactive-asset {
  border: 1px solid #d6ded9;
  border-radius: 8px;
  padding: 0.8rem;
  margin: 1rem 0;
  background: #fbfcfa;
}
.interactive-asset h2 {
  font-size: 1rem;
  margin: 0 0 0.65rem;
}
.interactive-lesson {
  border: 2px solid #176b5b;
  border-radius: 10px;
  padding: 1rem;
  margin: 1.5rem 0;
  background: #f7fcf9;
}
.interactive-lesson > :first-child { margin-top: 0; }
.learning-goal,
.interaction-guide {
  padding: 0.75rem 0.9rem;
  border-radius: 6px;
  background: #e8f5ef;
}
.interactive-fallback,
.knowledge-check {
  margin-top: 0.85rem;
}
.knowledge-check {
  border-left: 4px solid #b7791f;
  padding: 0.75rem 0.9rem;
  background: #fffaf0;
}
.interactive-asset-frame {
  min-height: 560px;
}
.edu-columns {
  display: grid;
  gap: 1.2rem;
  align-items: start;
  margin: 1.5rem 0;
}
.edu-column {
  min-width: 0;
  border: 1px solid #d6ded9;
  border-radius: 8px;
  padding: 0.9rem;
  background: #fbfcfa;
}
.edu-column > :first-child {
  margin-top: 0;
}
.edu-column > :last-child {
  margin-bottom: 0;
}
.definition-card,
.reflection-prompt,
.summary-box,
.media-transcript {
  border: 1px solid #d6ded9;
  border-radius: 8px;
  padding: 0.9rem;
  margin: 1.2rem 0;
  background: #fbfcfa;
}
.definition-card {
  border-left: 4px solid #2563eb;
}
.reflection-prompt {
  border-left: 4px solid #b7791f;
  background: #fffaf0;
}
.summary-box {
  border-left: 4px solid #176b5b;
}
.media-transcript video {
  display: block;
  max-width: 100%;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.2rem 0;
}
.data-table caption {
  text-align: left;
  color: #63706c;
  font-weight: 700;
  margin-bottom: 0.45rem;
}
.data-table th,
.data-table td {
  border: 1px solid #d6ded9;
  padding: 0.5rem;
  text-align: left;
  vertical-align: top;
}
.data-table th {
  background: #eef7f3;
}
.cover-page {
  margin: 0;
  padding: 0;
  text-align: center;
}
.cover-page img {
  max-width: 100%;
  max-height: 100vh;
}
details {
  border: 1px solid #d6ded9;
  border-radius: 8px;
  padding: 0.8rem 1rem;
}
summary {
  cursor: pointer;
  font-weight: 700;
}
.lead {
  font-size: 1.15rem;
  color: #2a3a36;
  font-weight: 500;
}
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }
.pullquote {
  margin: 1.5rem 0;
  padding: 0.4rem 1.1rem;
  border-left: 4px solid #176b5b;
  font-size: 1.2rem;
  font-style: italic;
  color: #2a3a36;
}
.pullquote cite {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.9rem;
  font-style: normal;
  color: #63706c;
}
.dropcap::first-letter {
  float: left;
  font-size: 3.1rem;
  line-height: 0.8;
  padding-right: 0.08em;
  font-weight: 700;
  color: #176b5b;
}
.edu-divider {
  border: none;
  border-top: 2px solid #d6ded9;
  max-width: 120px;
  margin: 2rem auto;
}
.page-break {
  break-before: page;
  page-break-before: always;
  height: 0;
}
.callout h2 {
  margin-top: 0;
  font-size: 1.05rem;
}
.callout.tip { border-left-color: #2563eb; background: #eef4ff; }
.callout.warning { border-left-color: #c2410c; background: #fff4ed; }
.callout.important { border-left-color: #b91c1c; background: #fdecec; }
.callout.example { border-left-color: #7c3aed; background: #f5f0ff; }
.callout.did-you-know { border-left-color: #0d9488; background: #ecfdf8; }
.callout.key-terms { border-left-color: #b7791f; background: #fffaf0; }
.key-terms dl { margin: 0; }
.key-terms dt { font-weight: 700; }
.key-terms dd { margin: 0 0 0.5rem; }
.edu-grid {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0;
  align-items: start;
}
.edu-grid-2 { grid-template-columns: repeat(2, 1fr); }
.edu-grid-3 { grid-template-columns: repeat(3, 1fr); }
.edu-card {
  min-width: 0;
  border: 1px solid #d6ded9;
  border-radius: 8px;
  padding: 0.9rem;
  background: #fbfcfa;
}
.edu-card > :first-child { margin-top: 0; }
.edu-card > :last-child { margin-bottom: 0; }
.boxed {
  border: 1px solid #d6ded9;
  border-radius: 8px;
  padding: 1rem 1.2rem;
  margin: 1.5rem 0;
  background: #fff;
}
.boxed > :first-child { margin-top: 0; }
.edu-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin: 1.5rem 0;
}
.edu-gallery figure { margin: 0; }
.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  padding: 0.8rem;
  border: 2px dashed #c3cdc8;
  border-radius: 8px;
  background: #f4f7f5;
  color: #63706c;
  text-align: center;
}
.figure-center { text-align: center; }
.figure-center img { margin-left: auto; margin-right: auto; }
.checklist {
  list-style: none;
  padding-left: 0;
}
.checklist li {
  position: relative;
  padding-left: 1.6rem;
  margin: 0.35rem 0;
}
.checklist li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #176b5b;
  font-weight: 700;
}
.accordion details { margin: 0.5rem 0; }
ol.steps {
  counter-reset: edustep;
  list-style: none;
  padding-left: 0;
}
ol.steps > li {
  position: relative;
  padding-left: 2.4rem;
  margin: 0.6rem 0;
}
ol.steps > li::before {
  counter-increment: edustep;
  content: counter(edustep);
  position: absolute;
  left: 0;
  top: 0;
  width: 1.7rem;
  height: 1.7rem;
  line-height: 1.7rem;
  text-align: center;
  background: #176b5b;
  color: #fff;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.9rem;
}
ol.timeline {
  list-style: none;
  margin: 1.5rem 0;
  padding-left: 1.2rem;
  border-left: 2px solid #d6ded9;
}
ol.timeline > li {
  position: relative;
  padding: 0 0 1rem 1rem;
}
ol.timeline > li::before {
  content: "";
  position: absolute;
  left: -1.55rem;
  top: 0.35rem;
  width: 0.7rem;
  height: 0.7rem;
  background: #176b5b;
  border-radius: 50%;
}
.edu-button {
  display: inline-block;
  padding: 0.55rem 1.1rem;
  background: #176b5b;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
}
.edu-button.ghost {
  background: transparent;
  color: #176b5b;
  border: 1px solid #176b5b;
}
.button-row {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin: 1rem 0;
}
.cta-box {
  border: 1px solid #d6ded9;
  border-radius: 10px;
  padding: 1.2rem;
  margin: 1.5rem 0;
  background: #eef7f3;
  text-align: center;
}
.cta-box > :first-child { margin-top: 0; }
.cta-box .button-row { justify-content: center; }
.page-nav {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  margin: 1.5rem 0;
}
.section-intro {
  border-bottom: 2px solid #176b5b;
  margin: 1.5rem 0 1.2rem;
  padding-bottom: 0.6rem;
}
.section-intro > :first-child { margin-top: 0; }
.section-subtitle {
  margin: 0.2rem 0 0;
  color: #63706c;
  font-size: 1.05rem;
}
@media (max-width: 700px) {
  .edu-grid-2,
  .edu-grid-3,
  .edu-gallery {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 700px) {
  .edu-columns {
    grid-template-columns: 1fr !important;
  }
}`;
}

function makeId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`;
}

function makeUuid() {
  const cryptoObject = globalThis.crypto;
  if (cryptoObject && typeof cryptoObject.randomUUID === "function") {
    return cryptoObject.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.random() * 16 | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(value) {
  return escapeHtml(value).replace(/'/g, "&apos;");
}

function xmlAttr(value) {
  return escapeXml(value);
}

function safeFileBase(value) {
  return String(value || "untitled")
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "untitled";
}

function uniqueAssetName(name) {
  const base = safeFileBase(name.replace(/\.[^.]+$/, ""));
  const ext = (name.match(/\.[^.]+$/) || [""])[0].toLowerCase();
  let candidate = `${base}${ext}`;
  let counter = 2;
  while (state.assets.some((asset) => asset.safeName === candidate)) {
    candidate = `${base}-${counter}${ext}`;
    counter += 1;
  }
  return candidate;
}

function uniqueAssetPath(name, type) {
  const folder = assetFolder({ name, type });
  const base = safeFileBase(name.replace(/\.[^.]+$/, ""));
  const ext = (name.match(/\.[^.]+$/) || [""])[0].toLowerCase();
  let candidate = `${folder}/${base}${ext}`;
  let counter = 2;
  while (state.assets.some((asset) => assetPath(asset) === candidate)) {
    candidate = `${folder}/${base}-${counter}${ext}`;
    counter += 1;
  }
  return candidate;
}

function assetPath(asset) {
  if (asset.path) {
    return String(asset.path).replace(/^assets\//, "").replace(/\\/g, "/");
  }
  const fileName = asset.safeName || uniqueAssetName(asset.name || "asset");
  return `${assetFolder(asset)}/${fileName}`;
}

function assetFolder(asset) {
  const type = asset.type || guessMime(asset.name || asset.safeName || "");
  const name = `${asset.name || ""} ${asset.safeName || ""}`.toLowerCase();
  if (type.startsWith("image/")) return "images";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type.includes("html") || /\.(xhtml|html|htm)\b/.test(name)) return "html";
  if (type === "text/css" || /\.css\b/.test(name)) return "styles";
  if (type.includes("javascript") || type === "application/wasm" || /\.(m?js|wasm)\b/.test(name)) return "scripts";
  if (type.startsWith("model/") || /\.(glb|gltf|bin|obj|mtl|fbx|dae|stl)\b/.test(name)) return "models";
  if (/\.(pdf|docx?|odt|txt|md)\b/.test(name)) return "documents";
  return "other";
}

function guessMime(name) {
  const ext = name.toLowerCase().split(".").pop();
  const map = {
    css: "text/css",
    html: "text/html",
    htm: "text/html",
    xhtml: "application/xhtml+xml",
    svg: "image/svg+xml",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    avif: "image/avif",
    mp4: "video/mp4",
    webm: "video/webm",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    glb: "model/gltf-binary",
    gltf: "model/gltf+json",
    bin: "application/octet-stream",
    obj: "model/obj",
    mtl: "text/plain",
    js: "application/javascript",
    mjs: "application/javascript",
    json: "application/json",
    wasm: "application/wasm",
    pdf: "application/pdf",
    txt: "text/plain",
    md: "text/markdown",
  };
  return map[ext] || "application/octet-stream";
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function textToDataUrl(text, type) {
  return `data:${type || "text/plain"};charset=utf-8,${encodeURIComponent(text)}`;
}

function dataUrlToText(dataUrl) {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) return null;
  const meta = dataUrl.slice(0, commaIndex);
  const data = dataUrl.slice(commaIndex + 1);
  if (meta.includes(";base64")) {
    try {
      return decodeURIComponent(escape(atob(data)));
    } catch {
      return atob(data);
    }
  }
  try {
    return decodeURIComponent(data);
  } catch {
    return data;
  }
}

function dataUrlToUint8(dataUrl) {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) return new Uint8Array();
  const meta = dataUrl.slice(0, commaIndex);
  const data = dataUrl.slice(commaIndex + 1);
  if (!meta.includes(";base64")) {
    return new TextEncoder().encode(decodeURIComponent(data));
  }
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setStatus(message) {
  els.statusMessage.textContent = message;
}

function markDirty() {
  projectDirty = true;
  scheduleAutosave();
}

function exportT(key) {
  const lang = state.meta.language === "el" ? "el" : "en";
  return (exportText[lang] && exportText[lang][key]) || exportText.en[key] || key;
}

function renderCover() {
  if (!els.coverName) return;
  const hasCover = Boolean(state.cover);
  els.coverName.textContent = hasCover ? state.cover.name : "";
  els.removeCoverButton.hidden = !hasCover;
}

async function setCoverFromFile(event) {
  const file = (event.target.files || [])[0];
  els.coverInput.value = "";
  if (!file) return;
  const type = file.type || guessMime(file.name);
  if (!type.startsWith("image/")) {
    setStatus(t("coverInvalid"));
    return;
  }
  try {
    const dataUrl = await fileToDataUrl(file);
    const ext = (file.name.match(/\.[^.]+$/) || [".png"])[0].toLowerCase();
    state.cover = {
      name: file.name,
      type,
      path: `cover${ext}`,
      dataUrl,
    };
    markDirty();
    renderCover();
    setStatus(t("coverSet"));
  } catch (error) {
    setStatus(t("coverInvalid"));
  }
}

function removeCover() {
  if (!state.cover) return;
  state.cover = null;
  markDirty();
  renderCover();
  setStatus(t("coverRemoved"));
}

function coverXhtml() {
  const lang = xmlAttr(state.meta.language);
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" lang="${lang}" xml:lang="${lang}">
<head>
  <title>${escapeXml(exportT("cover"))}</title>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="styles/book.css" />
</head>
<body>
  <section epub:type="cover" class="cover-page" role="doc-cover">
    <img src="${xmlAttr(state.cover.path)}" alt="${escapeXml(exportT("cover"))}" />
  </section>
</body>
</html>`;
}

function tocNcx(chapterItems, bookId) {
  const lang = xmlAttr(state.meta.language);
  const navPoints = chapterItems.map((item, index) => `    <navPoint id="navpoint-${index + 1}" playOrder="${index + 1}">
      <navLabel><text>${escapeXml(item.title)}</text></navLabel>
      <content src="${xmlAttr(item.href)}" />
    </navPoint>`).join("\n");
  return `<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="${lang}">
  <head>
    <meta name="dtb:uid" content="${escapeXml(bookId)}" />
    <meta name="dtb:depth" content="1" />
    <meta name="dtb:totalPageCount" content="0" />
    <meta name="dtb:maxPageNumber" content="0" />
  </head>
  <docTitle><text>${escapeXml(state.meta.title)}</text></docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`;
}

function interactiveFallbackXhtml(title, sourceHtml) {
  const parsed = new DOMParser().parseFromString(sourceHtml || "", "text/html");
  parsed.querySelectorAll("script, style, canvas, template, noscript").forEach((node) => node.remove());
  const extracted = (parsed.body?.textContent || "").replace(/\s+/g, " ").trim();
  const summary = extracted
    ? extracted.slice(0, 1800)
    : "No equivalent text was supplied in the imported interactive chapter.";
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="${xmlAttr(state.meta.language)}" xml:lang="${xmlAttr(state.meta.language)}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeXml(title)} — interactive fallback</title>
  <link rel="stylesheet" href="../styles/book.css" />
</head>
<body>
  <main>
    <h1>${escapeXml(title)}</h1>
    <p>This chapter contains scripted interactive material. The following text is provided as a fallback for reading systems that do not support its HTML media type.</p>
    <p>${escapeXml(summary)}</p>
  </main>
</body>
</html>`;
}

function accessibilityMeta() {
  let imageCount = state.cover ? 1 : 0;
  let imagesWithAlt = state.cover ? 1 : 0;
  let hasAv = false;
  let hasInteractiveVisual = false;
  state.chapters.forEach((chapter) => {
    const parsed = new DOMParser().parseFromString(chapter.content || "", "text/html");
    parsed.querySelectorAll("img").forEach((image) => {
      imageCount += 1;
      if ((image.getAttribute("alt") || "").trim()) imagesWithAlt += 1;
    });
    if (parsed.querySelector("audio, video")) hasAv = true;
    if (chapter.kind === "html" || parsed.querySelector("canvas, iframe, model-viewer")) {
      hasInteractiveVisual = true;
    }
  });
  const hasImage = imageCount > 0;
  const allImagesHaveAlt = hasImage && imageCount === imagesWithAlt;
  const modes = ["textual"];
  if (hasImage || hasInteractiveVisual) modes.push("visual");
  if (hasAv) modes.push("auditory");
  const features = ["structuralNavigation"];
  if (allImagesHaveAlt) features.push("alternativeText");
  const summary = state.meta.language === "el"
    ? `Εκπαιδευτικό EPUB με δομημένη πλοήγηση. ${allImagesHaveAlt ? "Οι εικόνες που χρησιμοποιούνται περιλαμβάνουν εναλλακτικό κείμενο. " : "Τα μεταδεδομένα προσβασιμότητας πρέπει να ελεγχθούν πριν από τη διανομή. "}Η δήλωση αυτή δεν αποτελεί πιστοποίηση προσβασιμότητας.`
    : `Educational EPUB with structural navigation. ${allImagesHaveAlt ? "Images in use include text alternatives. " : "Accessibility metadata should be reviewed before distribution. "}This statement is not an accessibility certification.`;
  const lines = [];
  modes.forEach((mode) => lines.push(`<meta property="schema:accessMode">${mode}</meta>`));
  features.forEach((feature) => lines.push(`<meta property="schema:accessibilityFeature">${feature}</meta>`));
  lines.push(`<meta property="schema:accessibilityHazard">unknown</meta>`);
  lines.push(`<meta property="schema:accessibilitySummary">${escapeXml(summary)}</meta>`);
  return lines.map((line) => `    ${line}`).join("\n");
}

function removeAsset(id) {
  const asset = state.assets.find((item) => item.id === id);
  if (!asset) return;
  if (!confirm(t("confirmDeleteAsset"))) return;
  state.assets = state.assets.filter((item) => item.id !== id);
  if (state.selectedAssetId === id) state.selectedAssetId = "";
  markDirty();
  renderAssets();
  setStatus(t("assetDeleted"));
}

function insertLink() {
  const chapter = currentChapter();
  if (!chapter || chapter.kind !== "xhtml") {
    setStatus(t("visualOnly"));
    return;
  }
  setMode("visual");
  els.visualEditor.focus();
  const url = prompt(t("linkPrompt"), "https://");
  if (!url) return;
  document.execCommand("createLink", false, url);
  chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);
  markDirty();
}

function setImageAltText() {
  const chapter = currentChapter();
  if (!chapter || chapter.kind !== "xhtml") {
    setStatus(t("visualOnly"));
    return;
  }
  let image = lastSelectedImage;
  if (!image || !els.visualEditor.contains(image)) {
    const images = els.visualEditor.querySelectorAll("img");
    image = images.length === 1 ? images[0] : null;
  }
  if (!image) {
    setStatus(t("noImageSelected"));
    return;
  }
  const next = prompt(t("altPrompt"), image.getAttribute("alt") || "");
  if (next === null) return;
  image.setAttribute("alt", next);
  chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);
  markDirty();
  setStatus(t("altSet"));
}

function scheduleAutosave() {
  if (autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(saveLocal, 1500);
}

function saveLocal() {
  try {
    syncEditorToChapter();
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({ version: APP_VERSION, savedAt: Date.now(), state }));
  } catch (error) {
    // storage may be unavailable (for example on some file:// contexts); ignore
  }
}

function clearLocal() {
  try {
    localStorage.removeItem(AUTOSAVE_KEY);
  } catch (error) {
    // ignore
  }
}

function restoreLocalIfAvailable() {
  let raw = null;
  try {
    raw = localStorage.getItem(AUTOSAVE_KEY);
  } catch (error) {
    return false;
  }
  if (!raw) return false;
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    return false;
  }
  const incoming = data && data.state;
  if (!incoming || !Array.isArray(incoming.chapters) || !incoming.chapters.length) return false;
  if (!confirm(t("restorePrompt"))) {
    clearLocal();
    return false;
  }
  state.uiLanguage = incoming.uiLanguage || state.uiLanguage;
  state.selectedChapterId = incoming.selectedChapterId || "";
  state.selectedAssetId = incoming.selectedAssetId || "";
  state.activeMode = incoming.activeMode || "visual";
  state.meta = incoming.meta || state.meta;
  state.chapters = incoming.chapters || [];
  state.assets = incoming.assets || [];
  state.cover = incoming.cover || null;
  if (!state.selectedChapterId) state.selectedChapterId = state.chapters[0].id;
  return true;
}
