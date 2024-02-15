export interface IThumbnail {
   url: string;
   width: number;
   height: number;
}
export interface IThumbnailsObject {
   default: IThumbnail;
   medium: IThumbnail;
   high: IThumbnail;
   standard?: IThumbnail;
   maxres?: IThumbnail;
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
      thumbnails: IThumbnailsObject;
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
   prevPageToken :string;
   pageInfo: {
      totalResults: number;
      resultsPerPage: number;
   };
}

export interface IGetSearchVideoResponse {
   kind: string;
   etag: string;
   items: ISearchVideoSnippet[];
   nextPageToken: string;
   regionCode: string;
   pageInfo: {
      totalResults: number;
      resultsPerPage: number;
   };
}

export interface ISearchVideoSnippet {
   kind: string;
   etag: string;
   id: {
      kind: string;
      videoId: string;
   };
   snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: IThumbnailsObject;
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
   };
}


export interface IGetMediaReturn {
   newRequest : boolean,
   media : IGetMediaResponse
}
 export interface IGetSearchDataReturn {
   newRequest : boolean,
   data : IGetSearchVideoResponse
}