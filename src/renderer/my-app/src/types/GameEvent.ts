import GameImage from './GameImages';

export default interface GameEvent {
    category: string,
    title: string,
    subtitle: string,
    description: string,
    images: GameImage[],
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