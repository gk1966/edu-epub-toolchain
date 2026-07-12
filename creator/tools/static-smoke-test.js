const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const styles = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const checks = {
  assetInsertInputHtml: html.includes('id="assetInsertInput"'),
  assetInsertInputBound: app.includes('els.assetInsertInput.addEventListener("change"'),
  toolbarClicksInsertInput: app.includes("els.assetInsertInput.click()"),
  libraryInputDoesNotInsert: app.includes('els.assetInput.addEventListener("change", (event) => addAssets(event, { insertIntoChapter: false })'),
  noPendingFlag: !app.includes("pendingAutoInsertAsset"),
  visualInputDehydrates: app.includes("chapter.content = dehydrateEditorAssetUrls(els.visualEditor.innerHTML);"),
  chapterLoadHydrates: app.includes("els.visualEditor.innerHTML = hydrateEditorAssetUrls(chapter.content);"),
  iframeHydration: app.includes('querySelectorAll("img, video, audio, iframe")'),
  blockInsertionGuard: app.includes("findInsertionBlock") && app.includes("isBlockFragment"),
  selectionPreserved: app.includes("savedEditorRange") && app.includes("function captureEditorSelection"),
  htmlPackageInputHtml: html.includes('id="importHtmlPackageInput"'),
  htmlPackageButtonBound: app.includes("els.importHtmlPackageButton.addEventListener") && app.includes("importHtmlPackage"),
  htmlPackageRewriter: app.includes("rewriteHtmlPackageReferences") && app.includes("resolvePackageReference"),
  columnsControlHtml: html.includes('id="columnLeftInput"') && html.includes('id="insertColumnsButton"'),
  columnsInsertBound: app.includes("els.insertColumnsButton.addEventListener") && app.includes("function insertColumns"),
  columnsExportCss: app.includes(".edu-columns") && app.includes("grid-template-columns: 1fr !important"),
  columnAssetInsertion: app.includes("nearestEditorColumn") && app.includes("insertBlockInsideColumn") && app.includes("findColumnBlockAnchor"),
  sourcePreviewSyncGuard: app.includes('state.activeMode === "visual" && chapter.kind === "xhtml"'),
  noPreviewVisualOverwrite: !app.includes('} else if (chapter.kind === "xhtml") {'),
  cacheVersion: html.includes("20260610-langs"),
  bookLanguagesMany: (html.match(/<option value="[a-z]{2}">/g) || []).length >= 40,
  importMenuHtml: html.includes('class="import-menu"') && html.includes('id="importMenuSummary"'),
  mdTxtEpubHtml: html.includes('id="importDocInput"') && html.includes('id="importEpubInput"') && html.includes("marked.umd.js"),
  mdTxtEpubWired: app.includes("function importMarkdownOrText") && app.includes("function importEpub") && app.includes("function importTextFile"),
  wordImportHtml: html.includes('id="importWordInput"') && html.includes("mammoth.browser.min.js"),
  wordImportWired: app.includes("function importWordDocx") && app.includes("convertToHtml"),
  toolbarMouseDownPreservesSelection: app.includes('button.addEventListener("mousedown"') && app.includes("event.preventDefault();"),
  visualToolbarSelectionRestored: app.includes("restoreSavedEditorSelection") && app.includes("captureEditorSelection();"),
  sourceToolbarStaysSource: app.includes('if (state.activeMode === "source")') && app.includes("runSourceCommand(command, value);"),
  sourceToolbarTags: app.includes("wrapSourceSelection") && app.includes("insertSourceUnorderedList") && app.includes("replaceSourceRange"),
  runCommandConditionalVisual: app.includes('if (state.activeMode !== "visual")'),
  codeLibraryHtml: html.includes('id="snippetSearch"') && html.includes('id="snippetCategory"') && html.includes('id="snippetList"'),
  codeLibraryData: app.includes("const codeLibrarySnippets") && app.includes("Interactive 3D frame") && app.includes("Accessible data table"),
  codeLibraryBound: app.includes("els.snippetSearch.addEventListener") && app.includes("insertLibrarySnippet"),
  codeLibraryExportCss: app.includes(".definition-card") && app.includes(".data-table") && styles.includes(".snippet-item"),
  toolbarAlign: html.includes('data-command="justifyCenter"') && app.includes("alignCenterButton"),
  alignSourceHandling: app.includes("function wrapSourceAlignment"),
  richLibraryBlocks: app.includes("Pull quote") && app.includes("Call-to-action box") && app.includes("Checklist") && app.includes("Drop-cap paragraph"),
  blockComponentsCss: app.includes(".edu-button") && app.includes(".pullquote") && styles.includes(".edu-button"),
  assetDeleteWired: app.includes("function removeAsset") && html.includes('id="setAltButton"'),
  ncxWired: app.includes("function tocNcx") && app.includes('<spine toc="ncx">'),
  a11yMeta: app.includes("function accessibilityMeta") && app.includes("schema:accessMode"),
  landmarksNav: app.includes('epub:type="landmarks"'),
  autosaveWired: app.includes("AUTOSAVE_KEY") && app.includes("function restoreLocalIfAvailable"),
  shortcutsWired: app.includes("saveProjectJson()") && app.includes("exportEpub()"),
  altTextWired: app.includes("function setImageAltText"),
  coverInputHtml: html.includes('id="coverInput"'),
  coverWired: app.includes("function setCoverFromFile") && app.includes('properties="cover-image"'),
  exportCheckHtml: html.includes('id="checkEpubButton"') && html.includes('id="validationDialog"'),
  exportCheckWired: app.includes("function validateProject") && app.includes("function showValidationReport"),
  exportCheckNonBlocking: app.includes("Export anyway") && app.includes("pendingValidatedExport"),
  accessible3dLesson: app.includes("3D lesson with accessible alternative") && app.includes("interactive-fallback"),
  beforeUnloadGuard: app.includes('window.addEventListener("beforeunload"') && app.includes("projectDirty"),
  importErrorHandling: app.includes('setStatus(t("loadError"))') && app.includes('setStatus(t("importError"))'),
};

const failed = Object.entries(checks)
  .filter(([, passed]) => !passed)
  .map(([name]) => name);

console.log(JSON.stringify(checks, null, 2));

if (failed.length) {
  console.error(`Static smoke test failed: ${failed.join(", ")}`);
  process.exit(1);
}
