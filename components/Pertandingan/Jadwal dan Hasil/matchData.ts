export interface MatchData {
    id: number;
    homeTeam: string;
    homeLogo: string;
    homeScore?: number;
    awayTeam: string;
    awayLogo: string;
    awayScore?: number;
    stadium: string;
    date: string;
    time: string;
}

// --- DUMMY DATA: SENIOR TEAM ---
export const RESULTS_DATA_SENIOR: MatchData[] = [
    {
        id: 1,
        homeTeam: "Madura United",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        homeScore: 3,
        awayTeam: "Man City",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
        awayScore: 1,
        stadium: "Gelora Ratu Pamelingan",
        date: "23.02.2024",
        time: "06.00 PM"
    },
    {
        id: 2,
        homeTeam: "Wolves",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
        homeScore: 2,
        awayTeam: "Madura United",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        awayScore: 2,
        stadium: "Molineux Stadium",
        date: "15.02.2024",
        time: "08.30 PM"
    },
    {
        id: 3,
        homeTeam: "West Ham",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
        homeScore: 1,
        awayTeam: "Madura United",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        awayScore: 0,
        stadium: "London Stadium",
        date: "09.02.2024",
        time: "08.00 PM"
    }
];

export const UPCOMING_DATA_SENIOR: MatchData[] = [
    {
        id: 1,
        homeTeam: "Man City",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
        awayTeam: "Madura United",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        stadium: "Etihad Stadium",
        date: "March 6, 2024",
        time: "06.00 PM"
    },
    {
        id: 2,
        homeTeam: "Wolves",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
        awayTeam: "Madura United",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        stadium: "Molineux Stadium",
        date: "March 29, 2024",
        time: "05.30 PM"
    },
    {
        id: 3,
        homeTeam: "Madura United",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        awayTeam: "Wolves",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
        stadium: "Gelora Ratu Pamelingan",
        date: "March 11, 2024",
        time: "08.30 PM"
    },
    {
        id: 4,
        homeTeam: "Madura United",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        awayTeam: "Man City",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
        stadium: "Gelora Ratu Pamelingan",
        date: "April 6, 2024",
        time: "04.00 PM"
    },
    {
        id: 5,
        homeTeam: "Liverpool",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
        awayTeam: "Madura United",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        stadium: "Anfield",
        date: "March 15, 2024",
        time: "06.30 PM"
    }
];

// --- DUMMY DATA: ACADEMY U20 ---
export const RESULTS_DATA_ACADEMY: MatchData[] = [
    {
        id: 1,
        homeTeam: "Madura U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        homeScore: 4,
        awayTeam: "Persija U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        awayScore: 2,
        stadium: "Training Ground",
        date: "20.02.2024",
        time: "03.00 PM"
    },
    {
        id: 2,
        homeTeam: "Persebaya U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        homeScore: 1,
        awayTeam: "Madura U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        awayScore: 1,
        stadium: "Gelora 10 Nov",
        date: "12.02.2024",
        time: "03.30 PM"
    },
    {
        id: 3,
        homeTeam: "Madura U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        homeScore: 2,
        awayTeam: "Arema U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        awayScore: 0,
        stadium: "Training Ground",
        date: "05.02.2024",
        time: "03.00 PM"
    }
];

export const UPCOMING_DATA_ACADEMY: MatchData[] = [
    {
        id: 1,
        homeTeam: "Bali Utd U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        awayTeam: "Madura U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        stadium: "Dipta Stadium",
        date: "March 5, 2024",
        time: "03.00 PM"
    },
    {
        id: 2,
        homeTeam: "Madura U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        awayTeam: "Persib U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        stadium: "Training Ground",
        date: "March 12, 2024",
        time: "03.30 PM"
    },
    {
        id: 3,
        homeTeam: "PSIS U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        awayTeam: "Madura U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        stadium: "Jatidiri",
        date: "March 19, 2024",
        time: "03.00 PM"
    },
    {
        id: 4,
        homeTeam: "Madura U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        awayTeam: "Borneo U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        stadium: "Training Ground",
        date: "March 26, 2024",
        time: "03.00 PM"
    },
    {
        id: 5,
        homeTeam: "PSS U20",
        homeLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png", // Placeholder
        awayTeam: "Madura U20",
        awayLogo: "https://upload.wikimedia.org/wikipedia/id/8/8a/Madura_United_FC.png",
        stadium: "Maguwoharjo",
        date: "April 2, 2024",
        time: "03.30 PM"
    }
];
