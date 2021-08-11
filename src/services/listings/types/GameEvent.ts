import { Types } from 'mongoose';
import GameImage from './GameImage';

export default interface GameEvent {
    category: string,
    title: string,
    subtitle: string,
    description: string,
    images: Types.Array<GameImage>,
    type: number,
    tags: string[],
    author: string,
    replayBundleUrlJson: string,
    duration: number,
    isDownloadable: boolean,
    isStreamable: boolean,
    version: number,
    isPremium: boolean
}