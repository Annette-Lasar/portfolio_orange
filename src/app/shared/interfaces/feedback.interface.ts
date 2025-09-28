export interface FeedbackInfo {
  id: string;
  cardTitle: string;
  cardSubtitle: string;
  cardImage: string;
  feedbackText: string;
}

export interface FeedbackContent {
  heading: string;
  feedbackInfos: FeedbackInfo[];
}


export interface StaticFeedbackInfo {
  id: string;
  cardImage: string;
}