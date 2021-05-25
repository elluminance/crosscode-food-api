ig.ACTION_STEP.SHOW_FOOD_ICON.inject({
    init(a) {
        this.customItem = !(a.icon in sc.FOOD_SPRITE)
        this.icon = sc.FOOD_SPRITE[a.icon] ?? (this.customItem ? ((a.icon in foodAPI.foodList) ? a.icon : "FALLBACK") : 0);
        this.offset = a.offset || null;
    },
    start(a) {
        a = ig.game.spawnEntity(sc.FoodIconEntity, 0, 0, 0, {
            icon: this.icon,
            customItem: this.customItem,
            combatant: a
        });
        this.offset && a.setState(sc.FOOD_ICON_STATE.HOLD, this.offset)
    }
})


sc.FoodIconEntity.inject({
    customItem: false,
    
    init: function(a, b, d, g) {
        this.parent(a, b, d, g);
        this.customItem = g.customItem;
    },

    updateSprites() {
        this.parent()
        var b = this.sprites[(this.state != sc.FOOD_ICON_STATE.HOLD) ? 1 : 0]  
        
        if(this.customItem)
        {
            let customFood = foodAPI.foodList[this.icon]
            let foodSrc = foodAPI.spriteSrc[customFood.src];
            let imgWidth = Math.floor(foodSrc.image.width / 16)
    
            let offsetX = (customFood.index % imgWidth) * 16,
                offsetY = (Math.floor(customFood.index / imgWidth)) * 16
            b.setImageSrc(foodSrc.image, offsetX, offsetY)
        }
    }
})