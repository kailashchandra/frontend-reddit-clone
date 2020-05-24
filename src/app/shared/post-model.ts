import { VoteType } from './vote-button/vote-type';

export class PostModel {
    id: number;
    postName: string;
    url: string;
    description: string;
    voteCount: number;
    userName: string;
    subredditName: string;
    commentCount: number;
    duration: string;
    upVote: boolean;
    downVote: boolean;
}