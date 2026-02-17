"use client";

// Helper to format date to Indonesian format (e.g., 04 Juni 1997)
const formatDateIndo = (dateString: string) => {
	if (!dateString) return "-";
	try {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("id-ID", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		}).format(date);
	} catch (e) {
		return dateString;
	}
};

// Helper to get country code for flags (simple mapping)
const getCountryCode = (country: string) => {
	const c = country.toLowerCase();
	if (c === "indonesia") return "id";
	if (c === "brazil" || c === "brasil") return "br";
	if (c === "japan" || c === "jepang") return "jp";
	if (c === "south korea" || c === "korea selatan") return "kr";
	if (c === "argentina") return "ar";
	if (c === "portugal") return "pt";
	if (c === "spain" || c === "spanyol") return "es";
	if (c === "iran") return "ir";
	// Add more as needed, default to unknown
	return "id"; // Default to ID if unknown, or handle generic
};

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

type TeamKey = "utama" | "akademi";

type Player = {
	id: number;
	name: string;
	number: number | string;
	position: string; // Initials: GK, CB, CF, etc.
	positionFull: string;
	image: string;
	birthDate: string;
	height: string;
	weight: string;
	nationality: string;
	preferredFoot: string;
	stats: Record<string, string | number>;
	bio: string;
	role_team?: number;
};

// Helper to map positions to initials and categories for sorting
const getPositionDetails = (pos: string) => {
	const p = pos.toLowerCase();
	// Goalkeeper
	if (p.includes("penjaga gawang") || p.includes("goalkeeper") || p.includes("kiper")) {
		return { initial: "GK", full: "Goalkeeper", category: 1, style: "players-position-gk" };
	}
	// Defenders (Bek / Back / Defender)
	if (p.includes("bek") || p.includes("defender") || p.includes("back")) {
		if (p.includes("tengah") || p.includes("center")) return { initial: "CB", full: "Centre Back", category: 2, style: "players-position-def" };
		if (p.includes("kanan") || p.includes("right")) return { initial: "RB", full: "Right Back", category: 2, style: "players-position-def" };
		if (p.includes("kiri") || p.includes("left")) return { initial: "LB", full: "Left Back", category: 2, style: "players-position-def" };
		return { initial: "DF", full: "Defender", category: 2, style: "players-position-def" };
	}
	// Midfielders (Gelandang / Midfielder)
	if (p.includes("gelandang") || p.includes("midfielder")) {
		if (p.includes("bertahan") || p.includes("defensive")) return { initial: "DM", full: "Defensive Midfielder", category: 3, style: "players-position-mid" };
		if (p.includes("serang") || p.includes("attacking")) return { initial: "AM", full: "Attacking Midfielder", category: 3, style: "players-position-mid" };
		return { initial: "CM", full: "Central Midfielder", category: 3, style: "players-position-mid" };
	}
	// Forwards (Penyerang / Forward / Striker / Winger / Sayap)
	if (p.includes("penyerang") || p.includes("forward") || p.includes("striker") || p.includes("sayap") || p.includes("winger")) {
		if (p.includes("kanan") || p.includes("right")) return { initial: "RW", full: "Right Winger", category: 4, style: "players-position-wing" };
		if (p.includes("kiri") || p.includes("left")) return { initial: "LW", full: "Left Winger", category: 4, style: "players-position-wing" };
		if (p.includes("tengah") || p.includes("center")) return { initial: "CF", full: "Centre Forward", category: 4, style: "players-position-att" };
		return { initial: "FW", full: "Forward", category: 4, style: "players-position-att" };
	}

	// Direct Initial Matching (Fallback if fuller names aren't found but initials are)
	if (p === "gk") return { initial: "GK", full: "Goalkeeper", category: 1, style: "players-position-gk" };
	if (["cb", "rb", "lb", "df", "rwb", "lwb"].includes(p)) return { initial: pos.toUpperCase(), full: "Defender", category: 2, style: "players-position-def" };
	if (["cm", "dm", "am", "cmf", "dmf", "amf", "mf"].includes(p)) return { initial: pos.toUpperCase(), full: "Midfielder", category: 3, style: "players-position-mid" };
	if (["cf", "st", "rw", "lw", "wf", "ss", "fw"].includes(p)) return { initial: pos.toUpperCase(), full: "Forward", category: 4, style: "players-position-att" };

	// Default fallback
	return { initial: pos.substring(0, 3).toUpperCase(), full: pos, category: 5, style: "players-position-generic" };
};

