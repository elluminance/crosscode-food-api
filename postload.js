window.foodAPI = {

    foodList: {
        "FALLBACK": {
            src: "foodAPI",
            index: 0
        }
    },
    spriteSrc: {
        foodAPI: new ig.TileSheet("media/entity/player/foods/food-api.png", 16, 16, 0, 0)
    },


    /**
     * Registers a new food entry.
     * @param modID {String} The internal ID of the mod registering items.
     * @param spriteFilename {String} The filename of the food sprite sheet, with the path media/entity/player/foods/ automatically appended.
     * @param itemList {Array<String>} An array of strings for food sprite IDs.
     **/
    register(modID, spriteFilename, itemList){
        // do not allow two mods attempt to register the same id twice
        if (modID in this.spriteSrc) throw new Error(`FoodAPI: Food registry with ID ${modID} already registered!`)
        
        // gets the proper location of the food tilesheet
        const updatedImagePath = `media/entity/player/foods/${spriteFilename}`
        let img = new ig.TileSheet(updatedImagePath, 16, 16, 0, 0)
        foodAPI.spriteSrc[modID] = img;

        let itemID = ""
        for(let i = 0; i < itemList.length; i++){
            itemID = itemList[i]
            if(itemID in sc.FOOD_SPRITE){
                console.error(`FoodAPI: Item with name ${itemID} already registered by CrossCode!`);
                continue;
            } else if(itemID in foodAPI.foodList){
                console.error(`FoodAPI: Item with name ${itemID} already registered by ${foodAPI.foodList[itemID].src}`);
                continue;
            }
            foodAPI.foodList[itemID] = {
                src: modID,
                index: i
            }
        }
    }
}
