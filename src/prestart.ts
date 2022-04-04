ig.ACTION_STEP.SHOW_FOOD_ICON.inject({
    init(a) {
        this.customItem = sc.foodAPI.isCustomFood(a.icon) ? ((a.icon in sc.foodAPI.foodList) ? a.icon : "FALLBACK") : null
        this.icon = sc.FOOD_SPRITE[a.icon] ?? 0;
        this.offset = a.offset || null;
    },
    start(target) {
        let foodSprite = ig.game.spawnEntity<sc.FoodIconEntity, sc.FoodIconEntity.Settings>(sc.FoodIconEntity, 0, 0, 0, {
            icon: this.icon,
            customItem: this.customItem,
            combatant: target as ig.ENTITY.Combatant
        });
        this.offset && foodSprite.setState(sc.FOOD_ICON_STATE.HOLD, this.offset)
    }
})


sc.FoodIconEntity.inject({
    customItem: null,
    
    init: function(a, b, d, g) {
        this.parent(a, b, d, g);
        this.customItem = g.customItem;
    },

    updateSprites() {
        this.parent()
        var b = this.sprites[(this.state != sc.FOOD_ICON_STATE.HOLD) ? 1 : 0]  
        
        if(this.customItem)
        {
            b.setImageSrc(sc.foodAPI.getImage(this.customItem)!.image, ...sc.foodAPI.getSpriteOffset(this.customItem)!)
        }
    }
})

// retrieves the icons
const buffIcons = new ig.Font("media/font/icons-buff-foodapi.png", 8, ig.MultiFont.ICON_START);
const buffIconsLarge = new ig.Font("media/font/icons-buff-large-foodapi.png", 16, ig.MultiFont.ICON_START);

// retrieves index of last icon set registered, then pushes new icons
const newTinyFontIndex = sc.fontsystem.tinyFont.iconSets.length;
const newFontIndex = sc.fontsystem.font.iconSets.length;
sc.fontsystem.tinyFont.pushIconSet(buffIcons);
sc.fontsystem.font.pushIconSet(buffIconsLarge);

let bufficons = [
    "stat-critical-dmg", // bullseye
    "stat-dash-invinc", // flash step
    "stat-assault", // assault
    "stat-guard-sp", // avenger
    "stat-momentum", // momentum
    "stat-cond-effect-all", // status rush
    "stat-knockback", // bulk calibre
    "stat-perfect-guard-window", // royal guard
    "stat-berserk", // berserker
    "stat-xp-plus", // trainer
    "stat-drop-chance", // lucky lucky
    "stat-perfect-guard-reset", //riposte
]

let tinyicons: ig.MultiFont.Mapping = {}
let normalicons: ig.MultiFont.Mapping = {}
let b = 0;

// preparing mappings for both sizes at the same time
bufficons.forEach(element => {
    tinyicons[element] = [newTinyFontIndex, b];
    normalicons[element] = [newFontIndex, b];
    b++;
});

sc.fontsystem.tinyFont.setMapping(tinyicons)
sc.fontsystem.font.setMapping(normalicons)

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
sc.STAT_PARAM_TYPE.BERSERK = {
    key: "BERSERK"
}
sc.STAT_PARAM_TYPE.XP_PLUS = {
    key: "XP_PLUS"
}
sc.STAT_PARAM_TYPE.DROP_CHANCE = {
    key: "DROP_CHANCE"
}
sc.STAT_PARAM_TYPE.PERFECT_GUARD_RESET = {
    key: "PERFECT_GUARD_RESET"
}
