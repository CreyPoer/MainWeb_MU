export interface MatchStatistics {
    possession?: { home: number; away: number };
    shots_total?: { home: number; away: number }; // Added
    shots_on_target?: { home: number; away: number };
    shots_off_target?: { home: number; away: number };
    corners?: { home: number; away: number };
    fouls?: { home: number; away: number };
    yellow_cards_count?: { home: number; away: number };
    red_cards_count?: { home: number; away: number };
    offsides?: { home: number; away: number };
    free_kicks?: { home: number; away: number }; // Added
    throw_ins?: { home: number; away: number }; // Added
}

export interface MatchEvent {
    minute: string;
    team: 'home' | 'away';
    player: string;
    type: 'goal' | 'yellow' | 'red' | 'subst';
    assist?: string;
    sub?: string; // Player IN for substitution
    score?: string;
}

export interface MatchData {
    id: number;
    homeTeam: string;
    homeLogo: string;
    homeScore?: number | string; // API might return string scores or null
    awayTeam: string;
    awayLogo: string;
    awayScore?: number | string;
    stadium: string;
    date: string;
    time: string;
    events: MatchEvent[];
    statistics?: MatchStatistics;
}

// API Response Interface mapping to Backend MatchSchedule model
export interface APIMatch {
    id: number;
    home_team: string; // Attribute
    home_team_logo: string; // Attribute
    away_team: string; // Attribute
    away_team_logo: string; // Attribute
    score: number;
    oppponent_score: number;
    stadium: string;
    date: string; // Y-m-d
    kickoff_time: string; // H:i
    match_status: number; // 0=Next, 1=Finished, 2=Live
    statistics?: MatchStatistics & {
        events?: {
            goals?: any[];
            yellow_cards?: any[];
            red_cards?: any[];
            substitutions?: any[];
        };
    };
}

export const transformMatchData = (apiMatch: APIMatch, teamRole?: number): MatchData => {
    let homeTeam = apiMatch.home_team;
    let awayTeam = apiMatch.away_team;

    // Custom logic for Academy Team Name
    if (teamRole === 2) {
        if (homeTeam.toUpperCase() === "MADURA UNITED FC") {
            homeTeam = "MADURA UNITED FC U20";
        }
        if (awayTeam.toUpperCase() === "MADURA UNITED FC") {
            awayTeam = "MADURA UNITED FC U20";
        }
    }

    // Transform Events
    let events: MatchEvent[] = [];
    if (apiMatch.statistics && apiMatch.statistics.events) {
        const rawEvents = apiMatch.statistics.events;

        // Helper to parse minute string "45+2'" -> 47 for sorting
        const parseMinute = (m: string) => {
            if (!m) return 0;
            return parseInt(m.replace("'", "").replace("+", "")) || 0;
        };

        // 1. Goals
        if (rawEvents.goals && Array.isArray(rawEvents.goals)) {
            rawEvents.goals.forEach((g: any) => {
                events.push({
                    minute: g.minute,
                    team: g.team === 'home' ? 'home' : 'away',
                    player: g.player,
                    type: 'goal',
                    score: g.score
                });
            });
        }

        // 2. Yellow Cards
        if (rawEvents.yellow_cards && Array.isArray(rawEvents.yellow_cards)) {
            rawEvents.yellow_cards.forEach((c: any) => {
                events.push({
                    minute: c.minute,
                    team: c.team === 'home' ? 'home' : 'away',
                    player: c.player,
                    type: 'yellow'
                });
            });
        }

        // 3. Red Cards
        if (rawEvents.red_cards && Array.isArray(rawEvents.red_cards)) {
            rawEvents.red_cards.forEach((c: any) => {
                events.push({
                    minute: c.minute,
                    team: c.team === 'home' ? 'home' : 'away',
                    player: c.player,
                    type: 'red'
                });
            });
        }

        // 4. Substitutions
        if (rawEvents.substitutions && Array.isArray(rawEvents.substitutions)) {
            rawEvents.substitutions.forEach((s: any) => {
                events.push({
                    minute: s.minute,
                    team: s.team === 'home' ? 'home' : 'away',
                    player: s.out, // Player OUT
                    sub: s.in,     // Player IN
                    type: 'subst'
                });
            });
        }

        // Sort by minute
        events.sort((a, b) => parseMinute(a.minute) - parseMinute(b.minute));
    }

    // Remove events from statistics object to keep it clean
    const { events: _, ...statsOnly } = apiMatch.statistics || {};

    return {
        id: apiMatch.id,
        homeTeam: homeTeam,
        homeLogo: apiMatch.home_team_logo,
        homeScore: apiMatch.score,
        awayTeam: awayTeam,
        awayLogo: apiMatch.away_team_logo,
        awayScore: apiMatch.oppponent_score,
        stadium: apiMatch.stadium || "Stadion Gelora Ratu Pamelingan", // Fallback if null
        date: formatDate(apiMatch.date),
        time: apiMatch.kickoff_time,
        events: events,
        statistics: apiMatch.statistics ? statsOnly : undefined
    };
};

// Helper to format date if needed (e.g. 2024-02-23 -> 23.02.2024 or similar to match design)
const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Format: DD.MM.YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
