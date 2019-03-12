import { app as electronApplication } from "electron";

// Lib.
import { EntryPoint } from "@Lib/decorators";
import { AbstractWindow } from "@Lib/electron";
import { cliLog } from "@Lib/utils";

// View.
import { MainWindow } from "@Application/windows/MainWindow";

@EntryPoint()
export class Application {

  public static activeWindow: AbstractWindow | null = null;

  public static main(): void {

    cliLog.info("Initializing electron application.");

    electronApplication.on("ready", Application.onApplicationReady);
    electronApplication.on("window-all-closed", Application.onApplicationWindowsClosed);
    electronApplication.on("activate", Application.onApplicationActivated);
  }

  public static onApplicationReady(): void {

    cliLog.info("Application ready.");

    Application.activeWindow = new MainWindow();
    Application.activeWindow.init();
    Application.activeWindow.afterClosed(Application.onActiveWindowDestroy);
  }

  public static onApplicationActivated(): void {

    cliLog.info("Application activated.");

    if (Application.activeWindow === null) {
      Application.activeWindow = new MainWindow();
      Application.activeWindow.init();
      Application.activeWindow.afterClosed(Application.onActiveWindowDestroy);
    }
  }

  public static onApplicationWindowsClosed(): void {

    cliLog.info("All application windows closed.");

    if (process.platform !== "darwin") {
      application.quit();
    }
  }

  public static onActiveWindowDestroy(): void {

    cliLog.info("Active window destroyed.");

    Application.activeWindow = null;
  }

}
