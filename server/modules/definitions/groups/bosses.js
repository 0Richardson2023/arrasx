const { combineStats, skillSet } = require('../facilitators.js');
const { base, gunCalcNames } = require('../constants.js');
const g = require('../gunvals.js');

exports.miniboss = {
    PARENT: ["genericTank"],
    TYPE: "miniboss",
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5,
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,
    }),
    LEVEL: 45,
    CONTROLLERS: ["nearestDifferentMaster", "minion", "canRepel"],
    AI: {
        NO_LEAD: true,
    },
    FACING_TYPE: "autospin",
    HITS_OWN_TYPE: "hardOnlyBosses",
    BROADCAST_MESSAGE: "A visitor has left!",
};

// GUNS
exports.machineTripleTurret = {
    PARENT: ["genericTank"],
    LABEL: "Machine Gun",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 5,
    GUNS: [
        {
            POSITION: [12, 10, 1.4, 8, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 120, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        },
        {
            POSITION: [12, 10, 1.4, 8, 0, 240, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flank]),
                TYPE: "bullet",
                AUTOFIRE: true,
            },
        },
    ],
};
exports.skimmerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Skimmer",
    BODY: {
        FOV: 2 * base.FOV,
    },
    COLOR: 2,
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    GUNS: [
        {
            POSITION: [10, 14, -0.5, 9, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.arty,
                    g.arty,
                    g.skim,
                ]),
                TYPE: "hypermissile",
            },
        },
        {
            POSITION: [17, 15, 1, 0, 0, 0, 0],
        },
    ],
};
exports.twisterTurret = {
    PARENT: ["genericTank"],
    LABEL: "Twister",
    BODY: {
        FOV: 2,
    },
    COLOR: 13,
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    GUNS: [
        {
            POSITION: [10, 13, -0.5, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 14, -1.4, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.arty,
                    g.arty,
                    g.skim,
                    g.morespeed,
                    g.one_third_reload,
                ]),
                TYPE: "spinmissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
exports.boomerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Boomer",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 14,
    GUNS: [
        {
            POSITION: [7.75, 10, 1, 12, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.fake]),
                TYPE: "boomerang",
            },
        },
        {
            POSITION: [6, 10, -1.5, 7, 0, 0, 0],
        },
        {
            POSITION: [2, 10, 1.3, 18, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                TYPE: "boomerang",
            },
        },
    ],
};
exports.triTrapGuardTurret = {
    PARENT: ["genericTank"],
    COLOR: 5,
    CONTROLLERS: [["spin", { independent: true }]],
    GUNS: [],
};
for(let i = 0; i < 3; i++) {
    exports.triTrapGuardTurret.GUNS.push(
        {
            POSITION: [17, 8, 1, 0, 0, 120*i, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [13, 8, 1, 0, 0, 120*i+60, 0],
        },
        {
            POSITION: [4, 8, 1.7, 13, 0, 120*i+60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    )
};
exports.eliteSpinnerCyclone = {
    PARENT: ["genericTank"],
    COLOR: 5,
    CONTROLLERS: [["spin", { independent: true }]],
    GUNS: [],
};
for (let i = 0; i < 12; i++) {
    let delay;
    switch (i % 4) {
        case 0:
            delay = 0;
            break;
        case 1:
            delay = 0.5;
            break;
        case 2:
            delay = 0.25;
            break;
        case 3:
            delay = 0.75;
            break;
    }
    exports.eliteSpinnerCyclone.GUNS.push(
        {
            POSITION: [15, 3.5, 1, 0, 0, 30 * i, delay],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.twin,
                    g.puregunner,
                    g.hurricane,
                ]),
                TYPE: "bullet",
            },
        },
    )
};

