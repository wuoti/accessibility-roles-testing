/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (
  on: Cypress.PluginEvents,
  config: Cypress.RuntimeConfigOptions
) => {
  // Fail fast (stop running after a test fails) - https://github.com/javierbrea/cypress-fail-fast
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('cypress-fail-fast/plugin')(on, config)
  return {
    browsers: config.browsers.filter((b) => b.family === 'chromium'),
  }
}
