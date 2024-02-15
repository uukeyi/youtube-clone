export interface ICommentsResponse {
   kind: string;
   etag: string;
   nextPageToken: string;
   pageInfo: {
      totalResults: number;
      resultsPerPage: number;
   };
   items: IComment[];
}
interface ITopLevelCommentSnippet {
   channelId: string;
   videoId: string;
   textDisplay: string;
   textOriginal: string;
   authorDisplayName: string;
   authorProfileImageUrl: string;
   authorChannelUrl: string;
   authorChannelId: {
      value: string;
   };
}
interface ITopLevelComment {
   kind: string;
   etag: string;
   id: string;
   snippet: ITopLevelCommentSnippet;
}

interface ISnippetComment {
   channelId: string;
   videoId: string;
   topLevelComment: ITopLevelComment;
   canRate: boolean;
   viewerRating: string;
   likeCount: number;
   publishedAt: string;
   updatedAt: string;
}

export interface IComment {
   kind: string;
   etag: string;
   id: string;
   snippet: ISnippetComment;
   canReply: boolean;
   totalReplyCount: number;
   isPublic: boolean;
}


export interface IGetCommentsReturn {
   newRequest: boolean;
   comments: ICommentsResponse;
}