// ELITE CRASHERS
exports.elite = {
    PARENT: ["miniboss"],
    LABEL: "Elite Crasher",
    COLOR: 5,
    SHAPE: 3,
    SIZE: 27,
    VARIES_IN_SIZE: true,
    VALUE: 15e4,
    BODY: {
        FOV: 1.25,
        SPEED: 0.1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.5 * base.DAMAGE,
    },
};
exports.eliteDestroyer = {
    PARENT: ["elite"],
    GUNS: [
        {
            POSITION: [5, 16, 1, 6, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
        {
            POSITION: [5, 16, 1, 6, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
        {
            POSITION: [5, 16, 1, 6, 0, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [11, 0, 0, 180, 360, 0],
            TYPE: ["crasherSpawner"],
        },
        {
            POSITION: [11, 0, 0, 60, 360, 0],
            TYPE: ["crasherSpawner"],
        },
        {
            POSITION: [11, 0, 0, -60, 360, 0],
            TYPE: ["crasherSpawner"],
        },
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: [
                "bigauto4gun",
                {
                    INDEPENDENT: true,
                    COLOR: 5,
                },
            ],
        },
    ],
};
exports.eliteGunner = {
    PARENT: ["elite"],
    FACING_TYPE: "toTarget",
    GUNS: [
        {
            POSITION: [14, 16, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [4, 16, 1.5, 14, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                TYPE: [
                    "pillbox",
                    {
                        INDEPENDENT: true,
                    },
                ],
            },
        },
        {
            POSITION: [6, 14, -2, 2, 0, 60, 0],
        },
        {
            POSITION: [6, 14, -2, 2, 0, 300, 0],
        },
    ],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [
        {
            POSITION: [14, 8, 0, 60, 180, 0],
            TYPE: ["auto4gun"],
        },
        {
            POSITION: [14, 8, 0, 300, 180, 0],
            TYPE: ["auto4gun"],
        },
    ],
};
exports.eliteSprayer = {
    PARENT: ["elite"],
    SKILL: [0, 9, 3, 9, 2, 9, 9, 9, 9, 0],
    AI: { NO_LEAD: false },
    HAS_NO_RECOIL: true,
    TURRETS: [
        {
            /*    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6, 0, 0, 0, 360, 1],
            TYPE: ["machineTripleTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [9, 6, -5, 180, 130, 0],
            TYPE: ["sprayer", { COLOR: 16 }],
        },
        {
            POSITION: [9, 6, 5, 180, 130, 0],
            TYPE: ["sprayer", { COLOR: 16 }],
        },
        {
            POSITION: [9, 6, 5, 60, 130, 0],
            TYPE: ["sprayer", { COLOR: 16 }],
        },
        {
            POSITION: [9, 6, -5, 60, 130, 0],
            TYPE: ["sprayer", { COLOR: 16 }],
        },
        {
            POSITION: [9, 6, 5, -60, 130, 0],
            TYPE: ["sprayer", { COLOR: 16 }],
        },
        {
            POSITION: [9, 6, -5, -60, 130, 0],
            TYPE: ["sprayer", { COLOR: 16 }],
        },
    ],
};
exports.eliteBattleship = {
    PARENT: ["elite"],
    GUNS: [
        {
            POSITION: [4, 6, 0.6, 7, -8, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, 0, 60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, 8, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, -8, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, 0, 180, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, 8, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, -8, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, 0, -60, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [4, 6, 0.6, 7, 8, -60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                TYPE: "autoswarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [5, 7, 0, 0, 360, 1],
            TYPE: [
                "autoTankGun",
                {
                    INDEPENDENT: true,
                    COLOR: 5,
                },
            ],
        },
        {
            POSITION: [5, 7, 0, 120, 360, 1],
            TYPE: [
                "autoTankGun",
                {
                    INDEPENDENT: true,
                    COLOR: 5,
                },
            ],
        },
        {
            POSITION: [5, 7, 0, 240, 360, 1],
            TYPE: [
                "autoTankGun",
                {
                    INDEPENDENT: true,
                    COLOR: 5,
                },
            ],
        },
    ],
};
exports.eliteSpawner = {
    PARENT: ["elite"],
    MAX_CHILDREN: 9,
    AI: { STRAFE: false },
    GUNS: [
        {
            POSITION: [11, 16, 1, 0, 0, 60, 0],
        },
        {
            POSITION: [11, 16, 1, 0, 0, 180, 0],
        },
        {
            POSITION: [11, 16, 1, 0, 0, 300, 0],
        },
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [2, 18, 1, 11, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak, g.celeslower]),
                TYPE: "sentrySwarm",
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [2, 18, 1, 11, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak, g.celeslower]),
                TYPE: "sentryTrap",
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [2, 18, 1, 11, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak, g.celeslower]),
                TYPE: "sentryGun",
                SYNCS_SKILLS: true,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.drone,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [11, 0, 0, 0, 360, 1],
            TYPE: ["auto4gun", { INDEPENDENT: false, COLOR: 5 }],
        },
    ],
};
exports.eliteTrapGuard = {
    PARENT: ["elite"],
    AI: { STRAFE: false },
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9.5, 0, 0, 0, 360, 1],
            TYPE: "triTrapGuardTurret",
        },
    ],
};
for (let i = 0; i < 3; i++) {
    exports.eliteTrapGuard.GUNS.push(
        {
            POSITION: [10.5, 6, 1, 0, 0, 120*i+60, 0],
        },
        {
            POSITION: [3, 6, 1.7, 10.5, 0, 120*i+60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    )
    exports.eliteTrapGuard.TURRETS.push(
        {
            POSITION: [5, 8, -7, 120*i+60, 160, 0],
            TYPE: ["autoTurret", { INDEPENDENT: false }],
        },
        {
            POSITION: [5, 8, 7, 120*i+60, 160, 0],
            TYPE: ["autoTurret", { INDEPENDENT: false }],
        },
    )
};
exports.eliteSpinner = {
    PARENT: ["elite"],
    AI: { STRAFE: false },
    FACING_TYPE: "spin",
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9.5, 0, 0, 0, 360, 1],
            TYPE: ["eliteSpinnerCyclone", {COLOR: 5}],
        },
    ],
};
for (let i = 0; i < 3; i++) {
    exports.eliteSpinner.GUNS.push(
        {
            POSITION: [9.5, 2, 1, -1.5, 11.5, 120*i+10, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [9.5, 2, 1, 3.5, 6.5, 120*i+10, 1/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [9.5, 2, 1, 8.5, 1.5, 120*i+10, 2/3],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
                TYPE: "bullet",
            },
        },
        {
            POSITION: [2, 20, 0.75, 8, 0, 120*i+60, 0],
        },
    )
};

// OLD ELITE
exports.oldEliteSprayer = {
    PARENT: ["elite"],
    AI: {
        NO_LEAD: false,
    },
    TURRETS: [
        {
            POSITION: [14, 6, 0, 180, 190, 0],
            TYPE: [
                "sprayer",
                {
                    COLOR: 5,
                },
            ],
        },
        {
            POSITION: [14, 6, 0, 60, 190, 0],
            TYPE: [
                "sprayer",
                {
                    COLOR: 5,
                },
            ],
        },
        {
            POSITION: [14, 6, 0, -60, 190, 0],
            TYPE: [
                "sprayer",
                {
                    COLOR: 5,
                },
            ],
        },
    ],
};

// STRANGE BOSSES
exports.waferbread = {
    PARENT: ["sunchip"],
    SHAPE: 0
};
exports.sorcerer = {
    PARENT: ["miniboss"],
    LABEL: "Sorcerer",
    DANGER: 7,
    SHAPE: 0,
    COLOR: 6,
    SIZE: 26,
    MAX_CHILDREN: 50,
    FACING_TYPE: "autospin",
    VALUE: 2e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.12 * base.SPEED,
        HEALTH: 6 * base.HEALTH,
        DAMAGE: 2 * base.DAMAGE,
    },
    GUNS: Array(2).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.mach, g.machgun, { size: 0.4, spray: 150, speed: 2, shudder: 1.75 }]),
            TYPE: "waferbread",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
exports.summoner = {
    PARENT: ["miniboss"],
    LABEL: "Summoner",
    DANGER: 8,
    SHAPE: 4,
    COLOR: 13,
    SIZE: 26,
    MAX_CHILDREN: 28,
    FACING_TYPE: "autospin",
    VALUE: 3e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.1 * base.SPEED,
        HEALTH: 7 * base.HEALTH,
        DAMAGE: 2.6 * base.DAMAGE,
    },
    GUNS: Array(4).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 90, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, { size: 0.8 }]),
            TYPE: ["sunchip"],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
exports.dorito = {
    PARENT: ["sunchip"],
    SHAPE: 3
};
exports.enchantress = {
    PARENT: ["miniboss"],
    LABEL: "Enchantress",
    DANGER: 8,
    SHAPE: 3.5,
    COLOR: 2,
    SIZE: 26,
    MAX_CHILDREN: 28,
    FACING_TYPE: "autospin",
    VALUE: 4e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.09 * base.SPEED,
        HEALTH: 10 * base.HEALTH,
        DAMAGE: 3 * base.DAMAGE,
    },
    GUNS: Array(3).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 120, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, { size: 0.9 }]),
            TYPE: "dorito",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
exports.demonchip = {
    PARENT: ["sunchip"],
    SHAPE: 5
};
exports.exorcistor = {
    PARENT: ["miniboss"],
    LABEL: "Exorcistor",
    DANGER: 8,
    SHAPE: 5.5,
    COLOR: 14,
    SIZE: 26,
    MAX_CHILDREN: 20,
    FACING_TYPE: "autospin",
    VALUE: 5e5,
    BODY: {
        FOV: 0.5,
        SPEED: 0.08 * base.SPEED,
        HEALTH: 15 * base.HEALTH,
        DAMAGE: 4 * base.DAMAGE,
    },
    GUNS: Array(5).fill().map((_, i) => ({
        POSITION: [3.5, 8.65, 1.2, 8, 0, i * 72, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.summoner, g.destroy]),
            TYPE: "demonchip",
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.necro,
            WAIT_TO_CYCLE: true,
        },
    }))
};
exports.eliteSkimmer = {
    PARENT: ["elite"],
    LABEL: "Elite Skimmer",
    COLOR: 2,
    TURRETS: [
        {
            POSITION: [15, 5, 0, 60, 170, 0],
            TYPE: "skimmerTurret",
        },
        {
            POSITION: [15, 5, 0, 180, 170, 0],
            TYPE: "skimmerTurret",
        },
        {
            POSITION: [15, 5, 0, 300, 170, 0],
            TYPE: "skimmerTurret",
        },
    ],
};
exports.nestKeeper = {
    PARENT: ["miniboss"],
    LABEL: "Nest Keeper",
    COLOR: 14,
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
    MAX_CHILDREN: 15,
    GUNS: [
        {
            POSITION: [3.5, 6.65, 1.2, 8, 0, 35, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 8, 0, -35, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 8, 0, 108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
            },
        },
        {
            POSITION: [3.5, 6.65, 1.2, 8, 0, -108, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.nest_keeper]),
                TYPE: "drone",
                AUTOFIRE: true,
                LABEL: "Mega Crasher",
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [8, 9, 0, 72, 120, 0],
            TYPE: [
                "auto4gun",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
        {
            POSITION: [8, 9, 0, 0, 120, 0],
            TYPE: [
                "auto4gun",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
        {
            POSITION: [8, 9, 0, 144, 120, 0],
            TYPE: [
                "auto4gun",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
        {
            POSITION: [8, 9, 0, 216, 120, 0],
            TYPE: [
                "auto4gun",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
        {
            POSITION: [8, 9, 0, -72, 120, 0],
            TYPE: [
                "auto4gun",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [
                "boomerTurret",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
    ],
};
exports.nestWarden = {
    PARENT: ["miniboss"],
    LABEL: "Nest Warden",
    COLOR: 14,
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [
                "barricadeTurret",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
    ],
};
for(let i = 0; i < 5; i++) {
    exports.nestWarden.GUNS.push(
        {
            POSITION: [10.7, 8, 1, 0, 0, 72*i+36, 0],
        },
        {
            POSITION: [1.5, 8, 1.2, 10.7, 0, 72*i+36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.block, g.construct]),
                TYPE: "unsetTrap",
            },
        },
    );
    exports.nestWarden.TURRETS.push(
        {
            POSITION: [8, 9, 0, 72*i, 120, 0],
            TYPE: [
                "cruiserTurret",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        }
    );
};
exports.nestGuardian = {
    PARENT: ["miniboss"],
    LABEL: "Nest Guardian",
    COLOR: 14,
    SHAPE: 5,
    SIZE: 50,
    BODY: {
        FOV: 1.3,
        SPEED: base.SPEED * 0.25,
        HEALTH: base.HEALTH * 9,
        SHIELD: base.SHIELD * 1.5,
        REGEN: base.REGEN,
        DAMAGE: base.DAMAGE * 2.5,
    },
    GUNS: [],
    TURRETS: [
        {
            POSITION: [9, 0, 0, 0, 360, 1],
            TYPE: [
                "twisterTurret",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        },
    ],
};
for(let i = 0; i < 5; i++) {
    exports.nestGuardian.GUNS.push(
        {
            POSITION: [5.5, 7, 1, 6, 0, 72*i+36, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                TYPE: "bullet",
                LABEL: "Devastator",
            },
        },
    );
    exports.nestGuardian.TURRETS.push(
        {
            POSITION: [8, 9, 0, 72*i, 120, 0],
            TYPE: [
                "swarmerTurret",
                {
                    INDEPENDENT: true,
                    COLOR: 14,
                },
            ],
        }
    );
};
exports.roguePalisade = {
    PARENT: ["miniboss"],
    LABEL: "Rogue Palisade",
    COLOR: 17,
    SHAPE: 6,
    SIZE: 30,
    VALUE: 5e5,
    CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'],
    BODY: {
        FOV: 1.4,
        SPEED: 0.05 * base.SPEED,
        HEALTH: 16 * base.HEALTH,
        SHIELD: 3 * base.SHIELD,
        DAMAGE: 3 * base.DAMAGE,
    },
    GUNS: [
        { POSITION: [4, 6, -1.6, 8, 0, 0, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pound, g.halfreload, g.halfreload ]), TYPE: "minion", STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 1, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 60, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pound, g.halfreload, g.halfreload ]), TYPE: "minion", STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 1, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 120, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pound, g.halfreload, g.halfreload ]), TYPE: "minion", STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 1, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 180, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pound, g.halfreload, g.halfreload ]), TYPE: "minion", STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 1, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 240, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pound, g.halfreload, g.halfreload ]), TYPE: "minion", STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 1, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
        { POSITION: [4, 6, -1.6, 8, 0, 300, 0], PROPERTIES: { SHOOT_SETTINGS: combineStats([ g.factory, g.pound, g.halfreload, g.halfreload ]), TYPE: "minion", STAT_CALCULATOR: gunCalcNames.drone, AUTOFIRE: true, MAX_CHILDREN: 1, SYNCS_SKILLS: true, WAIT_TO_CYCLE: true }},
    ],
    TURRETS: [
        { POSITION: [5, 10, 0, 30, 110, 0], TYPE: "trapTurret" },
        { POSITION: [5, 10, 0, 90, 110, 0], TYPE: "trapTurret" },
        { POSITION: [5, 10, 0, 150, 110, 0], TYPE: "trapTurret" },
        { POSITION: [5, 10, 0, 210, 110, 0], TYPE: "trapTurret" },
        { POSITION: [5, 10, 0, 270, 110, 0], TYPE: "trapTurret" },
        { POSITION: [5, 10, 0, 330, 110, 0], TYPE: "trapTurret" },
    ],
};
exports.rogueArmada = (() => {
    let SHAPE = 7,
        GUNS = [],
        TURRETS = [];
    for (let i = 0; i < SHAPE; i++) {
        for (let j = 0; j < 12; j++) {
            GUNS.push({
                POSITION: [ 4, 0.3 * Math.floor(j / 4), 1, 0, (j + 3) % SHAPE - 3, (i + 0.5) * (360 / SHAPE), 0 ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                    TYPE: j % SHAPE < 2 ? "bullet" : "casing"
                }
            });
        }
        GUNS.push({
            POSITION: [ 9, 6  ,  1  , 4,  0, (i + 0.5) * (360 / SHAPE), 0 ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                TYPE: "casing"
            }
        }, {
            POSITION: [ 8, 6  , -1.1, 4,  0, (i + 0.5) * (360 / SHAPE), 0 ]
        });
    }
    for (let i = 0; i < SHAPE; i++) {
        TURRETS.push({
            POSITION: [ 5, 10, 0, i * 360 / SHAPE, 110, 0],
            TYPE: "shottrapTurret"
        });
    }
    return {
        PARENT: ["miniboss"],
        LABEL: 'Rogue Armada',
        COLOR: 17,
        SHAPE,
        SIZE: 28,
        VALUE: 500000,
        CONTROLLERS: ['nearestDifferentMaster', 'onlyAcceptInArc'],
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 2,
            SHIELD: base.SHIELD * 2,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 3,
        },
        FACING_TYPE: 'autospin',
        GUNS, TURRETS
    };
})();

// WINTER MAYHEM STRANGE BOSSES
exports.pumpkinEmperor = {
    PARENT: ["nestKeeper"],
    LABEL: "Pumpkin Emperor",
    NAME: "Jack Skeleton",
    COLOR: 40,
    BODY: {
        SPEED: base.SPEED * 0.5,
    },
};

// DIEP BOSSES
exports.guardianOfThePentagons = {
    PARENT: ["elite"],
    LABEL: "Guardian",
    FACING_TYPE: "toTarget",
    GUNS: [
        {
            POSITION: [4, 12, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.celeslower]),
                TYPE: "swarm",
                AUTOFIRE: true,
            },
        },
    ],
    AI: {
        NO_LEAD: false,
    },
};
exports.defender = {
    PARENT: ["elite"],
    LABEL: "Defender",
    COLOR: 2,
    GUNS: [
        {
            POSITION: [15, 7, 1, -3, 0, 60, 0],
        },
        {
            POSITION: [3, 7, 1.7, 12, 0, 60, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, -3, 0, 180, 0],
        },
        {
            POSITION: [3, 7, 1.7, 12, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
        {
            POSITION: [15, 7, 1, -3, 0, 300, 0],
        },
        {
            POSITION: [3, 7, 1.7, 12, 0, 300, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.flank]),
                TYPE: "trap",
                STAT_CALCULATOR: gunCalcNames.trap,
            },
        },
    ],
    TURRETS: [
        {
            POSITION: [5, 7, 0, 0, 190, 1],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [5, 7, 0, 120, 190, 1],
            TYPE: "autoTankGun",
        },
        {
            POSITION: [5, 7, 0, 240, 190, 1],
            TYPE: "autoTankGun",
        },
    ],
    AI: {
        NO_LEAD: false,
    },
};

// CELESTIALS
exports.celestial = {
    PARENT: ["miniboss"],
    LABEL: "Celestial",
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    VALUE: 1e6,
    SHAPE: 9,
    LEVEL: 200,
    SIZE: 45,
    BODY: {
        FOV: 1,
        HEALTH: 1000,
        SHIELD: 2,
        REGEN: base.REGEN * 0.1,
        SPEED: 0.75,
        DAMAGE: 5,
    },
};
exports.rogueCelestial = {
    PARENT: ["celestial"],
    LABEL: "Rogue Celestial",
    COLOR: 17,
};

// PALADIN
exports.swarmerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Swarmer",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [14, 14, -1.2, 5, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                TYPE: "hive",
            },
        },
        {
            POSITION: [15, 12, 1, 5, 0, 0, 0],
        },
    ],
};
exports.paladinDrone = {
    PARENT: ["drone"],
    SHAPE: 5,
};
exports.paladinLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
    COLOR: 14,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    MAX_CHILDREN: 16,
    FACING_TYPE: "autospin",
    GUNS: [
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 26, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "paladinDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 77, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "paladinDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 129, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "paladinDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "paladinDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 231, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "paladinDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 282, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "paladinDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 333, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "paladinDrone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
    ],
};
exports.paladinUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
    AUTOSPIN: true,
    COLOR: 14,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [10, 7.5, 0, 35, 160, 0],
            TYPE: ["swarmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 110, 160, 0],
            TYPE: ["swarmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 180, 160, 0],
            TYPE: ["swarmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 252, 160, 0],
            TYPE: ["swarmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 325, 160, 0],
            TYPE: ["swarmerTurret"],
        },
    ],
};
exports.paladin = {
    PARENT: ["celestial"],
    NAME: "Paladin",
    COLOR: 14,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6.5, 9, 0, 260, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 219, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 180, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 300, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 339, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 380, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 420, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 459, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 500, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [14.94, 0, 0, 0, 360, 1],
            TYPE: ["paladinLowerBody"],
        },
        {
            POSITION: [8.6, 0, 0, 0, 360, 1],
            TYPE: ["paladinUpperBody"],
        },
    ],
};

// FREYJA
exports.cruiserTurret = {
    PARENT: ["genericTank"],
    LABEL: "Cruiser",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [7, 7.5, 0.6, 7, 4, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
        {
            POSITION: [7, 7.5, 0.6, 7, -4, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: "swarm",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
exports.freyjaLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
    COLOR: 1,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 7,
    INDEPENDENT: true,
    FACING_TYPE: "autospin",
    TURRETS: [
        {
            //*********    SIZE         X             Y         ANGLE        ARC
            POSITION: [8.5, 9, 0, 26, 180, 0],
            TYPE: ["cruiserTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 77, 180, 0],
            TYPE: ["cruiserTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 129, 180, 0],
            TYPE: ["cruiserTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 180, 180, 0],
            TYPE: ["cruiserTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 231, 180, 0],
            TYPE: ["cruiserTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 282, 180, 0],
            TYPE: ["cruiserTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 333, 180, 0],
            TYPE: ["cruiserTurret"],
        },
    ],
};
exports.freyjaUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
    COLOR: 1,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [
        {
            //**     SIZE         X             Y         ANGLE        ARC
            POSITION: [10.6, 7.5, 0, 35, 160, 0],
            TYPE: ["auto4gun"],
        },
        {
            POSITION: [10.6, 7.5, 0, 110, 160, 0],
            TYPE: ["auto4gun"],
        },
        {
            POSITION: [10.6, 7.5, 0, 180, 160, 0],
            TYPE: ["auto4gun"],
        },
        {
            POSITION: [10.6, 7.5, 0, 252, 160, 0],
            TYPE: ["auto4gun"],
        },
        {
            POSITION: [10.6, 7.5, 0, 325, 160, 0],
            TYPE: ["auto4gun"],
        },
    ],
};
exports.freyja = {
    PARENT: ["celestial"],
    NAME: "Freyja",
    COLOR: 1,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6.5, 9, 0, 260, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 219, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 180, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 300, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 339, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 380, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 420, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 459, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 500, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [14.77, 0, 0, 0, 360, 1],
            TYPE: ["freyjaLowerBody"],
        },
        {
            POSITION: [8.7, 0, 0, 0, 360, 1],
            TYPE: ["freyjaUpperBody"],
        },
    ],
};

// ZAPHKIEL
exports.zaphkielSkimmerTurret = {
    PARENT: ["skimmerTurret"],
    COLOR: 16,
};
exports.zaphkielLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
    COLOR: 2,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    MAX_CHILDREN: 16,
    FACING_TYPE: "autospin",
    GUNS: [
        {
            //*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY
            POSITION: [3.6, 6, 1.4, 8, 0, 26, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 77, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 129, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 231, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 282, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 333, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                TYPE: "drone",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
    ],
};
exports.zaphkielUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
    AUTOSPIN: true,
    COLOR: 2,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [10, 7.5, 0, 35, 160, 0],
            TYPE: ["zaphkielSkimmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 110, 160, 0],
            TYPE: ["zaphkielSkimmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 180, 160, 0],
            TYPE: ["zaphkielSkimmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 252, 160, 0],
            TYPE: ["zaphkielSkimmerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 325, 160, 0],
            TYPE: ["zaphkielSkimmerTurret"],
        },
    ],
};
exports.zaphkiel = {
    PARENT: ["celestial"],
    NAME: "Zaphkiel",
    COLOR: 2,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6.5, 9, 0, 260, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 219, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 180, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 300, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 339, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 380, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 420, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 459, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 500, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [14.94, 0, 0, 0, 360, 1],
            TYPE: "zaphkielLowerBody",
        },
        {
            POSITION: [8.6, 0, 0, 0, 360, 1],
            TYPE: "zaphkielUpperBody",
        },
    ],
};

// NYX
exports.rocketeerTurret = {
    PARENT: ["genericTank"],
    LABEL: "Rocketeer",
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            POSITION: [10, 12.5, -0.7, 10, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    g.basic,
                    g.pound,
                    g.launcher,
                    g.rocketeer,
                ]),
                TYPE: "rocketeerMissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
        {
            POSITION: [17, 18, 0.65, 0, 0, 0, 0],
        },
    ],
};
exports.nyxLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
    COLOR: 5,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    FACING_TYPE: "autospin",
    MAX_CHILDREN: 16,
    GUNS: [
        {
            POSITION: [3.6, 7, -1.4, 8, 0, 26, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.celeslower]),
                TYPE: "minion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 7, -1.4, 8, 0, 77, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.celeslower]),
                TYPE: "minion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 7, -1.4, 8, 0, 129, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.celeslower]),
                TYPE: "minion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 7, -1.4, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.celeslower]),
                TYPE: "minion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 7, -1.4, 8, 0, 231, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.celeslower]),
                TYPE: "minion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 7, -1.4, 8, 0, 282, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.celeslower]),
                TYPE: "minion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 7, -1.4, 8, 0, 333, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.factory, g.celeslower]),
                TYPE: "minion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
    ],
};
exports.nyxUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
    AUTOSPIN: true,
    COLOR: 5,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [10, 7.5, 0, 35, 160, 0],
            TYPE: ["rocketeerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 110, 160, 0],
            TYPE: ["rocketeerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 180, 160, 0],
            TYPE: ["rocketeerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 252, 160, 0],
            TYPE: ["rocketeerTurret"],
        },
        {
            POSITION: [10, 7.5, 0, 325, 160, 0],
            TYPE: ["rocketeerTurret"],
        },
    ],
};
exports.nyx = {
    PARENT: ["celestial"],
    NAME: "Nyx",
    COLOR: 5,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6.5, 9, 0, 260, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 219, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 180, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 300, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 339, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 380, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 420, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 459, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [6.5, 9, 0, 500, 180, 0],
            TYPE: [
                "trapTurret",
                {
                    INDEPENDENT: true,
                },
            ],
        },
        {
            POSITION: [14.94, 0, 0, 0, 360, 1],
            TYPE: ["nyxLowerBody"],
        },
        {
            POSITION: [8.6, 0, 0, 0, 360, 1],
            TYPE: ["nyxUpperBody"],
        },
    ],
};

// THEIA
exports.theiaTwisterTurret = {
    PARENT: ["twisterTurret"],
    COLOR: 16,
};
exports.theiaLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
    COLOR: 35,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    FACING_TYPE: "autospin",
    MAX_CHILDREN: 35,
    GUNS: [
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 26, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celeslower]),
                TYPE: "summonerDrone",
                AUTOFIRE: true,
                WAIT_TO_CYCLE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 77, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celeslower]),
                TYPE: "summonerDrone",
                AUTOFIRE: true,
                WAIT_TO_CYCLE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 129, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celeslower]),
                TYPE: "summonerDrone",
                AUTOFIRE: true,
                WAIT_TO_CYCLE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 180, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celeslower]),
                TYPE: "summonerDrone",
                AUTOFIRE: true,
                WAIT_TO_CYCLE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 231, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celeslower]),
                TYPE: "summonerDrone",
                AUTOFIRE: true,
                WAIT_TO_CYCLE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 282, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celeslower]),
                TYPE: "summonerDrone",
                AUTOFIRE: true,
                WAIT_TO_CYCLE: true,
                SYNCS_SKILLS: true,
            },
        },
        {
            POSITION: [3.6, 6, 1.4, 8, 0, 333, 1],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.celeslower]),
                TYPE: "summonerDrone",
                AUTOFIRE: true,
                WAIT_TO_CYCLE: true,
                SYNCS_SKILLS: true,
            },
        },
    ],
};
exports.theiaUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
    AUTOSPIN: true,
    COLOR: 35,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [10, 7.5, 0, 35, 160, 0],
            TYPE: "theiaTwisterTurret",
        },
        {
            POSITION: [10, 7.5, 0, 110, 160, 0],
            TYPE: "theiaTwisterTurret",
        },
        {
            POSITION: [10, 7.5, 0, 180, 160, 0],
            TYPE: "theiaTwisterTurret",
        },
        {
            POSITION: [10, 7.5, 0, 252, 160, 0],
            TYPE: "theiaTwisterTurret",
        },
        {
            POSITION: [10, 7.5, 0, 325, 160, 0],
            TYPE: "theiaTwisterTurret",
        },
    ],
};
exports.theia = {
    PARENT: ["celestial"],
    NAME: "Theia",
    COLOR: 3,
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6.5, 9, 0, 260, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 219, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 180, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 300, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 339, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 380, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 420, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 459, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 500, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [14.94, 0, 0, 0, 360, 1],
            TYPE: ["theiaLowerBody"],
        },
        {
            POSITION: [8.6, 0, 0, 0, 360, 1],
            TYPE: ["theiaUpperBody"],
        },
    ],
};

// ALVISS
exports.alvissDrone = {
    PARENT: ["eggchip"],
    NECRO: false,
};
exports.launcherTurret = {
    PARENT: ["genericTank"],
    LABEL: "Launcher",
    BODY: {
        FOV: 2 * base.FOV,
    },
    COLOR: 16,
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [10, 9, 1, 9, 0, 0, 0],
        },
        {
            POSITION: [17, 13, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty]),
                TYPE: "minimissile",
                STAT_CALCULATOR: gunCalcNames.sustained,
            },
        },
    ],
};
exports.alvissLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    MAX_CHILDREN: 3,
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [8.5, 11, 0.6, 6, 0, 0, 0.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.sunchip]),
                TYPE: "alvissDrone",
                STAT_CALCULATOR: gunCalcNames.swarm,
            },
        },
    ],
};
exports.alvissLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    FACING_TYPE: "autospin",
    MAX_CHILDREN: 24,
    TURRETS: [
        {
            //*********    SIZE         X             Y         ANGLE        ARC
            POSITION: [8.5, 9, 0, 26, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 77, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 129, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 180, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 231, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 282, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
        {
            POSITION: [8.5, 9, 0, 333, 180, 0],
            TYPE: ["alvissLowerTurret"],
        },
    ],
};
exports.alvissUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [
        {
            //**     SIZE         X             Y         ANGLE        ARC
            POSITION: [10.6, 7.5, 0, 35, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 110, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 180, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 252, 160, 0],
            TYPE: ["launcherTurret"],
        },
        {
            POSITION: [10.6, 7.5, 0, 325, 160, 0],
            TYPE: ["launcherTurret"],
        },
    ],
};
exports.alviss = {
    PARENT: ["rogueCelestial"],
    NAME: "Alviss",
    TURRETS: [
        {
            /*********    SIZE         X             Y         ANGLE        ARC */
            POSITION: [6.5, 9, 0, 260, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 219, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 180, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 300, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 339, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 380, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 420, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 459, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [6.5, 9, 0, 500, 180, 0],
            TYPE: ["trapTurret", { INDEPENDENT: true }],
        },
        {
            POSITION: [14.94, 0, 0, 0, 360, 1],
            TYPE: ["alvissLowerBody"],
        },
        {
            POSITION: [8.6, 0, 0, 0, 360, 1],
            TYPE: ["alvissUpperBody"],
        },
    ],
};

// TYR
exports.tyrLowerTurret = {
    PARENT: ["genericTank"],
    LABEL: "",
    MAX_CHILDREN: 4,
    BODY: {
        FOV: 2,
    },
    CONTROLLERS: [
        "canRepel",
        "onlyAcceptInArc",
        "mapAltToFire",
        "nearestDifferentMaster",
    ],
    COLOR: 16,
    GUNS: [
        {
            /*** LENGTH    WIDTH     ASPECT        X             Y         ANGLE     DELAY */
            POSITION: [8.5, 11, 0.6, 6, 0, 0, 0.5],
        },
        {
            POSITION: [3.4, 14, 1, 14.3, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm, g.babyfactory, g.lessreload]),
                TYPE: "tinyMinion",
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
            },
        },
    ],
};
exports.tyrLowerBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: -0.005 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    SHAPE: 7,
    FOV: 1,
    FACING_TYPE: "autospin",
    MAX_CHILDREN: 23,
    TURRETS: [{ //*********    SIZE         X             Y         ANGLE        ARC
        POSITION: [8.5, 9, 0, 26, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 77, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 129, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 180, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 231, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 282, 180, 0],
        TYPE: ["tyrLowerTurret"],
    },{
        POSITION: [8.5, 9, 0, 333, 180, 0],
        TYPE: ["tyrLowerTurret"],
    }]
};
exports.tyrUpperBody = {
    LABEL: "",
    CONTROLLERS: [["spin", { independent: true, speed: 0.005 }]],
    COLOR: 17,
    SIZE: 100,
    SKILL: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    MAX_CHILDREN: 28,
    SHAPE: 5,
    INDEPENDENT: true,
    TURRETS: [{ //**     SIZE         X             Y         ANGLE        ARC
        POSITION: [10.6, 7.5, 0, 35, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 110, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 180, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 252, 160, 0],
        TYPE: ["auto4gun"],
    },{
        POSITION: [10.6, 7.5, 0, 325, 160, 0],
        TYPE: ["auto4gun"],
    }]
};
exports.tyr = {
    PARENT: ["rogueCelestial"],
    NAME: "Tyr",
    TURRETS: [{ /*********    SIZE         X             Y         ANGLE        ARC */
        POSITION: [6.5, 9, 0, 260, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 219, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 180, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 300, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 339, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 380, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 420, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 459, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [6.5, 9, 0, 500, 180, 0],
        TYPE: ["trapTurret", { INDEPENDENT: true }],
    },{
        POSITION: [14.94, 0, 0, 0, 360, 1],
        TYPE: ["tyrLowerBody"],
    },{
        POSITION: [8.6, 0, 0, 0, 360, 1],
        TYPE: ["tyrUpperBody"],
    }]
};
