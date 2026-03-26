/* Basic structure for variable feedback content - translation required */
export interface VariableFeedbackInfos {
  heading: string;
  feedbackInfos: VariableFeedbackContent[];
}

export interface VariableFeedbackContent {
  id: string;
  cardSubtitle: string;
  feedbackText: string;
}

/* Basic structure for static feedback content - no translation needed */
export interface StaticFeedbackContent {
  id: string;
  name: string;
  cardImage: string;
}

export type MergedFeedbackInfo = VariableFeedbackContent & StaticFeedbackContent;

export interface MergedFeedbackContent {
  heading: string;
  feedbackInfos: MergedFeedbackInfo[];
}
