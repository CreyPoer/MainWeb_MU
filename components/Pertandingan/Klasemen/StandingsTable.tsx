"use client";

import React from "react";
import Image from "next/image";
import { STANDINGS_DATA, StandingTeam } from "./data";
import { FaCheckCircle, FaMinusCircle, FaTimesCircle } from "react-icons/fa";

interface StandingsTableProps {
    data: StandingTeam[];
}

export default function StandingsTable({ data }: StandingsTableProps) {
    // Determine which team name to highlight (Madura Senior or U20)
    // We can check if any team id contains "madura"

    return (
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px 100px" }} data-aos="fade-up" data-aos-delay="200">
            {/* Wrapper for horizontal scroll on mobile */}
            <div style={{ backgroundColor: "white", borderRadius: "0 0 4px 4px", overflow: "hidden", border: "1px solid #E5E7EB", borderTop: "none" }}>
                <div className="table-responsive">
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#B91C1C", color: "white", fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>
                                <th style={{ padding: "16px", textAlign: "center", width: "60px" }}>Pos</th>
                                <th style={{ padding: "16px", textAlign: "left" }}>Club</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>P</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>W</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>D</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>L</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>GF</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>GA</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>GD</th>
                                <th style={{ padding: "16px", textAlign: "center", fontWeight: "900", fontSize: "15px" }}>PTS</th>
                                <th style={{ padding: "16px", textAlign: "center", minWidth: "160px" }}>Form</th>
                                <th style={{ padding: "16px", textAlign: "center" }}>Next</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((team, idx) => {
                                const isMadura = team.id === "madura" || team.id === "madura-u20";
                                return (
                                    <tr
                                        key={team.id}
                                        style={{
                                            backgroundColor: isMadura ? "#FEF2F2" : (idx % 2 === 0 ? "white" : "#F9FAFB"),
                                            borderBottom: "1px solid #E5E7EB",
                                            transition: "background-color 0.2s"
                                        }}
                                        className="hover:bg-gray-50"
                                    >
                                        <td style={{ padding: "16px", textAlign: "center", fontWeight: "bold", fontSize: "16px", color: isMadura ? "#B91C1C" : "#111827" }}>
                                            {team.position}
                                        </td>
                                        <td style={{ padding: "16px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                                <div style={{ width: "36px", height: "36px", position: "relative" }}>
                                                    <Image src={team.logo} alt={team.name} fill style={{ objectFit: "contain" }} />
                                                </div>
                                                <span style={{ fontWeight: "800", textTransform: "uppercase", color: isMadura ? "#B91C1C" : "#111827" }}>
                                                    {team.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td style={{ padding: "16px", textAlign: "center", fontWeight: "600", color: "#374151" }}>{team.played}</td>
                                        <td style={{ padding: "16px", textAlign: "center", fontWeight: "600", color: "#374151" }}>{team.won}</td>
                                        <td style={{ padding: "16px", textAlign: "center", fontWeight: "600", color: "#374151" }}>{team.drawn}</td>
                                        <td style={{ padding: "16px", textAlign: "center", fontWeight: "600", color: "#374151" }}>{team.lost}</td>
                                        <td style={{ padding: "16px", textAlign: "center", color: "#6B7280" }}>{team.goalsFor}</td>
                                        <td style={{ padding: "16px", textAlign: "center", color: "#6B7280" }}>{team.goalsAgainst}</td>
                                        <td style={{ padding: "16px", textAlign: "center", fontWeight: "bold", color: team.goalDifference > 0 ? "#10B981" : (team.goalDifference < 0 ? "#EF4444" : "#6B7280") }}>
                                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                                        </td>
                                        <td style={{ padding: "16px", textAlign: "center", fontWeight: "900", fontSize: "16px", color: "#111827" }}>{team.points}</td>

                                        {/* FORM COLUMN */}
                                        <td style={{ padding: "16px", textAlign: "center" }}>
                                            <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                                                {team.form.map((result, i) => {
                                                    let bgColor = "#9CA3AF";
                                                    if (result === 'W') bgColor = "#22C55E"; // Green
                                                    if (result === 'L') bgColor = "#EF4444"; // Red

                                                    return (
                                                        <div key={i} style={{
                                                            width: "24px",
                                                            height: "24px",
                                                            borderRadius: "50%",
                                                            backgroundColor: bgColor,
                                                            color: "white",
                                                            fontSize: "10px",
                                                            fontWeight: "bold",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}>
                                                            {result}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </td>

                                        {/* NEXT MATCH COLUMN */}
                                        <td style={{ padding: "16px", textAlign: "center" }}>
                                            <div style={{ width: "32px", height: "32px", position: "relative", margin: "0 auto" }} title={`vs ${team.nextMatch.opponentName}`}>
                                                <Image src={team.nextMatch.opponentLogo} alt="Opponent" fill style={{ objectFit: "contain" }} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .table-responsive {
                    overflow-x: auto;
                }
                 /* Custom Scrollbar for table */
                .table-responsive::-webkit-scrollbar {
                    height: 8px;
                }
                .table-responsive::-webkit-scrollbar-thumb {
                    background: #D1D5DB;
                    border-radius: 4px;
                }
                .table-responsive::-webkit-scrollbar-track {
                    background: #F3F4F6;
                }
            `}</style>
        </section>
    );
}
