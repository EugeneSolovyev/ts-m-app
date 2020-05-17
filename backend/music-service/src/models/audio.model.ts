import { Schema, model } from 'mongoose'
import { ALLOWED_AUDIO_TYPES, AllowedType } from '../constants/allowed_audio_types'

const TypeEnum: string[] = ALLOWED_AUDIO_TYPES.map(({ id }: AllowedType) => id)

const AudioSchema: Schema = new Schema({
  author: { type: Schema.Types.String, required: true },
  title: { type: Schema.Types.String, required: true },
  album: { type: Schema.Types.String, default: 'Untitled' },
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
  genres: { type: Array, default: [] }
})

export const AudioModel = model('Track', AudioSchema)
