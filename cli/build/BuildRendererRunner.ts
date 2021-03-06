import { green, red } from "colors";
import { default as Webpack, Compiler } from "webpack";

import { Run } from "../utils";

@Run()
export class BuildRunner {

  public static readonly STATS_PRINT_CONFIG: Record<string, any> = { colors: true };

  public static main(args: Array<string>): void {
    /**
     * Handle entries selection for optional serving.
     */
    if (args.length > 2) {
      process.env.ENTRIES = JSON.stringify(args.slice(2));
    }

    const { PROJECT_OUTPUT_PATH, PROJECT_ROOT_PATH, WEBPACK_RENDERER_CONFIG } = require("./config/renderer");
    const compiler: Compiler = Webpack(WEBPACK_RENDERER_CONFIG);

    process.stdout.write(
      `Started building renderer bundle in ${green(process.env.NODE_ENV || "unselected")} mode.\n\n` +
      `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
      `Project output: '${green(PROJECT_OUTPUT_PATH)}'.\n` +
      (args.length > 2 ? `Modules for serving: ${green(JSON.stringify(args.slice(2)))}.\n\n` : "\n")
    );

    compiler.run((error: any, stats: any): void => {
      if (error) {
        process.stdout.write(red("\nFailed to build client bundle: " + "\n" +
          error.toString(BuildRunner.STATS_PRINT_CONFIG) + "\n"));
      } else {
        process.stdout.write(green("\nSuccessfully built client bundle: " + "\n" +
          stats.toString(BuildRunner.STATS_PRINT_CONFIG) + "\n"));
      }
    });
  }

}
