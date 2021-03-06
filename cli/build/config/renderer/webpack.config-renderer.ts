import { Configuration } from "webpack";

import { ENVIRONMENT, IS_PRODUCTION, DEV_SERVER_ENABLED } from "../webpack.constants";
import { MODULE_CONFIG } from "../webpack.module.config";
import { PERFORMANCE_CONFIG } from "../webpack.performance.config";
import { RESOLVE_CONFIG } from "../webpack.resolve.config";
import { STATS_CONFIG } from "../webpack.stats.config";

import { DEV_SERVER_CONFIG } from "./webpack.devServer.config";
import { IO_CONFIG } from "./webpack.io-renderer.config";
import { PLUGIN_CONFIG } from "./webpack.plugin-renderer.config";

/**
 * Restrict build with environment declaration to prevent unexpected issues.
 */
if (!ENVIRONMENT) {
  throw new Error("Environment must be set for webpack build.");
}

/**
 * Project-level webpack configuration.
 * Bundled from multiple computed scripts.
 */
export const WEBPACK_RENDERER_CONFIG: Configuration = {
  devtool: false,
  entry: IO_CONFIG.ENTRY,
  devServer: DEV_SERVER_CONFIG,
  mode: IS_PRODUCTION ? "production" : "development",
  module: MODULE_CONFIG,
  optimization: PLUGIN_CONFIG.OPTIMIZATION,
  output: IO_CONFIG.OUTPUT,
  plugins: PLUGIN_CONFIG.PLUGINS,
  resolve: RESOLVE_CONFIG,
  stats: STATS_CONFIG,
  performance: PERFORMANCE_CONFIG,
  target: DEV_SERVER_ENABLED ? "web" : "electron-renderer"
} as Configuration;

export default WEBPACK_RENDERER_CONFIG;
