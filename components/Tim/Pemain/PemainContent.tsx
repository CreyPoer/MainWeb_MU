"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type TeamKey = "utama" | "akademi";

type Player = {
	id: number;
	name: string;
	number: number;
	position: string; // e.g. GK, CB, CF
	positionFull: string;
	image: string;
	birthDate: string;
	height: string;
	weight: string;
	nationality: string;
	preferredFoot: string;
	stats: Record<string, string>;
	bio: string;
};

const getPositionClass = (position: string): string => {
	switch (position.toUpperCase()) {
		case "GK":
			return "players-position-gk"; // kiper - hijau
		case "CB":
		case "LB":
		case "RB":
		case "CBR":
		case "CBL":
			return "players-position-def"; // bek - biru
		case "CM":
		case "CDM":
		case "CAM":
			return "players-position-mid"; // gelandang - kuning
		case "LW":
		case "RW":
		case "LM":
		case "RM":
			return "players-position-wing"; // winger - oranye
		case "CF":
		case "ST":
		case "SS":
			return "players-position-att"; // penyerang - merah
		default:
			return "players-position-generic";
	}
};

const MAIN_TEAM_PLAYERS: Player[] = [
	{
		id: 1,
		name: "Rendy Satria",
		number: 1,
		position: "GK",
		positionFull: "Goalkeeper",
		image:
			"https://images.pexels.com/photos/61135/pexels-photo-61135.jpeg?auto=compress&cs=tinysrgb&w=600",
		birthDate: "12 Januari 1996",
		height: "185 cm",
		weight: "78 kg",
		nationality: "Indonesia",
		preferredFoot: "Kanan",
		stats: {
			Main: "14",
			"Kartu Kuning": "0",
			"Kartu Kuning Kedua": "0",
			"Kartu Merah": "1",
			"Gol yang kebobolan": "20",
			"Lembar Bersih": "3",
		},
		bio:
			"Penjaga gawang utama dengan refleks cepat dan komando kuat di lini belakang, dikenal tenang saat mengawal bola-bola udara.",
	},
	{
		id: 2,
		name: "Bagus Pratama",
		number: 4,
		position: "CB",
		positionFull: "Centre Back",
		image:
			"https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=600",
		birthDate: "3 Maret 1995",
		height: "182 cm",
		weight: "80 kg",
		nationality: "Indonesia",
		preferredFoot: "Kanan",
		stats: {
			Main: "15",
			Goal: "3",
			Assist: "1",
			"Kartu Kuning": "2",
			"Kartu Kuning Kedua": "0",
			"Kartu Merah": "0",
		},
		bio:
			"Bek tengah tangguh yang mengandalkan duel udara dan tekel bersih, menjadi andalan dalam menjaga area kotak penalti.",
	},
	{
		id: 3,
		name: "Fabio Silva",
		number: 9,
		position: "CF",
		positionFull: "Centre Forward",
		image:
			"https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
		birthDate: "28 Juli 1994",
		height: "178 cm",
		weight: "76 kg",
		nationality: "Brasil",
		preferredFoot: "Kiri",
		stats: {
			Main: "18",
			Goal: "15",
			Assist: "6",
			"Kartu Kuning": "1",
			"Kartu Kuning Kedua": "0",
			"Kartu Merah": "0",
		},
		bio:
			"Striker asing dengan insting mencetak gol tinggi, aktif bergerak di kotak penalti dan piawai memanfaatkan peluang kecil.",
	},
	{
		id: 4,
		name: "Hendri Wijaya",
		number: 7,
		position: "RW",
		positionFull: "Right Winger",
		image:
			"https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600",
		birthDate: "9 September 1997",
		height: "172 cm",
		weight: "68 kg",
		nationality: "Indonesia",
		preferredFoot: "Kanan",
		stats: {
			Main: "20",
			Goal: "7",
			Assist: "9",
			"Kartu Kuning": "3",
			"Kartu Kuning Kedua": "0",
			"Kartu Merah": "0",
		},
		bio:
			"Winger cepat di sisi kanan dengan dribel lincah dan akurasi umpan silang yang tinggi untuk membuka peluang tim.",
	},
];

