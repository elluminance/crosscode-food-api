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

// retrieves the icons
const buffIcons = new ig.Font("media/font/icons-buff-el.png", 8, ig.MultiFont.ICON_START);
const buffIconsLarge = new ig.Font("media/font/icons-buff-large-el.png", 16, ig.MultiFont.ICON_START);

// retrieves index of last icon set registered, then pushes new icons
const newTinyFontIndex = sc.fontsystem.tinyFont.iconSets.length;
const newFontIndex = sc.fontsystem.font.iconSets.length;
sc.fontsystem.tinyFont.pushIconSet(buffIcons);
sc.fontsystem.font.pushIconSet(buffIconsLarge);

//assigns names to icons
sc.fontsystem.tinyFont.setMapping({
    "stat-critical-dmg": [newTinyFontIndex, 0], // bullseye
    "stat-dash-invinc": [newTinyFontIndex, 1], // flash step
    "stat-assault": [newTinyFontIndex, 2], // assault
    "stat-guard-sp": [newTinyFontIndex, 3], // avenger
    "stat-momentum": [newTinyFontIndex, 4], // momentum
    "stat-cond-effect-all": [newTinyFontIndex, 5], // status rush
    "stat-knockback": [newTinyFontIndex, 6], // bulk calibre
    "stat-perfect-guard-window": [newTinyFontIndex, 7], // royal guard
})
sc.fontsystem.font.setMapping({
    "stat-critical-dmg": [newFontIndex, 0],
    "stat-dash-invinc": [newFontIndex, 1],
    "stat-assault": [newFontIndex, 2],
    "stat-guard-sp": [newFontIndex, 3],
    "stat-momentum": [newFontIndex, 4],
    "stat-cond-effect-all": [newFontIndex, 5],
    "stat-knockback": [newFontIndex, 6],
    "stat-perfect-guard-window": [newFontIndex, 7],
})

sc.STAT_PARAM_TYPE.CRITICAL_DMG = {
    key: "CRITICAL_DMG"
};
sc.STAT_PARAM_TYPE.DASH_INVINC = {
    key: "DASH_INVINC"
};
sc.STAT_PARAM_TYPE.ASSAULT = {
    key: "ASSAULT"
};
sc.STAT_PARAM_TYPE.GUARD_SP = {
    key: "GUARD_SP"
};
sc.STAT_PARAM_TYPE.MOMENTUM = {
    key: "MOMENTUM"
};
sc.STAT_PARAM_TYPE.COND_EFFECT_ALL = {
    key: "COND_EFFECT_ALL"
};
sc.STAT_PARAM_TYPE.KNOCKBACK = {
    key: "KNOCKBACK"
};
sc.STAT_PARAM_TYPE.PERFECT_GUARD_WINDOW = {
    key: "PERFECT_GUARD_WINDOW"
};