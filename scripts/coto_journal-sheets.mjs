/**
 * Custom journal sheet for styling purposes.
 */
export default class CotOAddonsJournalSheet extends dnd5e.applications.journal.JournalSheet5e {
  constructor(doc, options) {
    super(doc, options);
    this.options.classes.push("coto");
  }

  /* Click Overrides */
  /** @inheritDoc */
  activateListeners(html) {
    super.activateListeners(html);

    html.on("click", (event) => {
      if (event.target.dataset.type === "Scene") {
        event.stopImmediatePropagation();
        game.scenes.get(event.target.dataset.id).view();
      }
    });
  }
}
