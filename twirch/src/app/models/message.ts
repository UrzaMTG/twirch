export class Message {
  channel: string;
  username: string;
  timestamp: Date | null;
  text: string;

  constructor(channel: string, username: string, text: string, timestamp: Date | null) {
    this.channel = channel;
    this.username = username;
    this.timestamp = timestamp;
    this.text = text;
  }
}
