export interface StandingTeam {
    id: number | string;
    position: number;
    name: string;
    logo: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
    form: ("W" | "D" | "L")[];
    nextMatch: {
        opponentName: string;
        opponentLogo: string;
    };
}

export const STANDINGS_DATA: StandingTeam[] = [
    {
        id: "persib", position: 1, name: "Persib Bandung", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0d/Logo_Persib_Bandung.png/330px-Logo_Persib_Bandung.png",
        played: 19, won: 14, drawn: 2, lost: 3, goalsFor: 29, goalsAgainst: 11, goalDifference: 18, points: 44,
        form: ["W", "W", "W", "D", "W"],
        nextMatch: { opponentName: "Malut United", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/6/62/Malut_fc.png/250px-Malut_fc.png" }
    },
    {
        id: "borneo", position: 2, name: "Borneo FC Samarinda", logo: "https://upload.wikimedia.org/wikipedia/id/4/4d/Logo_Borneo_FC.svg",
        played: 19, won: 14, drawn: 1, lost: 4, goalsFor: 34, goalsAgainst: 17, goalDifference: 17, points: 43,
        form: ["W", "W", "L", "W", "L"],
        nextMatch: { opponentName: "Madura United", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png" }
    },
    {
        id: "persija", position: 3, name: "Persija Jakarta", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/94/Persija_Jakarta_logo.png/250px-Persija_Jakarta_logo.png",
        played: 19, won: 13, drawn: 2, lost: 4, goalsFor: 36, goalsAgainst: 14, goalDifference: 22, points: 41,
        form: ["W", "W", "L", "W", "W"],
        nextMatch: { opponentName: "Arema FC", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/4/40/Logo_Arema_FC_2017_logo.svg/1280px-Logo_Arema_FC_2017_logo.svg.png" }
    },
    {
        id: "malut", position: 4, name: "Malut United FC", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/6/62/Malut_fc.png/250px-Malut_fc.png",
        played: 19, won: 11, drawn: 4, lost: 4, goalsFor: 38, goalsAgainst: 21, goalDifference: 17, points: 37,
        form: ["L", "W", "L", "W", "W"],
        nextMatch: { opponentName: "Persib Bandung", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0d/Logo_Persib_Bandung.png/330px-Logo_Persib_Bandung.png" }
    },
    {
        id: "persebaya", position: 5, name: "Persebaya Surabaya", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/a/a1/Persebaya_logo.svg/1280px-Persebaya_logo.svg.png",
        played: 19, won: 8, drawn: 8, lost: 3, goalsFor: 28, goalsAgainst: 17, goalDifference: 11, points: 32,
        form: ["D", "W", "W", "W", "W"],
        nextMatch: { opponentName: "Bali United", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/5/5e/Bali_United_logo.svg/250px-Bali_United_logo.svg.png" }
    },
    {
        id: "persita", position: 6, name: "Persita", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Persita_logo_%282020%29.svg/1280px-Persita_logo_%282020%29.svg.png",
        played: 19, won: 9, drawn: 5, lost: 5, goalsFor: 25, goalsAgainst: 17, goalDifference: 8, points: 32,
        form: ["L", "D", "W", "W", "W"],
        nextMatch: { opponentName: "PSM Makassar", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/b/b8/Logo_PSM_Makasar_Baru.png" }
    },
    {
        id: "psim", position: 7, name: "PSIM Yogyakarta", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/9c/Logo_PSIM_Yogyakarta.png/250px-Logo_PSIM_Yogyakarta.png",
        played: 19, won: 8, drawn: 6, lost: 5, goalsFor: 24, goalsAgainst: 23, goalDifference: 1, points: 30,
        form: ["L", "L", "W", "W", "D"],
        nextMatch: { opponentName: "Persis Solo", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/d/d6/Persis_Solo_logo.svg/250px-Persis_Solo_logo.svg.png" }
    },
    {
        id: "bali", position: 8, name: "Bali United FC", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/5/5e/Bali_United_logo.svg/250px-Bali_United_logo.svg.png",
        played: 19, won: 7, drawn: 7, lost: 5, goalsFor: 27, goalsAgainst: 24, goalDifference: 3, points: 28,
        form: ["L", "D", "W", "W", "D"],
        nextMatch: { opponentName: "Persebaya Surabaya", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/a/a1/Persebaya_logo.svg/1280px-Persebaya_logo.svg.png" }
    },
    {
        id: "bhayangkara", position: 9, name: "Bhayangkara Presisi", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Bhayangkara_FC_logo.svg/250px-Bhayangkara_FC_logo.svg.png",
        played: 19, won: 7, drawn: 5, lost: 7, goalsFor: 17, goalsAgainst: 20, goalDifference: -3, points: 26,
        form: ["W", "D", "L", "W", "L"],
        nextMatch: { opponentName: "Persita", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Persita_logo_%282020%29.svg/1280px-Persita_logo_%282020%29.svg.png" }
    },
    {
        id: "dewa", position: 10, name: "Dewa United", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dewa_United_F.C._logo.svg/250px-Dewa_United_F.C._logo.svg.png",
        played: 19, won: 7, drawn: 3, lost: 9, goalsFor: 23, goalsAgainst: 25, goalDifference: -2, points: 24,
        form: ["D", "W", "W", "L", "D"],
        nextMatch: { opponentName: "Persik Kediri", opponentLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Persik_Kediri_logo.svg/1280px-Persik_Kediri_logo.svg.png" }
    },
    {
        id: "arema", position: 11, name: "Arema FC", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/4/40/Logo_Arema_FC_2017_logo.svg/1280px-Logo_Arema_FC_2017_logo.svg.png",
        played: 19, won: 6, drawn: 6, lost: 7, goalsFor: 24, goalsAgainst: 25, goalDifference: -1, points: 24,
        form: ["W", "L", "W", "L", "L"],
        nextMatch: { opponentName: "Persija Jakarta", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/94/Persija_Jakarta_logo.png/250px-Persija_Jakarta_logo.png" }
    },
    {
        id: "persik", position: 12, name: "Persik Kediri", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Persik_Kediri_logo.svg/1280px-Persik_Kediri_logo.svg.png",
        played: 19, won: 6, drawn: 4, lost: 9, goalsFor: 22, goalsAgainst: 32, goalDifference: 10, points: 22,
        form: ["W", "L", "L", "D", "W"],
        nextMatch: { opponentName: "Dewa United", opponentLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dewa_United_F.C._logo.svg/250px-Dewa_United_F.C._logo.svg.png" }
    },
    {
        id: "psm", position: 13, name: "PSM Makassar", logo: "https://upload.wikimedia.org/wikipedia/id/b/b8/Logo_PSM_Makasar_Baru.png",
        played: 19, won: 4, drawn: 8, lost: 7, goalsFor: 21, goalsAgainst: 21, goalDifference: 0, points: 20,
        form: ["D", "L", "L", "L", "L"],
        nextMatch: { opponentName: "Persita", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Persita_logo_%282020%29.svg/1280px-Persita_logo_%282020%29.svg.png" }
    },
    {
        id: "madura", position: 14, name: "Madura United FC", logo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        played: 19, won: 4, drawn: 6, lost: 9, goalsFor: 18, goalsAgainst: 26, goalDifference: -8, points: 18,
        form: ["D", "L", "L", "L", "W"],
        nextMatch: { opponentName: "Borneo FC", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/4/4d/Logo_Borneo_FC.svg" }
    },
    {
        id: "psbs", position: 15, name: "PSBS Biak", logo: "https://upload.wikimedia.org/wikipedia/id/9/9b/Logo_PSBS_Biak_baru.png",
        played: 19, won: 4, drawn: 5, lost: 10, goalsFor: 21, goalsAgainst: 40, goalDifference: -19, points: 17,
        form: ["D", "L", "W", "L", "D"],
        nextMatch: { opponentName: "Semen Padang", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/1/1e/Semen_Padang_FC.png" }
    },
    {
        id: "semen", position: 16, name: "Semen Padang FC", logo: "https://upload.wikimedia.org/wikipedia/id/1/1e/Semen_Padang_FC.png",
        played: 19, won: 3, drawn: 3, lost: 13, goalsFor: 16, goalsAgainst: 32, goalDifference: -16, points: 12,
        form: ["D", "D", "L", "L", "L"],
        nextMatch: { opponentName: "PSBS Biak", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/9/9b/Logo_PSBS_Biak_baru.png" }
    },
    {
        id: "persijap", position: 17, name: "Persijap Jepara", logo: "https://upload.wikimedia.org/wikipedia/id/b/bc/Persijap.png",
        played: 19, won: 3, drawn: 3, lost: 13, goalsFor: 16, goalsAgainst: 34, goalDifference: -18, points: 12,
        form: ["L", "W", "L", "L", "L"],
        nextMatch: { opponentName: "Persis Solo", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/d/d6/Persis_Solo_logo.svg/250px-Persis_Solo_logo.svg.png" }
    },
    {
        id: "persis", position: 18, name: "Persis Solo", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/d/d6/Persis_Solo_logo.svg/250px-Persis_Solo_logo.svg.png",
        played: 19, won: 2, drawn: 4, lost: 13, goalsFor: 20, goalsAgainst: 40, goalDifference: -20, points: 10,
        form: ["L", "L", "W", "L", "L"],
        nextMatch: { opponentName: "Persijap Jepara", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/b/bc/Persijap.png" }
    },
];

export const STANDINGS_U20_A: StandingTeam[] = [
    {
        id: "persija-u20", position: 1, name: "Persija Jakarta U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/94/Persija_Jakarta_logo.png/250px-Persija_Jakarta_logo.png",
        played: 20, won: 16, drawn: 1, lost: 3, goalsFor: 64, goalsAgainst: 12, goalDifference: 52, points: 49,
        form: ["W", "W", "W", "L", "W"],
        nextMatch: { opponentName: "PSIM U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/9c/Logo_PSIM_Yogyakarta.png/250px-Logo_PSIM_Yogyakarta.png" }
    },
    {
        id: "persita-u20", position: 2, name: "Persita U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Persita_logo_%282020%29.svg/1280px-Persita_logo_%282020%29.svg.png",
        played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 48, goalsAgainst: 15, goalDifference: 33, points: 48,
        form: ["W", "D", "W", "W", "L"],
        nextMatch: { opponentName: "Persik U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Persik_Kediri_logo.svg/1280px-Persik_Kediri_logo.svg.png" }
    },
    {
        id: "bhayangkara-u20", position: 3, name: "Bhayangkara Presisi U20", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6a/Bhayangkara_FC_logo.svg/250px-Bhayangkara_FC_logo.svg.png",
        played: 20, won: 13, drawn: 2, lost: 5, goalsFor: 53, goalsAgainst: 21, goalDifference: 32, points: 41,
        form: ["L", "D", "L", "W", "W"],
        nextMatch: { opponentName: "PSBS U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/9/9b/Logo_PSBS_Biak_baru.png" }
    },
    {
        id: "dewa-u20", position: 4, name: "Dewa United U20", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dewa_United_F.C._logo.svg/250px-Dewa_United_F.C._logo.svg.png",
        played: 20, won: 11, drawn: 3, lost: 6, goalsFor: 42, goalsAgainst: 24, goalDifference: 18, points: 36,
        form: ["W", "W", "W", "W", "L"],
        nextMatch: { opponentName: "Semen Padang U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/1/1e/Semen_Padang_FC.png" }
    },
    {
        id: "semen-u20", position: 5, name: "Semen Padang FC U20", logo: "https://upload.wikimedia.org/wikipedia/id/1/1e/Semen_Padang_FC.png",
        played: 18, won: 9, drawn: 2, lost: 7, goalsFor: 27, goalsAgainst: 34, goalDifference: -7, points: 29,
        form: ["W", "W", "L", "L", "L"],
        nextMatch: { opponentName: "Dewa United U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dewa_United_F.C._logo.svg/250px-Dewa_United_F.C._logo.svg.png" }
    },
    {
        id: "psbs-u20", position: 6, name: "PSBS Biak U20", logo: "https://upload.wikimedia.org/wikipedia/id/9/9b/Logo_PSBS_Biak_baru.png",
        played: 20, won: 5, drawn: 5, lost: 10, goalsFor: 27, goalsAgainst: 46, goalDifference: -19, points: 20,
        form: ["L", "L", "D", "W", "W"],
        nextMatch: { opponentName: "Persija U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/94/Persija_Jakarta_logo.png/250px-Persija_Jakarta_logo.png" }
    },
    {
        id: "arema-u20", position: 7, name: "Arema FC U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/4/40/Logo_Arema_FC_2017_logo.svg/1280px-Logo_Arema_FC_2017_logo.svg.png",
        played: 20, won: 4, drawn: 3, lost: 13, goalsFor: 17, goalsAgainst: 34, goalDifference: -17, points: 15,
        form: ["L", "L", "D", "L", "W"],
        nextMatch: { opponentName: "Persijap U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/b/bc/Persijap.png" }
    },
    {
        id: "persijap-u20", position: 8, name: "Persijap Jepara U20", logo: "https://upload.wikimedia.org/wikipedia/id/b/bc/Persijap.png",
        played: 18, won: 4, drawn: 2, lost: 12, goalsFor: 16, goalsAgainst: 31, goalDifference: -15, points: 14,
        form: ["L", "L", "W", "L", "W"],
        nextMatch: { opponentName: "Arema U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/4/40/Logo_Arema_FC_2017_logo.svg/1280px-Logo_Arema_FC_2017_logo.svg.png" }
    },
    {
        id: "persik-u20", position: 9, name: "Persik Kediri U20", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Persik_Kediri_logo.svg/1280px-Persik_Kediri_logo.svg.png",
        played: 20, won: 0, drawn: 1, lost: 19, goalsFor: 6, goalsAgainst: 83, goalDifference: -77, points: 1,
        form: ["L", "L", "L", "L", "L"],
        nextMatch: { opponentName: "Persita U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/95/Persita_logo_%282020%29.svg/1280px-Persita_logo_%282020%29.svg.png" }
    },
];

export const STANDINGS_U20_B: StandingTeam[] = [
    {
        id: "malut-u20", position: 1, name: "Malut United FC U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/6/62/Malut_fc.png/250px-Malut_fc.png",
        played: 20, won: 14, drawn: 3, lost: 3, goalsFor: 37, goalsAgainst: 13, goalDifference: 24, points: 45,
        form: ["L", "D", "W", "W", "W"],
        nextMatch: { opponentName: "PSM U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/b/b8/Logo_PSM_Makasar_Baru.png" }
    },
    {
        id: "borneo-u20", position: 2, name: "Borneo FC Samarinda U20", logo: "https://upload.wikimedia.org/wikipedia/id/4/4d/Logo_Borneo_FC.svg",
        played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 38, goalsAgainst: 23, goalDifference: 15, points: 43,
        form: ["W", "L", "W", "D", "W"],
        nextMatch: { opponentName: "Persib U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0d/Logo_Persib_Bandung.png/330px-Logo_Persib_Bandung.png" }
    },
    {
        id: "persis-u20", position: 3, name: "Persis Solo U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/d/d6/Persis_Solo_logo.svg/250px-Persis_Solo_logo.svg.png",
        played: 20, won: 11, drawn: 3, lost: 6, goalsFor: 38, goalsAgainst: 23, goalDifference: 15, points: 36,
        form: ["W", "D", "L", "W", "L"],
        nextMatch: { opponentName: "Bali Utd U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/5/5e/Bali_United_logo.svg/250px-Bali_United_logo.svg.png" }
    },
    {
        id: "bali-u20", position: 4, name: "Bali United FC U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/5/5e/Bali_United_logo.svg/250px-Bali_United_logo.svg.png",
        played: 20, won: 11, drawn: 2, lost: 7, goalsFor: 31, goalsAgainst: 28, goalDifference: 3, points: 35,
        form: ["L", "W", "D", "L", "L"],
        nextMatch: { opponentName: "Persis U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/d/d6/Persis_Solo_logo.svg/250px-Persis_Solo_logo.svg.png" }
    },
    {
        id: "persib-u20", position: 5, name: "Persib Bandung U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/0/0d/Logo_Persib_Bandung.png/330px-Logo_Persib_Bandung.png",
        played: 20, won: 9, drawn: 5, lost: 6, goalsFor: 37, goalsAgainst: 30, goalDifference: 7, points: 32,
        form: ["D", "D", "D", "W", "D"],
        nextMatch: { opponentName: "Borneo U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/4/4d/Logo_Borneo_FC.svg" }
    },
    {
        id: "psm-u20", position: 6, name: "PSM Makassar U20", logo: "https://upload.wikimedia.org/wikipedia/id/b/b8/Logo_PSM_Makasar_Baru.png",
        played: 20, won: 5, drawn: 5, lost: 10, goalsFor: 26, goalsAgainst: 34, goalDifference: -8, points: 20,
        form: ["W", "D", "W", "L", "D"],
        nextMatch: { opponentName: "Malut U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/6/62/Malut_fc.png/250px-Malut_fc.png" }
    },
    {
        id: "madura-u20", position: 7, name: "Madura United FC U20", logo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        played: 20, won: 3, drawn: 6, lost: 11, goalsFor: 17, goalsAgainst: 33, goalDifference: -16, points: 15,
        form: ["D", "D", "L", "L", "D"],
        nextMatch: { opponentName: "Persebaya U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/a/a1/Persebaya_logo.svg/1280px-Persebaya_logo.svg.png" }
    },
    {
        id: "persebaya-u20", position: 8, name: "Persebaya Surabaya U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/a/a1/Persebaya_logo.svg/1280px-Persebaya_logo.svg.png",
        played: 18, won: 3, drawn: 3, lost: 12, goalsFor: 16, goalsAgainst: 34, goalDifference: -18, points: 12,
        form: ["L", "D", "D", "W", "L"],
        nextMatch: { opponentName: "Madura U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png" }
    },
    {
        id: "psim-u20", position: 9, name: "PSIM Yogyakarta U20", logo: "https://upload.wikimedia.org/wikipedia/id/thumb/9/9c/Logo_PSIM_Yogyakarta.png/250px-Logo_PSIM_Yogyakarta.png",
        played: 18, won: 1, drawn: 5, lost: 12, goalsFor: 10, goalsAgainst: 32, goalDifference: -22, points: 8,
        form: ["L", "D", "D", "D", "L"],
        nextMatch: { opponentName: "Persis U20", opponentLogo: "https://upload.wikimedia.org/wikipedia/id/thumb/d/d6/Persis_Solo_logo.svg/250px-Persis_Solo_logo.svg.png" }
    },
];
