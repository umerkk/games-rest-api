import Logger from '../../../utils/Logger';
import GameEventsModel from '../model/GameEvents';
import GameEvent from '../types/GameEvent';

export default class GameEventsDAL {
    private static model = GameEventsModel;

    public static async getAll(limit: number, skip: number): Promise<GameEvent[]> {
        Logger.info(limit);
        Logger.info(skip);
        return this.model.aggregate([
            { $match: {} },
            { $skip: skip },
            { $limit: limit },
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