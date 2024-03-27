import * as handlers from "./importer.mjs";

/**
 * Import configuration
 */
export const ADVENTURE = {
  // module info
  moduleName: "coto-addons",
  packName: "coto-addons-adv",
  packId: "coto-addons.coto-addons-adv",
  adventureUuid: "Compendium.coto-addons.coto-addons-adv.Adventure.jCCEZ80vRiGfA95h",
  adventureId: "jCCEZ80vRiGfA95h",

  // A CSS class to automatically apply to application windows which belong to this module
  cssClass: "coto",

  description: `
        Small companion module for the Crown of the Oathbreaker Foundry VTT campaing module by Elderbrain.
        `,

  // Define special Import Options with custom callback logic
  importOptions: {
    displayJournal: {
      label: "Display Preamble Journal",
      default: true,
      handler: handlers.displayJournal,
      documentId: "WwhwzeW0gXpEK9SU",
    },
    customizeJoin: {
      label: "Customize World Details",
      default: false,
      handler: handlers.customizeJoin,
      background: "modules/crown-of-the-oathbreaker/art-scenes/cover.webp",
    },
  },

  // The ID of the 'Premble' journal to determine if the adventure has been imported before.
  gettingStartedId: "WwhwzeW0gXpEK9SU",
};
