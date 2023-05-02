export class Settings {
  /** The channels in the current session */
  public channels: string[] = [];

  /** Controls color theme (not yet implemented) */
  public darkMode: boolean = true;

  /** When set, background color of chats from this channel are changed to make them stand out */
  public highlightChannel: string = '';
}
