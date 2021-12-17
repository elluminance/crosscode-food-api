declare namespace ig {
    namespace ACTION_STEP {
        // @ts-ignore
        interface SHOW_FOOD_ICON {
            customItem?: string
        }
    }
}

declare namespace sc {
    namespace FoodIconEntity {
        interface Settings {
            customItem?: string
        }
    }

    interface FoodIconEntity {
        customItem?: string
    }
    
    namespace FoodAPI {
        interface ModFoodEntry {
            src: string
            index: number
        }
    }

    interface FoodAPI extends ig.Class {
        foodList: {[key: string]: FoodAPI.ModFoodEntry}
        spriteSrc: {[key: string]: ig.TileSheet}

        init(this: this): void
        register(this: this, modID: string, spriteFilename: string, itemList: string[]): void
        getSpriteOffset(this: this, foodName: string): [number, number] | null
        getImage(this: this, foodName: string): ig.TileSheet | null
        isCustomFood(this: this, foodName: string): boolean
    }

    interface FoodAPIConstructor extends ImpactClass<FoodAPI> {
        new (): FoodAPI
    }

    var FoodAPI: FoodAPIConstructor
    var foodAPI: FoodAPI
}

interface Window {
    foodAPI: sc.FoodAPI
}