window.foodAPI = {

    foodList: {
        "FALLBACK": {
            src: "foodAPI",
            index: 0
        }
    },
    spriteSrc: {
        foodAPI: new ig.TileSheet("media/entity/player/foods/food-api.png")
    },


    /**
     * Registers a new food entry.
     * @param modID {String} The internal ID of the mod registering items.
     * @param imgPath {String} The path to the food spritesheet. The path media/entity/player/foods/ is automatically applied.
     * @param itemList {Array<String>} An array of strings for food sprite IDs.
     **/
    registerFoods(modID, imgPath, itemList){
        // do not allow two mods attempt to register the same id twice
        if (modID in this.spriteSrc) throw new Error(`FoodAPI: Food registry with ID ${modID} already registered!`)
        
        // gets the proper location of the food tilesheet
        const updatedImagePath = imgPath.match(/^media\/entity\/player\/foods\//) == null ? "media/entity/player/foods/" + imgPath : imgPath
        let img = new ig.TileSheet(updatedImagePath, 16, 16, 0, 0)
        foodAPI.spriteSrc[modID] = img;

        let itemID = ""
        for(let i = 0; i < itemList.length; i++){
            itemID = itemList[i]
            if(itemID in foodAPI.foodList){
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
