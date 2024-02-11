import { IThumbnailsObject } from "./mediaResponse";

export interface IChannel {
   kind: string;
   etag: string;
   id: string;
   snippet: {
      title: string;
      description: string;
      customUrl: string;
      publishedAt: string;
      thumbnails: IThumbnailsObject;
      localized: {
         title: string;
         description: string;
      };
   };
}

export interface IChannelResponse {
   kind: string;
   etag: string;
   pageInfo: {
      totalResults: number;
      resultsPerPage: number;
   };
   items: IChannel[];
}
