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
export const calculateDentPrice = (
    count1,
    diameter1,
    count2,
    diameter2,
    isAlu,
    isPreLeveling
) => {
    const price1 = DENT_PRICELIST[diameter1] || 0;
    const price2 = DENT_PRICELIST[diameter2] || 0;
    const c1 = parseInt(count1) || 0;
    const c2 = parseInt(count2) || 0;

    if ((price1 === 0 || c1 === 0) && (price2 === 0 || c2 === 0)) return 0;

    // Vytvoříme pole všech cen poškození na tomto dílu
    let allDentsOnPart = [];
    for (let i = 0; i < c1; i++) allDentsOnPart.push(price1);
    for (let i = 0; i < c2; i++) allDentsOnPart.push(price2);

    // Seřadíme od nejdražšího
    allDentsOnPart.sort((a, b) => b - a);

    // První za 100%, ostatní za 50%
    let total = allDentsOnPart[0] || 0;
    for (let i = 1; i < allDentsOnPart.length; i++) {
        total += allDentsOnPart[i] * 0.5;
    }

    if (isAlu) total *= 1.2;
    if (isPreLeveling) total *= 0.5;

    return Math.round(total);
};
