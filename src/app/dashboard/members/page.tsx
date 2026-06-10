"use client";

import React, { useState } from "react";
import { MOCK_TEAM } from "@/constants/mockData";

const mono = "var(--font-jetbrains-mono), monospace";
const sora = "var(--font-sora), sans-serif";

type Department = "ALL" | "DESIGN" | "TECH" | "MEDIA" | "COMMUNITY" | "EVENT" | "MARKETING" | "E-SPORTS";

const filters: Department[] = ["ALL", "DESIGN", "TECH", "MEDIA", "COMMUNITY", "EVENT", "MARKETING", "E-SPORTS"];

// ── Avatar placeholder using initials ──
function Avatar({ name, size = 300 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const colors = ["#1a0a00", "#0a0a1a", "#0a1a0a", "#1a0a1a", "#0a1a1a"];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, ${bg} 0%, #000 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: sora,
          fontWeight: 800,
          fontSize: size > 200 ? "96px" : "32px",
          color: "rgba(255,122,0,0.15)",
          letterSpacing: "-2px",
          userSelect: "none",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

// ── Stat bar row ──
function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: "16px", height: "22px", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "15px",
          alignItems: "center",
          marginBottom: "4px",
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: "10px",
            lineHeight: "15px",
            color: "#E0C0AF",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: mono,
            fontSize: "10px",
            lineHeight: "15px",
            color: "#E0C0AF",
          }}
        >
          {value}
        </span>
      </div>
      {/* Track */}
      <div style={{ position: "relative", height: "3px", background: "rgba(255,255,255,0.1)" }}>
        {/* Fill */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "3px",
            width: `${value}%`,
            background: "linear-gradient(90deg, #FF7A00 0%, #FDD400 100%)",
            boxShadow: "0px 0px 10px rgba(255,122,0,0.6)",
          }}
        />
      </div>
    </div>
  );
}