const ACADEMY_PLAYERS: Player[] = [
	{
		id: 5,
		name: "Raka Firmansyah",
		number: 21,
		position: "CM",
		positionFull: "Central Midfielder",
		image:
			"https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
		birthDate: "4 April 2006",
		height: "175 cm",
		weight: "66 kg",
		nationality: "Indonesia",
		preferredFoot: "Kanan",
		stats: {
			Main: "16",
			Goal: "4",
			Assist: "8",
			"Kartu Kuning": "1",
			"Kartu Kuning Kedua": "0",
			"Kartu Merah": "0",
		},
		bio:
			"Gelandang tengah kreatif dari akademi yang dikenal punya visi permainan bagus dan distribusi bola yang rapi.",
	},
	{
		id: 6,
		name: "Rio Aditya",
		number: 11,
		position: "LW",
		positionFull: "Left Winger",
		image:
			"https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg?auto=compress&cs=tinysrgb&w=600",
		birthDate: "19 Mei 2005",
		height: "174 cm",
		weight: "65 kg",
		nationality: "Indonesia",
		preferredFoot: "Kiri",
		stats: {
			Main: "19",
			Goal: "9",
			Assist: "5",
			"Kartu Kuning": "2",
			"Kartu Kuning Kedua": "0",
			"Kartu Merah": "0",
		},
		bio:
			"Penyerang sayap lincah dengan kemampuan menusuk dari sisi kiri serta finishing yang terus berkembang.",
	},
	{
		id: 7,
		name: "Rizky Malik",
		number: 3,
		position: "CB",
		positionFull: "Centre Back",
		image:
			"https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=600",
		birthDate: "30 Oktober 2005",
		height: "183 cm",
		weight: "79 kg",
		nationality: "Indonesia",
		preferredFoot: "Kanan",
		stats: {
			Main: "17",
			Goal: "2",
			Assist: "1",
			"Kartu Kuning": "3",
			"Kartu Kuning Kedua": "0",
			"Kartu Merah": "0",
		},
		bio:
			"Bek muda akademi yang kuat dalam duel fisik dan disiplin menjaga garis pertahanan.",
	},
];

