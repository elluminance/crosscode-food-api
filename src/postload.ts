sc.FoodAPI = ig.Class.extend({
    foodList: {
        "FALLBACK": {
            src: "foodAPI",
            index: 0
        }
    },

    spriteSrc: {
        foodAPI: new ig.TileSheet("media/entity/player/foods/food-api.png", 16, 16, 0, 0)
    },

    register(modID, spriteFilename, spriteList){
        // do not allow two mods attempt to register the same id twice
        if (modID in this.spriteSrc) throw new Error(`FoodAPI: Food registry with ID ${modID} already registered!`)
        
        // gets the proper location of the food tilesheet
        const updatedImagePath = `media/entity/player/foods/${spriteFilename}`
        let img = new ig.TileSheet(updatedImagePath, 16, 16, 0, 0)
        this.spriteSrc[modID] = img;

        for(let itemID of spriteList){
            if(itemID in sc.FOOD_SPRITE){
                ig.error(`food-api: Item with name '${itemID}' already registered by CrossCode!`);
                continue;
            } else if(itemID in this.foodList){
                ig.error(`food-api: Item with name '${itemID}' already registered by ${this.foodList[itemID].src}`);
                continue;
            }
            this.foodList[itemID] = {
                src: modID,
                index: spriteList.indexOf(itemID)
            }
        }
    },

    getSpriteOffset(foodName) {
        let foodEntry = this.foodList[foodName]
        let index = foodEntry.index
        let width = this.spriteSrc[foodEntry.src].image.width / 16

        return [(index % width) * 16, Math.floor(index / width) * 16]
    },

    getImage(foodName) {
        return this.spriteSrc[this.foodList[foodName].src]
    },

    isCustomFood(foodName: string) {
        return !(foodName in sc.FOOD_SPRITE);
    }
})

window.foodAPI = sc.foodAPI = new sc.FoodAPI;