// ── Leader featured card ──
function LeaderCard({ member, width }: { member: (typeof MOCK_TEAM)[0]; width: string }) {
  const isCard1 = width === "632px";
  const photoSize = isCard1 ? 316 : 308.5;
  const photoTop = isCard1 ? "118.5px" : "122.25px";

  return (
    <div
      className="leader-card-hover"
      style={{
        width: width,
        height: "553px",
        background: "#1C1B1C",
        position: "relative",
        display: "flex",
        flexShrink: 0,
        boxSizing: "border-box",
        border: "1px solid #201F20",
      }}
    >
      {/* Left: Photo container */}
      <div
        style={{
          width: `${photoSize}px`,
          height: `${photoSize}px`,
          position: "absolute",
          left: "0px",
          top: photoTop,
          overflow: "hidden",
        }}
      >
        {/* Horizontal Divider */}
        <div
          style={{
            position: "absolute",
            width: `${photoSize}px`,
            height: "2px",
            left: "0px",
            top: "0px",
            background: "linear-gradient(90deg, #FF7A00 0%, rgba(255, 122, 0, 0) 100%)",
            zIndex: 2,
          }}
        />
        <div style={{ width: "100%", height: "100%", mixBlendMode: "saturation" }}>
          <Avatar name={member.name} size={300} />
        </div>
      </div>

      {/* Right: Info container */}
      <div
        style={{
          position: "absolute",
          width: `${photoSize}px`,
          height: "553px",
          left: `${photoSize}px`,
          top: "0px",
          background: "linear-gradient(135deg, #1C1B1C 0%, #000000 100%)",
          padding: "81px 32px 32px 32px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Party Leader Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span
            style={{
              width: "9.33px",
              height: "12.25px",
              background: "#FDD400",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: mono,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "1.2px",
              color: "#FDD400",
            }}
          >
            PARTY LEADER
          </span>
        </div>

        {/* Name */}
        <h2
          style={{
            fontFamily: sora,
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "53px",
            letterSpacing: "-0.96px",
            textTransform: "uppercase",
            color: "#E5E2E3",
            margin: "0 0 4px 0",
          }}
        >
          {member.name}
        </h2>

        {/* Role */}
        <p
          style={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "12px",
            letterSpacing: "1.2px",
            color: "#FF7A00",
            margin: "0 0 32px 0",
          }}
        >
          {member.role.toUpperCase()}
        </p>

        {/* Stats */}
        {member.stats && (
          <div style={{ marginBottom: "20px" }}>
            {member.stats.map((s) => (
              <StatBar key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}

        {/* Game preview panel */}
        {member.gamePreview && (
          <div
            style={{
              background: "rgba(53, 52, 54, 0.3)",
              padding: "12px",
              display: "flex",
              gap: "16px",
              alignItems: "center",
              marginTop: "auto",
              height: "87px",
              boxSizing: "border-box",
            }}
          >
            {/* Play Button Thumbnail */}
            <div
              style={{
                width: "80px",
                height: "48px",
                background: "rgba(255, 122, 0, 0.1)",
                border: "1px solid #584235",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span style={{ fontFamily: mono, fontSize: "10px", color: "#FF7A00", fontWeight: 700 }}>
                ▶ PLAY
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: "10px",
                  lineHeight: "15px",
                  color: "#E0C0AF",
                  opacity: 0.6,
                  margin: "0 0 2px 0",
                }}
              >
                {member.gamePreview.label}
              </p>
              <p
                style={{
                  fontFamily: sora,
                  fontWeight: 700,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#FF7A00",
                  margin: 0,
                }}
              >
                {member.gamePreview.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Regular member card ──
function MemberCard({ member }: { member: (typeof MOCK_TEAM)[0] }) {
  return (
    <div
      className="member-card-hover"
      style={{
        width: "270px",
        height: "376px",
        background: "#1C1B1C",
        position: "relative",
        flexShrink: 0,
        boxSizing: "border-box",
        border: "1px solid transparent",
      }}
    >
      {/* Orange gradient top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #ffffffff 0%, rgba(255,122,0,0) 100%)",
          zIndex: 2,
        }}
      />
      {/* Photo container */}
      <div
        style={{
          width: "268px",
          height: "300px",
          position: "relative",
          mixBlendMode: "saturation",
          overflow: "hidden",
        }}
      >
        <Avatar name={member.name} size={100} />
      </div>
      {/* Info strip container */}
      <div
        style={{
          position: "absolute",
          width: "268px",
          height: "74px",
          left: 0,
          top: "300px",
          background: "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
          padding: "15px 16px",
          boxSizing: "border-box",
        }}
      >
        {/* Name */}
        <h3
          style={{
            fontFamily: sora,
            fontWeight: 405,
            fontSize: "20px",
            lineHeight: "30px",
            textTransform: "uppercase",
            color: "#E5E2E3",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {member.name}
        </h3>
        {/* Role */}
        <p
          style={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: "10px",
            lineHeight: "15px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#FF7A00",
            margin: 0,
          }}
        >
          {member.role.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

// ── PAGE ──
export default function MembersPage() {
  const [activeFilter, setActiveFilter] = useState<Department>("ALL");

  const leads = MOCK_TEAM.filter((m) => m.isLead);
  const members = MOCK_TEAM.filter((m) => !m.isLead);

  const filteredMembers =
    activeFilter === "ALL"
      ? members
      : members.filter((m) => m.department === activeFilter);

  return (
    <div style={{ background: "#131314", color: "#E5E2E3", minHeight: "100vh" }}>
      {/* Dynamic hover styles injection */}
      <style>{`
        .member-card-hover {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .member-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
          border-color: #FF7A00 !important;
        }
        .leader-card-hover {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .leader-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(255, 122, 0, 0.15);
          border-color: #FF7A00 !important;
        }
        .filter-btn {
          height: 30px;
          border: none;
          font-family: ${mono};
          font-size: 12px;
          line-height: 12px;
          letter-spacing: 1.2px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-btn-active {
          background: #FF7A00;
          color: #5C2800;
          font-weight: 600;
        }
        .filter-btn-inactive {
          background: #2A2A2B;
          border-bottom: 2px solid #584235;
          color: #E0C0AF;
          font-weight: 700;
        }
        .filter-btn-inactive:hover {
          background: #3e3e40;
          border-bottom-color: #FF7A00;
          color: #fff;
        }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ padding: "179px 64px 0" }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "28px" }}>
          <div style={{ width: "32px", height: "2px", background: "#FF7A00", marginRight: "8px" }} />
          <span
            style={{
              fontFamily: mono,
              fontWeight: 600,
              fontSize: "12px",
              lineHeight: "12px",
              letterSpacing: "1.2px",
              color: "#FF7A00",
            }}
          >
            MEET THE CLUB
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: sora,
            fontWeight: 800,
            fontSize: "80px",
            lineHeight: "80px",
            letterSpacing: "-3.2px",
            textTransform: "uppercase",
            color: "#E5E2E3",
            margin: "0 0 36px 0",
          }}
        >
          MEET THE <span style={{ color: "#FF7A00" }}>GANG</span>.
        </h1>

        {/* Filter row */}
        <div style={{ paddingTop: "32px", paddingBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            {filters.map((f) => {
              const isActive = activeFilter === f;
              // Specific width mapping matching Figma specs
              const widthMap: Record<Department, string> = {
                ALL: "73.2px",
                DESIGN: "98px",
                TECH: "81px",
                MEDIA: "89px",
                COMMUNITY: "123px",
                EVENT: "89px",
                MARKETING: "123px",
                "E-SPORTS": "114px",
              };
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`filter-btn ${isActive ? "filter-btn-active" : "filter-btn-inactive"}`}
                  style={{
                    width: widthMap[f],
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── LEADER CARDS ── */}
      <div
        style={{
          padding: "0 64px",
          marginTop: "45px",
          display: "flex",
          gap: "57px",
        }}
      >
        {leads.map((lead, idx) => (
          <LeaderCard key={lead.id} member={lead} width={idx === 0 ? "632px" : "617px"} />
        ))}
      </div>

      {/* ── EVERYONE BUILDING ── */}
      <div style={{ padding: "156px 64px 0" }}>
        <h2
          style={{
            fontFamily: sora,
            fontWeight: 700,
            fontSize: "48px",
            lineHeight: "53px",
            letterSpacing: "-2.4px",
            textTransform: "uppercase",
            color: "#E5E2E3",
            margin: "0 0 157px 0",
          }}
        >
          EVERYONE BUILDING.
        </h2>
      </div>

      {/* ── MEMBER CARDS GRID ── */}
      <div
        style={{
          padding: "0 100px 80px",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(240px, 1fr))",
          gap: "80px 20px",
          justifyContent: "space-between",
        }}
      >
        {filteredMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
        {filteredMembers.length === 0 && (
          <div
            style={{
              gridColumn: "1/-1",
              padding: "80px 0",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: mono,
                fontSize: "12px",
                letterSpacing: "1.2px",
                color: "#584235",
              }}
            >
              NO MEMBERS IN THIS DEPARTMENT
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
