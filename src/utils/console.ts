export enum ConsoleType {
  Info,
  Warning,
  Error,
}

/**
 * A helper function to color a string.
 */
function getColoredString(str: string, color: string): string {
  return `\x1b[${color}m${str}\x1b[0m`;
}

/**
 * A utility class to log a message to the console in a more structured way.
 */
export class Console {
  /**
   * Logs a message to the console.
   * @param message The message to log.
   * @param type The type of the message.
   */
  public static log(
    message: string,
    type: ConsoleType = ConsoleType.Info,
    color: string = "0"
  ): void {
    const coloredMessage = getColoredString(message, color);
    const date = new Date().toISOString();
    const logMessage = `[${date}] ${coloredMessage}`;
    switch (type) {
      case ConsoleType.Info:
        console.log(logMessage);
        break;
      case ConsoleType.Warning:
        console.warn(logMessage);
        break;
      case ConsoleType.Error:
        console.error(logMessage);
        break;
    }
  }

  /**
   * Logs an info message to the console.
   * @param message The message to log.
   */
  public static info(message: string): void {
    this.log(message, ConsoleType.Info);
  }

  /**
   * Logs a warning message to the console.
   * @param message The message to log.
   */
  public static warn(message: string): void {
    this.log(message, ConsoleType.Warning, "33");
  }

  /**
   * Logs an error message to the console.
   * @param message The message to log.
   */
  public static error(message: string): void {
    this.log(message, ConsoleType.Error, "31");
  }
}
