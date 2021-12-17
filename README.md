# Food-API

Simplifies the way modders can add custom food sprites for CrossCode.

## For users:

Simply drop **food-api.ccmod** from [Releases](https://github.com/EL20202/crosscode-food-api/releases) into CrossCode/assets/mods after installing ccloader.

## For mod developers:

### ***Using Food-API***
Install **food-api** as normal, and in your mod's prestart script you simply call the function: 

`sc.foodAPI.register(modID, spriteFile, itemList)`.

- `modID` - The internal ID of the mod.
- `spriteFile` - The filename of the spritesheet of the foods you are adding, located in `assets/media/entity/player/foods/`.
- `itemList` - An array of all item names you will be adding in order from left to right, top to bottom.

For example, if you are the mod author of the mod "leas-adventure", and you want to add custom consumable, adding sprites from `leas-adventure.png`, you simply put that sprite sheet at `assets/media/entity/player/food/leas-adventure.png`. The spritesheet's width and height should be multiples of 16 (for example, a sprite sheet could be 64×128, or something like 96×64). Each food sprite is 16×16 in size.

When using item-api to add in the actual consumable items, you would use `"foodSprite": "FOOD_NAME"` (of course using your food sprites's actual name!) as a field to the item entry in your `item-database.json.patch` file - identical as how vanilla consumables' food sprites work, pretty much!

An example of how to use food-api can be found [here](https://github.com/EL20202/crosscode-food-api-example).

Out of courtesy to your fellow modders, please use files/ids with reference to your mod. If your mod is called leas-adventure, use that name in reference to food sprites such as `leas-adventure.png`. When using food ids, use names like "LA-APPLE" or "LA-BREAD". That way - potential conflicts can be avoided.

### ***Adding Buffs***

Along with adding the ability to easily add custom consumable item sprites, food-api also adds in a few missing buff icons for modifiers that one may want to take advantage of in their custom items! Though, one needs to add the actual buff effects themselves - food-api merely adds the icon and the buff type.

For example, if one wants to add a buff for 10% to momentum - it is rather simple.

In your mod's prestart phase, simply mimic this snippet: 
```js
sc.STAT_CHANGE_SETTINGS["FOODAPI_DASH_INVINC-1"] = {
    change: sc.STAT_CHANGE_TYPE.MODIFIER, // don't change this for a modifier
    type: sc.STAT_PARAM_TYPE.DASH_INVINC, // change this to the type of buff you want
    value: 0.1, // the value of the buff - for this case, it is +10%.
    icon: "stat-dash-invinc", // the icon the buff uses
    grade: "stat-rank-1" // the arrow that shows the increase
};
```

&nbsp;

Have fun and happy fooding!

~ EL
