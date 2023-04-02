import { Badges } from "tmi.js";

export class Message {
  username!: string;
  message!: string;

  badges?: Badges;
  color?: string;
  "display-name"?: string;
  emotes?: { [emoteid: string]: string[] };
  mod?: boolean;
  "room-id"?: string;
  subscriber?: boolean;
  turbo?: boolean;
  "user-id"?: string;
  "user-type"?: "" | "mod" | "global_mod" | "admin" | "staff";
  "emotes-raw"?: string;
  "badges-raw"?: string;
  "message-type"?: string;
  channel?: string;
}
