import Logger from '../../../utils/Logger';
import GameEventsModel from '../model/GameEvents';
import GameEvent from '../types/GameEvent';

export default class GameEventsDAL {
    private static model = GameEventsModel;

    /**
     * Executes the wildcard select query against GameEvent model.
     * It projects specific attributes as defined in $project.
     * @param limit - # of documents to return
     * @param skip - # of documents to skip from 0.
     * @returns - Array of GameEvents
     */
    public static async getAll(limit: number, skip: number): Promise<GameEvent[]> {
        Logger.info(limit);
        Logger.info(skip);
        return this.model.aggregate([
            { $match: {} },
            { $skip: skip },
            { $limit: limit },
            { $project: {'category': 1, 'title': 1, 'subtitle': 1, 'type': 1, 'images': 1, 'author': 1, 'duration': 1, 'version': 1}}
        ])
    }

    public static async getOne(id: string): Promise<GameEvent | null>{
        return this.model.findById(id);
    }

    public static async addNewEvent(event: GameEvent): Promise<GameEvent | null> {
        return this.model.create(event);
    }

    public static async deleteEvent(id: string): Promise<GameEvent | null> {
        return this.model.findByIdAndDelete(id);
    }
}