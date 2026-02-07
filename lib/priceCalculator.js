const DENT_PRICELIST = {
    20: 2450,
    30: 2624,
    40: 2878,
    60: 3036,
    80: 3301,
    100: 3640,
    130: 4219,
    160: 4723,
    190: 5164,
    220: 5671,
    250: 6239,
    280: 6750,
    310: 7340,
    340: 7940,
    370: 8510,
    400: 9060,
    430: 9630,
    460: 10220,
    490: 10770,
    520: 11350,
    550: 11920,
    580: 12510,
    610: 13060,
    640: 13650,
    670: 14210,
    700: 14770,
};

/**
 * @param {Array} dents - Pole objektů [{ diameter: 20, count: 1 }, { diameter: 60, count: 2 }]
 * @param {boolean} isAlu - Přirážka +20%
 * @param {boolean} isPreLeveling - Sleva -50% (pod lak)
 */
export const calculateDentPrice = (count, diameter, isAlu, isPreLeveling) => {
    // Základní kontrola validity
    const basePrice = DENT_PRICELIST[diameter] || 0;
    const numCount = parseInt(count) || 0;

    if (basePrice === 0 || numCount === 0) return 0;

    // Metodika:
    // 1. největší (v tomto případě jediný typ) je za 100%
    // Všechny ostatní stejného typu jsou za 50%
    let totalPrice = basePrice + (numCount - 1) * (basePrice * 0.5);

    // 4. Přirážka za hliník (+20 %)
    if (isAlu) {
        totalPrice = totalPrice * 1.2;
    }

    // 5. Sleva za opravu pod lak (celková částka : 2)
    if (isPreLeveling) {
        totalPrice = totalPrice * 0.5;
    }

    return Math.round(totalPrice);
};
