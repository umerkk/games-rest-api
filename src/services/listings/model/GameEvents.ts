import { model, Schema } from 'mongoose';
import DatabaseAdapter from '../../../common/database/DatabaseAdapter';
import GameEvent from '../types/GameEvent';
import GameImage from '../types/GameImage';

const gameImageSchema = new Schema<GameImage>({
    id: Number,
    url: String,
    type: Number
});
const gameEventSchema = new Schema<GameEvent>({
    category: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    images: [gameImageSchema],
    type: { type: Number, required: true },
    tags: { type: [String] },
    author: { type: String, required: true },
    replayBundleUrlJson: { type: String, required: true },
    duration: { type: Number, required: true },
    isDownloadable: { type: Boolean, required: true },
    isStreamable: { type: Boolean, required: true },
    version: { type: Number, required: true },
    isPremium: { type: Boolean },
});

export default model<GameEvent>('GameEvents', gameEventSchema);