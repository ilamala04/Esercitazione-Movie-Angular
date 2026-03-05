import { StreamingChannel } from "./streaming_channels";
export interface Movie {
 id: number;
 title: string;
 director:string;
 description: string;
 streaming_channel: StreamingChannel;
}