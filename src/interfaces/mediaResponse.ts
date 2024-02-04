export interface IThumbnail {
   url: string;
   width: number;
   height: number;
}
export interface IThumbnailsObject {
  default: IThumbnail;
  medium: IThumbnail;
  high: IThumbnail;
  standard: IThumbnail;
  maxres: IThumbnail;
}
export interface IVideoSnippet {
   kind: string;
   etag: string;
   id: string;
   snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: IThumbnailsObject
   channelTitle: string;
   tags: string[];
   categoryId: string;
   liveBroadcastContent: string;
   localized: {
      title: string;
      description: string;
   };
   };
   
}

export interface IGetMediaResponse {
   kind: string;
   etag: string;
   items: IVideoSnippet[];
   nextPageToken: string;
   pageInfo: {
      totalResults: number;
      resultsPerPage: number;
   };
}