const mongoose = require('mongoose');
const Spell = require('./spell');

const weaponSubSchema = new mongoose.Schema({
    name: String,
    attackBonus: Number,
    damage: String
}, { _id: false });

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Hero name is required.',
        trim: true,
    },
    player_name: {
        type: String,
        trim: true
    },
    image: String,
    info: {
        age: { type: Number, required: false, default: 0 },
        height: String,
        weight: { type: Number, required: false, default: 0 },
        eye_color: String,
        skin_color: String,
        hair_color: String,
        place_of_origin: String,
        race: String,
        class: String,
        background: String,
        alignment: String,
        level: { type: Number, required: false, default: 0 },
        xp: { type: Number, required: false, default: 0 }
    },
    attributes: {
        inspiration: {
            type: Boolean,
            required: false,
            default: false
        },
        proficiency_bonus: {
            type: Number,
            required: false,
            default: 0
        },
        passive_perception: {
            type: Number,
            required: false,
            default: 0
        },
        strength: {
            type: Number,
            required: false,
            default: 0
        },
        strengthMod: {
            type: Number,
            required: false,
            default: 0
        },
        dexterity: {
            type: Number,
            required: false,
            default: 0
        },
        dexterityMod: {
            type: Number,
            required: false,
            default: 0
        },
        constitution: {
            type: Number,
            required: false,
            default: 0
        },
        constitutionMod: {
            type: Number,
            required: false,
            default: 0
        },
        intelligence: {
            type: Number,
            required: false,
            default: 0
        },
        intelligenceMod: {
            type: Number,
            required: false,
            default: 0
        },
        wisdom: {
            type: Number,
            required: false,
            default: 0
        },
        wisdomMod: {
            type: Number,
            required: false,
            default: 0
        },
        charisma: {
            type: Number,
            required: false,
            default: 0
        },
        charismaMod: {
            type: Number,
            required: false,
            default: 0
        }
    },
    physical_attributes: {
        ac: {
            type: Number,
            required: false,
            default: 0
        },
        initiative: {
            type: Number,
            required: false,
            default: 0
        },
        speed: {
            type: Number,
            required: false,
            default: 0
        },
        max_hp: {
            type: Number,
            required: false,
            default: 0
        },
        current_hp: {
            type: Number,
            required: false,
            default: 0
        },
        temp_hp: {
            type: Number,
            required: false,
            default: 0
        },
        total_hitdie: String,
        current_hitdie: {
            type: Number,
            required: false,
            default: 0
        },
        deathsaves_success: {
            type: Number,
            required: false,
            default: 0,
            max: 3
        },
        deathsaves_fail: {
            type: Number,
            required: false,
            default: 0,
            max: 3
        }
    },
    saving_throws: {
        strength: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        dexterity: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        constitution: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        intelligence: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        wisdom: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        charisma: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    },
    skills: {
        acrobatics: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        animal_handling: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        arcana: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        athletics: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        deception: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        history: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        insight: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        intimidation: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        investigation: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        medicine: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        nature: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        perception: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        performance: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        persuasion: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        religion: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        sleight_of_hand: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        stealth: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        survival: {
            value: {
                type: Number,
                required: false,
                default: 0
            },
            proficient: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    },
    personality: {
        personality_traits: {
            type: String,
            trim: true
        },
        ideals: {
            type: String,
            trim: true
        },
        bonds: {
            type: String,
            trim: true
        },
        flaws: {
            type: String,
            trim: true
        }
    },
    attacksAndSpellCasting: {
        weapons: [weaponSubSchema],
        notes: {
            type: String,
            trim: true
        }
    },
    equipment: {
        money: {
            copper: Number,
            silver: Number,
            electrum: Number,
            gold: Number,
            platinum: Number
        },
        equipment: {
            type: String,
            trim: true
        }
    },
    additional_info: {
        features_and_traits: {
            type: String,
            trim: true
        },
        additional_features_traits: {
            type: String,
            trim: true
        },
        proficiencies_and_languages: {
            type: String,
            trim: true
        }
    },
    story: {
        allies_and_organizations: {
            text: {
                type: String,
                trim: false
            },
            organization_name: String,
            emblem_image: String
        },
        backstory: {
            type: String,
            trim: true
        }
    },
    treasure: {
        text: {
            type: String,
            trim: true
        }  
    },
    spells: {
        racial: [mongoose.Schema.Types.ObjectId],
        class: [mongoose.Schema.Types.ObjectId]
    }
});

module.exports = mongoose.model('Hero', heroSchema);