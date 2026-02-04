import { model, Schema } from "mongoose";

export interface ISampleFix {
  name: string;
  description?: string;
}

const SampleFixSchema = new Schema<ISampleFix>({
  name: { type: String, required: true },
  description: { type: String },
}, { collection: "sample_fix" });

export const SampleFix = model<ISampleFix>("SampleFix", SampleFixSchema);