export default function PemainContent() {
	const [activeTeam, setActiveTeam] = useState<TeamKey>("utama");
	const sectionRef = useRef<HTMLElement | null>(null);

	const players = useMemo(
		() => (activeTeam === "utama" ? MAIN_TEAM_PLAYERS : ACADEMY_PLAYERS),
		[activeTeam]
	);

	const [selectedPlayer, setSelectedPlayer] = useState<Player>(
		players[0] ?? MAIN_TEAM_PLAYERS[0]
	);

	useEffect(() => {
		if (players.length > 0) {
			setSelectedPlayer(players[0]);
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
	}, [activeTeam]);

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
							className={`tab-button ${
								activeTeam === "utama" ? "active" : "inactive"
							}`}
						>
							Tim Utama
						</button>
						<button
							type="button"
							onClick={() => setActiveTeam("akademi")}
							className={`tab-button ${
								activeTeam === "akademi" ? "active" : "inactive"
							}`}
						>
							Akademi
						</button>
					</div>
				</div>

				{/* Glassmorphism Panel */}
				<div className="players-panel players-animate players-animate-up">
					{/* Sidebar List */}
					<aside className="players-sidebar players-animate players-animate-left">
						<h3 className="players-sidebar-title">
							Skuad {activeTeam === "utama" ? "Tim Utama" : "Akademi"}
						</h3>
						<div className="players-sidebar-inner">
							<div className="players-sidebar-overlay" />
							<div className="players-list">
								{players.map((player) => {
									const isActive = player.id === selectedPlayer?.id;

									return (
										<button
											key={player.id}
											type="button"
											onClick={() => setSelectedPlayer(player)}
											className={`players-list-item ${
												isActive ? "active" : ""
											}`}
										>
											<div
												className={`players-number ${getPositionClass(
													player.position
												)}`}
											>
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
						<div className="players-detail-main">
							{/* Player Image */}
							<div className="players-image-wrapper">
								<div className="players-image-card">
									<Image
										key={selectedPlayer?.id}
										src={selectedPlayer?.image ?? ""}
										alt={selectedPlayer?.name ?? "Pemain"}
										fill
										sizes="(min-width: 1024px) 220px, 180px"
										className="players-image"
									/>
								</div>
							</div>

							{/* Player Info */}
							<div className="players-info">
								<div>
									<p className="players-info-eyebrow">
										No. {selectedPlayer?.number} • {selectedPlayer?.position}
									</p>
									<h3 className="players-info-name">{selectedPlayer?.name}</h3>
									<p className="players-info-position">
										{selectedPlayer?.positionFull}
									</p>
								</div>

								<div className="players-info-grid">
									<div className="players-info-card">
										<p className="players-info-label">Tanggal Lahir</p>
										<p className="players-info-value">
											{selectedPlayer?.birthDate}
										</p>
									</div>
									<div className="players-info-card">
										<p className="players-info-label">Kebangsaan</p>
										<p className="players-info-value">
											{selectedPlayer?.nationality}
										</p>
									</div>
									<div className="players-info-card">
										<p className="players-info-label">Tinggi / Berat</p>
										<p className="players-info-value">
											{selectedPlayer?.height} · {selectedPlayer?.weight}
										</p>
									</div>
									<div className="players-info-card">
										<p className="players-info-label">Kaki Dominan</p>
										<p className="players-info-value">
											{selectedPlayer?.preferredFoot}
										</p>
									</div>
								</div>

								<div className="players-stats-grid">
									{Object.entries(selectedPlayer?.stats ?? {}).map(
										([label, value], index) => (
											<div
												key={label}
												className={`players-stat ${
													index === 0 ? "players-stat-main" : ""
												}`}
											>
												<p className="players-stat-label">{label}</p>
												<p className="players-stat-value">{value}</p>
											</div>
										)
									)}
								</div>
							</div>
						</div>
						<div className="players-bio players-bio-full">
							<h4 className="players-bio-title">Biografi</h4>
							<p className="players-bio-text">{selectedPlayer?.bio}</p>
						</div>
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
					transform: translateX(0) translateY(0) scale(1);
				}

				@media (min-width: 900px) {
					.players-panel {
						grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.6fr);
						padding: 1.75rem 2rem;
					}
				}

				.players-sidebar-title {
					margin-bottom: 0.9rem;
					font-size: 0.7rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.25em;
					color: #e5e7eb;
				}

				.players-sidebar-inner {
					position: relative;
					flex: 1;
					border-radius: 20px;
					overflow: hidden;
					background: rgba(0, 0, 0, 0.85);
					border: 1px solid rgba(249, 250, 251, 0.06);
				}

				.players-sidebar-overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(to bottom, rgba(248, 113, 113, 0.12), transparent 40%, rgba(243, 244, 246, 0.06));
					pointer-events: none;
				}

				.players-list {
					position: relative;
					max-height: 420px;
					overflow-y: auto;
					padding: 0.35rem 0.35rem 0.6rem 0.4rem;
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
							box-shadow: 0 20px 44px rgba(185, 28, 28, 0.9);
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

				.players-detail-glow {
					position: absolute;
					inset: -40%;
					background: radial-gradient(circle at 20% 0, rgba(248, 113, 113, 0.28), transparent 40%),
						radial-gradient(circle at 90% 20%, rgba(248, 250, 252, 0.18), transparent 55%);
					opacity: 0.9;
					pointer-events: none;
				}

				.players-detail-main {
					position: relative;
					display: flex;
					flex-direction: column;
					gap: 1.6rem;
					z-index: 1;
				}

				@media (min-width: 960px) {
					.players-detail-main {
						flex-direction: row;
						align-items: center;
					}
				}

				.players-image-wrapper {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.players-image-card {
					position: relative;
							width: 210px;
							height: 310px;
					border-radius: 26px;
					overflow: hidden;
					background: linear-gradient(to top, rgba(127, 29, 29, 0.9), rgba(252, 165, 165, 0.25));
				}

				@media (min-width: 960px) {
					.players-image-card {
								width: 250px;
								height: 370px;
					}
				}

				.players-image {
					object-fit: cover;
					object-position: top;
					transition: transform 0.55s ease;
				}

				.players-image-card:hover .players-image {
					transform: scale(1.03);
				}

				.players-info {
					flex: 1.25;
					display: flex;
					flex-direction: column;
					gap: 1.1rem;
					color: #f9fafb;
					font-size: 0.9rem;
				}

				.players-info-eyebrow {
					font-size: 0.7rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.24em;
					color: #fecaca;
				}

				.players-info-name {
					margin-top: 0.4rem;
					font-size: 1.7rem;
					font-weight: 900;
					text-transform: uppercase;
					letter-spacing: 0.12em;
				}

				@media (min-width: 960px) {
					.players-info-name {
						font-size: 2rem;
					}
				}

				.players-info-position {
					margin-top: 0.25rem;
					font-size: 0.7rem;
					font-weight: 700;
					letter-spacing: 0.28em;
					text-transform: uppercase;
					color: #e5e7eb;
				}

				.players-info-grid {
					display: grid;
					grid-template-columns: repeat(2, minmax(0, 1fr));
					gap: 0.7rem;
					font-size: 0.8rem;
				}

				.players-info-card {
					border-radius: 18px;
					padding: 0.65rem 0.8rem;
					background: rgba(15, 23, 42, 0.9);
					border: 1px solid rgba(248, 250, 252, 0.18);
				}

				.players-info-label {
					font-size: 0.62rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.16em;
					color: #e5e7eb;
				}

				.players-info-value {
					margin-top: 0.25rem;
					font-weight: 600;
				}

				.players-stats-grid {
					margin-top: 0.25rem;
					display: grid;
					grid-template-columns: repeat(3, minmax(0, 1fr));
					gap: 0.7rem;
					text-align: center;
				}

				.players-stat {
					border-radius: 18px;
					padding: 0.6rem 0.7rem;
					background: rgba(15, 23, 42, 0.9);
					border: 1px solid rgba(248, 250, 252, 0.2);
					color: #f9fafb;
				}

				.players-stat-main {
					background: linear-gradient(130deg, #ef4444, #b91c1c);
					border-color: rgba(254, 226, 226, 0.9);
					box-shadow: 0 18px 40px rgba(185, 28, 28, 0.9);
				}

				.players-stat-label {
					font-size: 0.6rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.16em;
					color: #e5e7eb;
				}

				.players-stat-main .players-stat-label {
					color: #fee2e2;
				}

				.players-stat-value {
					margin-top: 0.3rem;
					font-size: 1.2rem;
					font-weight: 900;
				}

				.players-bio {
					margin-top: 1.2rem;
					padding-top: 0.8rem;
					border-top: 1px solid rgba(248, 250, 252, 0.18);
				}

				.players-bio-full {
					max-width: 100%;
				}

				.players-bio-title {
					font-size: 0.7rem;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.16em;
					color: #ffffff;
					margin-bottom: 0.35rem;
				}

				.players-bio-text {
					font-size: 0.82rem;
					line-height: 1.6;
					color: #e5e7eb;
				}

				.players-disclaimer {
					margin-top: 0.6rem;
					font-size: 0.68rem;
					color: #9ca3af;
				}

				@media (max-width: 640px) {
					.players-section {
						padding-top: 2.5rem;
					}

					.players-panel {
						padding: 1rem;
					}

					.players-detail-panel {
						padding: 1.2rem 1.1rem 1.2rem;
					}

					.players-title {
						font-size: 1.6rem;
					}
				}
			`}</style>
		</section>
	);
}
