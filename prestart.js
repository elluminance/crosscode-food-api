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
        var d = {};
        var a = this.timer / 0.1;
        this.state != sc.FOOD_ICON_STATE.DONE && (a = 1 - a);
        var b, f = 0, g = 0;
        if (this.state != sc.FOOD_ICON_STATE.HOLD) {
            this.setSpriteCount(2, true);
            b = this.sprites[0];
            b.setPos(this.coll.pos.x - 12 + this.offset.x, this.coll.pos.y + 2, this.coll.pos.z + 28 + 2 + this.offset.y);
            b.setSize(24, 0, 32);
            b.setPivot(12, 16);
            b.setImageSrc(this.bubbleGfx, 0, 288);
            b.setAlpha(0.8);
            b.setTransform(a, a, 0);
            b = this.sprites[1];
            f = 0;
            g = 38
        } else {
            this.setSpriteCount(1);
            b = this.sprites[0];
            f = -10;
            g = 17
        }
        f = f + this.offset.x;
        g = g + this.offset.y;
        b.setPos(this.coll.pos.x + f - 8, this.coll.pos.y + 4, this.coll.pos.z + g + 4);
        b.setSize(16, 0, 16);
        b.setPivot(8, 8);
        if(!this.customItem)
        {
            f = this.foodSheet.getTileSrc(d, this.icon);
            b.setImageSrc(this.foodSheet.image, f.x, f.y);
        }
        else
        {
            let customFood = foodAPI.foodList[this.icon]
            let foodSrc = foodAPI.spriteSrc[customFood.src];
            let imgWidth = foodSrc.image.width / 16

            let offsetX = (customFood.index % imgWidth) * 16,
                offsetY = (Math.floor(customFood.index / imgWidth)) * 16
            b.setImageSrc(foodSrc.image, offsetX, offsetY)
        }
        b.setTransform(a, a, 0)
    }
})