const getPositionClass = (position: string): string => {
	const details = getPositionDetails(position);
	return details.style; // Use the style from our helper
};


import { FaBars, FaTimes } from "react-icons/fa";

export default function PemainContent() {
	const searchParams = useSearchParams();
	const tabParam = searchParams.get("tab");

	const [activeTeam, setActiveTeam] = useState<TeamKey>(
		tabParam === "akademi" ? "akademi" : "utama"
	);
	const sectionRef = useRef<HTMLElement | null>(null);

	const [allPlayers, setAllPlayers] = useState<Player[]>([]);
	const [loading, setLoading] = useState(true);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	// Fetch data from API
	useEffect(() => {
		const fetchPlayers = async () => {
			try {
				setLoading(true);
				const res = await fetch("https://admin-mu.maduraunitedfc.id/api/v2/players");
				if (!res.ok) throw new Error("Failed to fetch players");
				const data = await res.json();

				const mappedPlayers: Player[] = data.map((item: any) => {
					// Map Position
					const posDetails = getPositionDetails(item.position || "");

					// Map Stats based on Position Category
					let displayStats: Record<string, string | number> = {};
					const rawStats = item.statistics_json || {};

					// Parse stats if it's a string (JSON stringified)
					let statsObj = rawStats;
					if (typeof rawStats === 'string') {
						try {
							statsObj = JSON.parse(rawStats);
						} catch (e) {
							statsObj = {};
						}
					}

					// Ensure statsObj is an object
					if (typeof statsObj !== 'object' || statsObj === null) {
						statsObj = {};
					}

					if (posDetails.category === 1) { // GK
						displayStats = {
							"Main": item.main || statsObj.appearances || statsObj.Main || 0,
							"Nirbobol": statsObj["Lembar Bersih"] || statsObj["Lembar bersih"] || statsObj.clean_sheets || statsObj.Nirbobol || 0,
							"Kebobolan": statsObj["Gol Kebobolan"] || statsObj["Gol yang kebobolan"] || statsObj.goals_conceded || statsObj.Kebobolan || 0,
							"Kartu Kuning": statsObj["Kartu Kuning"] || statsObj.yellow_cards || 0,
							"Kartu Merah": statsObj["Kartu Merah"] || statsObj.red_cards || 0,
							"2x Kartu Kuning": statsObj["Kartu Kuning Kedua"] || statsObj.second_yellow_cards || 0
						};
					} else { // Field Players
						displayStats = {
							"Main": item.main || statsObj.appearances || statsObj.Main || 0,
							"Gol": item.goals || statsObj.goals || statsObj.Goal || 0,
							"Assist": item.assists || statsObj.assists || statsObj.Assist || 0,
							"Kartu Kuning": statsObj["Kartu Kuning"] || statsObj.yellow_cards || 0,
							"Kartu Merah": statsObj["Kartu Merah"] || statsObj.red_cards || 0,
							"2x Kartu Kuning": statsObj["Kartu Kuning Kedua"] || statsObj.second_yellow_cards || 0
						};
					}

					return {
						id: item.id,
						name: item.name,
						number: item.jersey_number || "-",
						// Debug image data
						// image: item.image ? ...

						position: posDetails.initial,
						positionFull: posDetails.full,
						// Construct Image URL
						image: item.image ? `https://admin-mu.maduraunitedfc.id/storage/${item.image}` : "https://via.placeholder.com/600x800?text=No+Image",
						birthDate: item.birth_date, // Format might need adjustment depending on API
						height: item.height ? `${item.height} cm` : "-",
						weight: item.weight ? `${item.weight} kg` : "-",
						nationality: item.nationality || "Indonesia",
						preferredFoot: (item.foot || "Kanan").replace(/right/i, "Kanan").replace(/left/i, "Kiri").replace(/both/i, "Kedua Kaki"),
						stats: displayStats,
						bio: item.biografi || "Belum ada biografi.",
						role_team: item.role_team
					};
				});

				setAllPlayers(mappedPlayers);
			} catch (error) {
				console.error("Error fetching players:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPlayers();
	}, []);

	const players = useMemo(() => {
		const targetRole = activeTeam === "utama" ? 1 : 2; // Assuming 1 = Senior, 2 = Academy



		// Filter by role (using loose equality just in case of string/number mismatch)
		let filtered = allPlayers.filter(p => p.role_team == targetRole);

		// Sort: GK (1) -> Def (2) -> Mid (3) -> Fwd (4)
		return filtered.sort((a, b) => {
			const catA = getPositionDetails(a.positionFull).category;
			const catB = getPositionDetails(b.positionFull).category;

			// If categories are different, sort by category
			if (catA !== catB) {
				return catA - catB;
			}

			// Specific Position Priority (Lower number = Higher Priority)
			// GK -> Defenders (CB, DF, LB, RB) -> Midfielders (DM, CM, AM) -> Forwards (LW, RW, CF, FW)
			const positionPriority: Record<string, number> = {
				"GK": 10,

				"CB": 20, "DF": 21, "LB": 22, "RB": 23,

				"DM": 30, "CM": 31, "AM": 32,

				// User request: Wing before Forward
				"LW": 40, "RW": 41,
				"CF": 42, "FW": 43, "SS": 44, "ST": 45
			};

			const priorityA = positionPriority[a.position] || 99;
			const priorityB = positionPriority[b.position] || 99;

			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}

			// Finally sort by jersey number
			return Number(a.number) - Number(b.number);
		});
	}, [allPlayers, activeTeam]);

	const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

	useEffect(() => {
		if (players.length > 0) {
			setSelectedPlayer(players[0]);
		} else {
			setSelectedPlayer(null);
		}
	}, [players]);

	// Scroll animation: reveal elements as they enter viewport
	useEffect(() => {
		const root = sectionRef.current;
		if (!root) return;

		const animatedElements = Array.from(
			root.querySelectorAll<HTMLElement>(".players-animate")
		);
		if (animatedElements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in-view");
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.2,
			}
		);

		animatedElements.forEach((el) => {
			el.classList.remove("in-view");
			observer.observe(el);
		});

		return () => {
			observer.disconnect();
		};
	}, [activeTeam, players]); // Re-run when players change

	return (
		<section className="players-section" ref={sectionRef}>
			<div className="players-container">
				{/* Header + Tab Switcher */}
				<div className="players-header players-animate players-animate-up">
					<div className="players-header-text">
						<p className="players-eyebrow">Madura United FC</p>
						<h2 className="players-title">Daftar Pemain</h2>
						<p className="players-subtitle">
							Jelajahi skuad lengkap Madura United mulai dari tim utama hingga
							pemain masa depan di Akademi.
						</p>
					</div>

					<div className="players-tab-switcher">
						<button
							type="button"
							onClick={() => setActiveTeam("utama")}
							className={`tab-button ${activeTeam === "utama" ? "active" : "inactive"
								}`}
						>
							Tim Utama
						</button>
						<button
							type="button"
							onClick={() => setActiveTeam("akademi")}
							className={`tab-button ${activeTeam === "akademi" ? "active" : "inactive"
								}`}
						>
							Akademi
						</button>
					</div>
				</div>

				{/* Mobile Sidebar Toggle - Outside Panel */}
				<button
					className="mobile-sidebar-toggle"
					onClick={toggleSidebar}
					aria-label="Toggle Sidebar"
				>
					{isSidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
				</button>

				{/* Sidebar Overlay - Outside Panel */}
				<div
					className={`sidebar-backdrop ${isSidebarOpen ? "active" : ""}`}
					onClick={() => setIsSidebarOpen(false)}
				/>

				{/* Mobile Sidebar - Fixed Outside Panel */}
				<aside className={`players-sidebar mobile-sidebar ${isSidebarOpen ? "active" : ""}`}>
					<h3 className="players-sidebar-title">
						Skuad {activeTeam === "utama" ? "Tim Utama" : "Akademi"}
					</h3>
					<div className="players-sidebar-inner">
						<div className="players-sidebar-overlay" />
						<div className="players-list">
							{loading && <p className="p-4 text-white text-sm">Memuat data pemain...</p>}
							{!loading && players.length === 0 && <p className="p-4 text-white text-sm">Tidak ada pemain ditemukan.</p>}
							{players.map((player) => {
								const isActive = player.id === selectedPlayer?.id;
								const styleClass = getPositionClass(player.positionFull);
								return (
									<button
										key={player.id}
										type="button"
										onClick={() => {
											setSelectedPlayer(player);
											setIsSidebarOpen(false); // Close sidebar on selection
										}}
										className={`players-list-item ${isActive ? "active" : ""}`}
									>
										<div className={`players-number ${styleClass}`}>
											<span>{player.position}</span>
										</div>
										<div className="players-list-main">
											<div>
												<p className="players-name">{player.name}</p>
												<p className="players-info-label">No. {player.number}</p>
											</div>
											<span className="players-detail-label">Detail →</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</aside>

				{/* Glassmorphism Panel */}
				<div className="players-panel players-animate players-animate-up">
					{/* Desktop Sidebar - Static Inside Panel */}
					<aside className="players-sidebar desktop-sidebar players-animate players-animate-left">
						<h3 className="players-sidebar-title">
							Skuad {activeTeam === "utama" ? "Tim Utama" : "Akademi"}
						</h3>
						<div className="players-sidebar-inner">
							<div className="players-sidebar-overlay" />
							<div className="players-list">
								{loading && <p className="p-4 text-white text-sm">Memuat data pemain...</p>}
								{!loading && players.length === 0 && <p className="p-4 text-white text-sm">Tidak ada pemain ditemukan.</p>}
								{players.map((player) => {
									const isActive = player.id === selectedPlayer?.id;
									const styleClass = getPositionClass(player.positionFull);
									return (
										<button
											key={player.id}
											type="button"
											onClick={() => setSelectedPlayer(player)}
											className={`players-list-item ${isActive ? "active" : ""}`}
										>
											<div className={`players-number ${styleClass}`}>
												<span>{player.position}</span>
											</div>
											<div className="players-list-main">
												<div>
													<p className="players-name">{player.name}</p>
													<p className="players-info-label">No. {player.number}</p>
												</div>
												<span className="players-detail-label">Detail →</span>
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</aside>

					{/* Detail Panel */}
					<div className="players-detail-panel players-animate players-animate-right">
						<div className="players-detail-glow" />
						{selectedPlayer ? (
							<>
								<div className="players-detail-main">
									{/* Player Image */}
									<div className="players-image-wrapper">
										<div className="players-image-card">
											{/* Background Image */}
											<Image
												src="/bara.png"
												alt="Background"
												fill
												className="object-cover"
												sizes="(min-width: 1024px) 260px, 220px"
											/>

											{/* Player Photo */}
											<Image
												key={selectedPlayer.id}
												src={selectedPlayer.image}
												alt={selectedPlayer.name}
												fill
												sizes="(min-width: 1024px) 260px, 220px"
												className="players-image relative z-10"
												priority
												unoptimized
											/>
										</div>
									</div>

									{/* Player Info */}
									<div className="players-info">
										<div>
											<p className="players-info-eyebrow">
												No. {selectedPlayer.number} • {selectedPlayer.position}
											</p>
											<h3 className="players-info-name">{selectedPlayer.name}</h3>
											<p className="players-info-position">
												{selectedPlayer.positionFull}
											</p>
										</div>

										<div className="players-info-grid">
											<div className="players-info-card">
												<p className="players-info-label">Tanggal Lahir</p>
												<p className="players-info-value">
													{formatDateIndo(selectedPlayer.birthDate)}
												</p>
											</div>
											<div className="players-info-card">
												<p className="players-info-label">Kebangsaan</p>
												<div className="flex items-center justify-center gap-2">
													<div className="relative w-6 h-4 overflow-hidden rounded-[3px] shadow-sm">
														<Image
															src={`https://flagcdn.com/w40/${getCountryCode(selectedPlayer.nationality)}.png`}
															alt={selectedPlayer.nationality}
															fill
															className="object-cover"
														/>
													</div>
													<p className="players-info-value">
														{selectedPlayer.nationality}
													</p>
												</div>
											</div>
											<div className="players-info-card">
												<p className="players-info-label">Tinggi / Berat</p>
												<p className="players-info-value">
													{selectedPlayer.height} · {selectedPlayer.weight}
												</p>
											</div>
											<div className="players-info-card">
												<p className="players-info-label">Kaki Dominan</p>
												<p className="players-info-value">
													{selectedPlayer.preferredFoot}
												</p>
											</div>
										</div>

									</div>
								</div>

								{/* Statistics Section (Moved below Image & Info) */}
								<div className="players-stats-wrapper">
									<div className="players-stats-grid">
										{Object.entries(selectedPlayer.stats).map(
											([label, value], index) => (
												<div
													key={label}
													className="players-stat"
												>
													<p className="players-stat-label">{label}</p>
													<p className="players-stat-value">{value}</p>
												</div>
											)
										)}
									</div>
								</div>

								<div className="players-bio players-bio-full">
									<h4 className="players-bio-title">Biografi</h4>
									<div
										className="players-bio-text"
										dangerouslySetInnerHTML={{ __html: selectedPlayer.bio }}
									/>
								</div>
							</>
						) : (
							<div className="flex items-center justify-center h-full text-gray-400">
								<p>Pilih pemain untuk melihat detail</p>
							</div>
						)}
					</div>
				</div>
			</div>

			<style jsx>{`
				.players-section {
						background: radial-gradient(circle at top, #d32f2f 0, #7f1d1d 38%, #050505 100%);
					padding: 3.5rem 1rem 4.5rem;
				}

				.players-container {
					max-width: 1200px;
					margin: 0 auto;
					display: flex;
					flex-direction: column;
					gap: 2.5rem;
				}

				.players-header {
					display: flex;
					flex-direction: column;
					gap: 1.25rem;
				}

				@media (min-width: 768px) {
					.players-header {
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
					}
				}

				.players-eyebrow {
					font-size: 0.7rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.3em;
					color: #f97373;
				}

				.players-title {
					margin-top: 0.35rem;
					font-size: 1.8rem;
					font-weight: 900;
					text-transform: uppercase;
					letter-spacing: 0.09em;
					color: #f9fafb;
				}

				@media (min-width: 768px) {
					.players-title {
						font-size: 2.1rem;
					}
				}

				.players-subtitle {
					margin-top: 0.5rem;
					max-width: 32rem;
					font-size: 0.9rem;
					color: #d1d5db;
				}

				.players-tab-switcher {
					display: inline-flex;
					align-self: flex-start;
					padding: 0.25rem;
					border-radius: 999px;
					background: rgba(15, 23, 42, 0.9);
					box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
					backdrop-filter: blur(16px);
					border: 1px solid rgba(248, 250, 252, 0.15);
				}

				.tab-button {
					position: relative;
					border: none;
					border-radius: 999px;
					padding: 0.55rem 1.4rem;
					font-size: 0.72rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.12em;
					cursor: pointer;
					transition: all 0.25s ease;
					background: transparent;
				}

				.tab-button.inactive {
					color: #e5e7eb;
				}

				.tab-button.inactive:hover {
					color: #ffffff;
				}

				.tab-button.active {
					background: linear-gradient(135deg, #ef4444, #b91c1c);
					color: #ffffff;
					box-shadow: 0 12px 38px rgba(220, 38, 38, 0.7);
				}

				.players-panel {
					display: grid;
					grid-template-columns: minmax(0, 1fr);
					gap: 1.5rem;
					padding: 1.25rem;
					border-radius: 28px;
					background: linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(15, 23, 42, 0.85));
					box-shadow: 0 28px 80px rgba(0, 0, 0, 0.75);
					backdrop-filter: blur(22px);
					border: 1px solid rgba(248, 250, 252, 0.1);
				}

				/* Scroll reveal animations */
				.players-animate {
					opacity: 0;
					transform: translateY(26px) scale(0.98);
					transition: opacity 0.7s ease, transform 0.7s ease;
					will-change: opacity, transform;
				}

				.players-animate-up {
					transform: translateY(30px) scale(0.98);
				}

				.players-animate-left {
					transform: translateX(-32px) scale(0.98);
				}

				.players-animate-right {
					transform: translateX(32px) scale(0.98);
				}

				.players-animate.in-view {
					opacity: 1;
					transform: none;
				}

				/* Mobile Sidebar Toggle */
				.mobile-sidebar-toggle {
					position: fixed;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
					z-index: 60;
					background: #ef4444;
					color: white;
					border: none;
					padding: 0.8rem 0.6rem 0.8rem 0.4rem;
					border-radius: 0 12px 12px 0;
					box-shadow: 4px 0 12px rgba(239, 68, 68, 0.4);
					cursor: pointer;
					transition: all 0.3s ease;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.mobile-sidebar-toggle:hover {
					padding-left: 0.6rem;
					background: #dc2626;
				}

				/* Sidebar Backdrop */
				.sidebar-backdrop {
					position: fixed;
					inset: 0;
					background: rgba(0, 0, 0, 0.6);
					backdrop-filter: blur(4px);
					z-index: 9998;
					opacity: 0;
					pointer-events: none;
					transition: opacity 0.3s ease;
				}

				.sidebar-backdrop.active {
					opacity: 1;
					pointer-events: auto;
				}

				@media (min-width: 1024px) {
					.players-panel {
						grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr);
						padding: 1.75rem 2rem;
					}

					.mobile-sidebar-toggle {
						display: none;
					}

					.sidebar-backdrop {
						display: none;
					}
				}

				.players-sidebar {
					display: flex;
					flex-direction: column;
				}

				/* Mobile Sidebar Specifics */
				.mobile-sidebar {
					position: fixed;
					top: 0;
					bottom: 0;
					left: -100%; /* Hidden by default */
					width: 350px;
					max-width: 85vw;
					background: #0f172a;
					z-index: 9999;
					padding: 2rem 1.5rem;
					transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					box-shadow: 10px 0 30px rgba(0,0,0,0.5);
					height: 100%;
				}

				.mobile-sidebar.active {
					left: 0;
				}

				/* Desktop Sidebar Specifics */
				.desktop-sidebar {
					display: none;
				}

				@media (min-width: 1024px) {
					.mobile-sidebar {
						display: none;
					}

					.desktop-sidebar {
						display: flex;
						position: static;
						width: auto;
						background: transparent;
						padding: 0;
						box-shadow: none;
						height: auto;
						align-self: start;
						z-index: auto;
					}
					
					/* Ensure no left/transition properties leak to desktop sidebar */
					.desktop-sidebar.active {
						left: auto;
					}
				}

				.players-sidebar-title {
					margin-bottom: 0.9rem;
					font-size: 0.7rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.25em;
					color: #e5e7eb;
					flex-shrink: 0;
				}

				.players-sidebar-inner {
					position: relative;
					flex: 1;
					border-radius: 20px;
					overflow: hidden;
					background: rgba(0, 0, 0, 0.85);
					border: 1px solid rgba(249, 250, 251, 0.06);
					display: flex;
					flex-direction: column;
				}

				.players-sidebar-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(to bottom, rgba(248, 113, 113, 0.12), transparent 40%, rgba(243, 244, 246, 0.06));
					pointer-events: none;
				}

				.players-list {
					position: relative;
					/* Mobile: allow full height within container */
					height: 100%; 
					overflow-y: auto;
					padding: 0.35rem 0.35rem 0.6rem 0.4rem;
					flex: 1;
				}

				@media (min-width: 1024px) {
					.players-list {
						height: auto;
						max-height: 650px;
					}
				}

				.players-list::-webkit-scrollbar {
					width: 6px;
				}

				.players-list::-webkit-scrollbar-track {
					background: transparent;
				}

				.players-list::-webkit-scrollbar-thumb {
					background: rgba(248, 113, 113, 0.8);
					border-radius: 999px;
				}

				.players-list-item {
							position: relative;
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							gap: 0.85rem;
							padding: 0.75rem 0.95rem;
							margin-bottom: 0.5rem;
							border-radius: 18px;
							border: 1px solid rgba(148, 163, 184, 0.4);
							background: radial-gradient(circle at 0 0, rgba(248, 113, 113, 0.2), rgba(15, 23, 42, 0.96));
							color: #f9fafb;
							font-size: 0.85rem;
							text-align: left;
							cursor: pointer;
							transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease,
									background 0.18s ease;
							overflow: hidden;
						}

						.players-list-item::before {
							content: "";
							position: absolute;
							inset: 0;
							opacity: 0;
							background: radial-gradient(circle at 0 0, rgba(248, 250, 252, 0.16), transparent 55%);
							transition: opacity 0.2s ease;
							pointer-events: none;
						}

						.players-list-item:hover {
							transform: translateY(-2px);
							border-color: rgba(248, 250, 252, 0.65);
							box-shadow: 0 16px 36px rgba(15, 23, 42, 0.9), 0 0 0 1px rgba(248, 113, 113, 0.45);
						}

						.players-list-item:hover::before {
							opacity: 1;
						}

						.players-list-item.active {
							background: linear-gradient(125deg, rgba(248, 113, 113, 0.98), rgba(220, 38, 38, 0.98));
							border-color: rgba(254, 226, 226, 0.95);
							box-shadow: 4px 4px 6px rgba(185, 28, 28, 0.9);
							transform: translateY(-1px);
						}

						.players-list-item.active .players-name {
							color: #ffffff;
						}

						.players-list-item.active .players-info-label {
							color: #fee2e2;
						}

						.players-list-item.active .players-detail-label {
							color: #fef2f2;
							background: rgba(15, 23, 42, 0.85);
							border-color: rgba(254, 226, 226, 0.7);
						}

						.players-number {
							flex-shrink: 0;
							width: 44px;
							height: 44px;
							border-radius: 16px;
							display: flex;
							align-items: center;
							justify-content: center;
							background: rgba(15, 23, 42, 0.96);
							border: 1px solid rgba(249, 250, 251, 0.4);
							box-shadow: 0 10px 24px rgba(15, 23, 42, 0.95);
							overflow: hidden;
						}

						.players-number span {
							font-size: 0.9rem;
							font-weight: 800;
							color: #f9fafb;
							letter-spacing: 0.12em;
							text-transform: uppercase;
						}

						.players-list-main {
							display: flex;
							align-items: center;
							justify-content: space-between;
							gap: 0.75rem;
							flex: 1;
						}

						.players-list-main > div:first-child {
							display: flex;
							flex-direction: column;
							gap: 0.1rem;
						}

				.players-position {
					display: inline-block;
					min-width: 42px;
					padding: 0.1rem 0.45rem;
					border-radius: 999px;
					font-size: 0.7rem;
					font-weight: 800;
					text-align: center;
					text-transform: uppercase;
					letter-spacing: 0.16em;
					color: #f9fafb;
					box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.4);
				}

				.players-position-gk {
					background: linear-gradient(135deg, #22c55e, #16a34a);
				}

				.players-position-def {
					background: linear-gradient(135deg, #3b82f6, #1d4ed8);
				}

				.players-position-mid {
					background: linear-gradient(135deg, #facc15, #eab308);
					color: #1f2937;
				}

				.players-position-wing {
					background: linear-gradient(135deg, #fb923c, #ea580c);
				}

				.players-position-att {
					background: linear-gradient(135deg, #f97373, #ef4444);
				}

				.players-position-generic {
					background: linear-gradient(135deg, #6b7280, #4b5563);
				}

				.players-name {
					font-size: 0.9rem;
					font-weight: 600;
				}

				.players-detail-label {
							display: inline-flex;
							align-items: center;
							justify-content: center;
							padding: 0.18rem 0.6rem;
							border-radius: 999px;
							border: 1px solid rgba(248, 250, 252, 0.2);
							background: rgba(15, 23, 42, 0.78);
							font-size: 0.65rem;
							font-weight: 700;
							text-transform: uppercase;
							letter-spacing: 0.18em;
							color: rgba(249, 250, 251, 0.9);
				}

				.players-detail-panel {
					position: relative;
					border-radius: 26px;
					padding: 1.4rem 1.2rem 1.4rem;
					background: radial-gradient(circle at top left, rgba(248, 113, 113, 0.35), transparent 45%),
						linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.9));
					border: 1px solid rgba(248, 250, 252, 0.18);
					overflow: hidden;
				}

				@media (min-width: 900px) {
					.players-detail-panel {
						padding: 1.8rem 1.9rem 1.7rem;
					}
				}

				/* Player Image Enhancements */
				/* Player Detail Main Layout */
				.players-detail-main {
					display: flex;
					flex-direction: column;
				}

				@media (min-width: 1024px) {
					.players-detail-main {
						flex-direction: row;
						align-items: flex-start;
						gap: 2rem;
					}
				}

				/* Player Image Enhancements */
				.players-image-wrapper {
					position: relative;
					width: 100%;
					display: flex;
					justify-content: center;
					margin-bottom: 2rem;
				}

				@media (min-width: 1024px) {
					.players-image-wrapper {
						width: auto;
						margin-bottom: 0;
						flex-shrink: 0;
					}
				}

				.players-image-card {
					position: relative;
					width: 220px;
					height: 280px;
					border-radius: 24px;
					overflow: hidden;
					box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(248, 250, 252, 0.15);
					background: radial-gradient(circle at center, #334155 0%, #0f172a 100%);
				}

				@media (min-width: 1024px) {
					.players-image-card {
						width: 260px;
						height: 340px;
					}
				}

				.players-image {
					object-fit: cover;
					object-position: top center;
					transition: transform 0.5s ease;
				}

				.players-image-card:hover .players-image {
					transform: scale(1.05);
				}

				/* Player Info Details */
				.players-info {
					text-align: center;
					display: flex;
					flex-direction: column;
					gap: 1.5rem;
					width: 100%;
				}

				@media (min-width: 1024px) {
					.players-info {
						text-align: left;
						align-items: flex-start;
						padding-top: 1rem;
					}
				}

				.players-info-eyebrow {
					font-size: 0.8rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.15em;
					color: #f87171;
					margin-bottom: 0.25rem;
				}

				.players-info-name {
					font-size: 1.8rem;
					font-weight: 800;
					line-height: 1.1;
					color: #f9fafb;
					text-transform: uppercase;
					letter-spacing: 0.02em;
				}

				.players-info-position {
					margin-top: 0.4rem;
					font-size: 1rem;
					color: #9ca3af;
					font-weight: 500;
				}

				.players-info-grid {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 1rem;
					margin-top: 0.5rem;
				}

				.players-info-card {
					padding: 0.8rem;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 12px;
					border: 1px solid rgba(255, 255, 255, 0.05);
				}

				.players-info-label {
					font-size: 0.65rem;
					text-transform: uppercase;
					letter-spacing: 0.1em;
					color: #94a3b8;
					margin-bottom: 0.2rem;
				}

				.players-info-value {
					font-size: 0.9rem;
					font-weight: 600;
					color: #e2e8f0;
				}



				.players-stats-wrapper {
					margin-top: 2rem;
					padding-top: 1.5rem;
					border-top: 1px solid rgba(255, 255, 255, 0.1);
				}

				/* Stats Grid */
				.players-stats-grid {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 0.75rem;
					margin-top: 0.5rem;
				}

				@media (min-width: 1024px) {
					.players-stats-grid {
						grid-template-columns: repeat(3, 1fr);
						gap: 1rem;
					}
				}

				.players-stat {
					padding: 0.9rem;
					background: rgba(30, 41, 59, 0.6);
					border-radius: 16px;
					border: 1px solid rgba(255, 255, 255, 0.05);
					text-align: center;
				}

				.players-stat-label {
					font-size: 0.7rem;
					text-transform: uppercase;
					letter-spacing: 0.1em;
					color: #cbd5e1;
					margin-bottom: 0.2rem;
				}

				.players-stat-value {
					font-size: 1.4rem;
					font-weight: 800;
					color: #f9fafb;
				}

				.players-bio {
					margin-top: 2rem;
					padding-top: 1.5rem;
					border-top: 1px solid rgba(255, 255, 255, 0.1);
				}

				.players-bio-title {
					font-size: 1rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.1em;
					color: #f9fafb;
					margin-bottom: 0.75rem;
				}

				.players-bio-text {
					font-size: 0.9rem;
					line-height: 1.7;
					color: #cbd5e1;
				}
				
				/* Mobile adjustments for detail panel */
				@media (max-width: 899px) {
					.players-detail-panel {
						order: -1; 
					}
					
					.players-image-card {
						width: 160px;
						height: 200px;
					}
				}
			`}</style>
		</section >
	);
}
