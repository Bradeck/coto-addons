import { ADVENTURE } from "./adventure.mjs";
/* -------------------------------------------- */
/*  Customize Import Form                       */
/* -------------------------------------------- */

/**
 * Add HTML options to the importer form
 * @returns {string}
 */
export function renderAdventureImporter(app, html, data) {
  if (app.adventure.pack !== ADVENTURE.packId) return;

  html.find(".window-content").addClass("coto_importer");

  // Insert options
  html.find(".adventure-contents").append(formatOptions());
  app.setPosition();
}

/**
 * Format adventure import options block.
 * @returns {string}
 */
function formatOptions() {
  let options = `<section class="import-form"><h2 class="border">Options</h2>`;
  for (const [name, option] of Object.entries(ADVENTURE.importOptions)) {
    options += `<div class="form-group">
      <label class="checkbox">
        <input type="checkbox" name="${name}" title="${option.label}" ${option.default ? "checked" : ""}/>
          ${option.label}
      </label>
    </div>`;
  }
  options += `</section>`;
  return options;
}

/* -------------------------------------------- */
/*  Handle Import                               */
/* -------------------------------------------- */

/**
 * Perform post-import tasks.
 * @param {Adventure} adventure  The adventure document.
 * @param {object} formData      The submitted adventure form data.
 * @param {object} created       An object of created document data.
 * @param {object} updated       An object of updated document data.
 */
export function onImport(adventure, formData, created, updated) {
  return handleImportOptions(adventure, formData, created, updated);
}

/* -------------------------------------------- */
/*  Handle Import Options                       */
/* -------------------------------------------- */

/**
 * Handle options supported by the importer
 * @param {Adventure} adventure
 * @param {object} formData
 * @param {object} created
 * @param {object} updated
 * @returns {Promise<void>}
 */
async function handleImportOptions(adventure, formData, created, updated) {
  if (adventure.pack !== ADVENTURE.packId) return;
  for (let [name, option] of Object.entries(ADVENTURE.importOptions)) {
    if (formData[name]) await option.handler(adventure, option);
  }
}

/**
 * Display an initial journal entry
 * @param {Adventure} adventure     The adventure being imported
 * @param {object} option           The configured import option
 * @returns {Promise<*>}
 */
export async function displayJournal(adventure, option) {
  const journal = game.journal.get(option.documentId);
  journal.sheet.render(true);
}

/**
 * Customize the world description and background image
 * @param {Adventure} adventure     The adventure being imported
 * @param {object} option           The configured import option
 * @returns {Promise<*>}
 */
export async function customizeJoin(adventure, option) {
  const worldData = {
    action: "editWorld",
    id: game.world.id,
    background: option.background,
  };
  await fetchJsonWithTimeout(foundry.utils.getRoute("setup"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(worldData),
  });
  game.world.updateSource(worldData);
}
