import CotOAddonsJournalSheet from "./coto_journal-sheets.mjs";
import { ADVENTURE } from "./adventure/adventure.mjs";
import { renderAdventureImporter, onImport } from "./adventure/importer.mjs";

/* -------------------------------------------- */
/*  Hooks                                       */
/* -------------------------------------------- */

Hooks.on("init", () => {
  // Register Journal Sheet
  DocumentSheetConfig.registerSheet(JournalEntry, "coto-addons", CotOAddonsJournalSheet, {
    types: ["base"],
    label: "CotO Addons",
    makeDefault: false,
  });
});

Hooks.on("ready", async () => {
  const imported = !!game.settings.get("core", "adventureImports")?.[ADVENTURE.adventureUuid];
  if (!imported && game.user.isGM) {
    const pack = game.packs.get(ADVENTURE.packId);
    const adventure = await pack.getDocument(ADVENTURE.adventureId);
    adventure.sheet.render(true);
  }
});

/* -------------------------------------------- */
/*  Adventure Import					                  */
/* -------------------------------------------- */

Hooks.on("renderAdventureImporter", renderAdventureImporter);
Hooks.on("importAdventure", onImport);
