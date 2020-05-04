import { Schema, model } from 'mongoose'

const TypeEnum: string[] = ['music', 'podcast', 'book']

const AudioSchema: Schema = new Schema({
  author: { type: Schema.Types.String, required: true },
  title: { type: Schema.Types.String, required: true },
  track_id: { type: Schema.Types.String, required: true, unique: true },
  cover_id: { type: Schema.Types.String, required: true },
  type: {
    type: Schema.Types.String,
    required: true,
    enum: TypeEnum,
  },
  likes: { type: Schema.Types.Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const AudioModel = model('Track', AudioSchema)
