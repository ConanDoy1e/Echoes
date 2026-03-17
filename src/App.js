import { useState, useMemo } from "react";
import obituaries from "./obituaries.json";

const PER_PAGE = 30;

const TOP_KEYWORDS = [
  "삼성전자", "구덕고등학교", "현대카드", "네이버", "서울대학교",
  "고려대학교", "카카오", "부산", "연세대학교", "강남구",
];

/* ═══════════════════════════════════════════
   SearchBar
   ═══════════════════════════════════════════ */
function SearchBar({ query, onChange }) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0,
        paddingLeft: "20px", display: "flex", alignItems: "center", pointerEvents: "none",
      }}>
        <svg style={{ width: "18px", height: "18px", color: "#4a4a4a" }}
          fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text" value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이름, 지역, 학교, 회사, 동네명으로 검색해 보세요"
        style={{
          width: "100%", paddingLeft: "50px", paddingRight: "48px",
          paddingTop: "15px", paddingBottom: "15px",
          borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "rgba(255,255,255,0.04)", color: "#fff",
          fontSize: "15px", fontWeight: 300, outline: "none",
          boxSizing: "border-box", fontFamily: "inherit",
          transition: "border-color 0.3s, background-color 0.3s, box-shadow 0.3s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.18)";
          e.target.style.backgroundColor = "rgba(255,255,255,0.06)";
          e.target.style.boxShadow = "0 0 20px rgba(255,255,255,0.03)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255,255,255,0.08)";
          e.target.style.backgroundColor = "rgba(255,255,255,0.04)";
          e.target.style.boxShadow = "none";
        }}
      />
      {query && (
        <button onClick={() => onChange("")} style={{
          position: "absolute", top: 0, bottom: 0, right: 0,
          paddingRight: "16px", display: "flex", alignItems: "center",
          background: "none", border: "none", cursor: "pointer", color: "#555",
          transition: "color 0.2s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ccc")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
        >
          <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   TopKeywords
   ═══════════════════════════════════════════ */
function TopKeywords({ onSelect, activeKeyword }) {
  return (
    <div style={{ marginTop: "28px", marginBottom: "32px" }}>
      <p style={{
        fontSize: "11px", fontWeight: 500, color: "#9ca3af",
        letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: "12px",
      }}>
        많이 검색한 키워드
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "8px",
      }}>
        {TOP_KEYWORDS.map((kw) => {
          const isActive = activeKeyword === kw;
          return (
            <button key={kw} onClick={() => onSelect(isActive ? "" : kw)}
              style={{
                padding: "9px 4px",
                borderRadius: "6px",
                border: isActive ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.06)",
                backgroundColor: isActive ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                color: isActive ? "#fff" : "#9ca3af",
                fontSize: "12px", fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#ccc";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "#9ca3af";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                }
              }}
            >
              {kw}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PremiumCard
   ═══════════════════════════════════════════ */
function PremiumCard({ obituary, onClick }) {
  return (
    <button onClick={() => onClick(obituary)}
      style={{
        width: "100%", textAlign: "left",
        backgroundColor: "rgba(255, 215, 0, 0.04)",
        backdropFilter: "blur(12px)",
        border: "2px solid rgba(255, 215, 0, 0.35)",
        borderRadius: "4px 16px 4px 16px",
        padding: "26px 28px",
        cursor: "pointer", fontFamily: "inherit",
        transition: "all 0.3s ease",
        animation: "fadeUp 0.4s ease both",
        marginBottom: "16px",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.07)";
        e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.5)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 215, 0, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.04)";
        e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.35)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* 프리미엄 배지 */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
        <span style={{
          padding: "3px 10px",
          borderRadius: "4px",
          backgroundColor: "rgba(255, 215, 0, 0.12)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          color: "#FFD700",
          fontSize: "10px", fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          ★ 프리미엄 서비스
        </span>
      </div>

      {/* 본문: 사진 + 정보 */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        {/* 사진 영역 */}
        <div style={{
          width: "72px", height: "72px", flexShrink: 0,
          borderRadius: "8px",
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
        }}>
          <img
            src="/premium_photo.png"
            alt={obituary.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,215,0,0.4)" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>';
            }}
          />
        </div>

        {/* 정보 영역 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.4 }}>
                故 {obituary.name}
              </h3>
              <p style={{ fontSize: "13px", fontWeight: 300, color: "#ccc", marginTop: "2px" }}>
                향년 {obituary.age}세
              </p>
            </div>
            <div style={{ flexShrink: 0, textAlign: "right" }}>
              <p style={{ fontSize: "10px", color: "rgba(255,215,0,0.6)", margin: 0, fontWeight: 500, letterSpacing: "0.08em" }}>발인</p>
              <p style={{ fontSize: "14px", color: "#FFD700", fontWeight: 500, margin: "3px 0 0", fontVariantNumeric: "tabular-nums" }}>
                {obituary.funeral_date}
              </p>
            </div>
          </div>

          <div style={{ marginTop: "8px", display: "flex", alignItems: "center", fontSize: "13px", color: "#9ca3af", fontWeight: 300 }}>
            <svg style={{ width: "13px", height: "13px", marginRight: "5px", flexShrink: 0 }}
              fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {obituary.funeral_hall}
          </div>
        </div>
      </div>

      {/* 태그 */}
      <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {obituary.tags.map((tag, i) => (
          <span key={i} style={{
            padding: "4px 10px", borderRadius: "4px",
            backgroundColor: "rgba(255, 215, 0, 0.08)",
            border: "1px solid rgba(255, 215, 0, 0.15)",
            color: "rgba(255, 215, 0, 0.7)",
            fontSize: "11px", fontWeight: 400,
          }}>{tag}</span>
        ))}
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════
   ObituaryCard
   ═══════════════════════════════════════════ */
function ObituaryCard({ obituary, onClick, index }) {
  return (
    <button onClick={() => onClick(obituary)}
      style={{
        width: "100%", textAlign: "left",
        backgroundColor: "rgba(255,255,255,0.025)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "4px 16px 4px 16px",
        padding: "22px 24px",
        cursor: "pointer", fontFamily: "inherit",
        transition: "all 0.3s ease",
        animation: `fadeUp 0.35s ease ${index * 0.025}s both`,
        marginBottom: "10px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.055)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* 상단: 이름 + 발인일 */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0, lineHeight: 1.4, letterSpacing: "-0.01em", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span>故 {obituary.name}</span>
            <span style={{ fontSize: "13px", fontWeight: 300, color: "#9ca3af" }}>
              향년 {obituary.age}세
            </span>
            {obituary.isUnclaimed && (
              <span style={{
                padding: "1px 7px",
                borderRadius: "3px",
                backgroundColor: "rgba(251, 146, 60, 0.15)",
                border: "1px solid rgba(251, 146, 60, 0.3)",
                color: "#fb923c",
                fontSize: "11px", fontWeight: 600,
                letterSpacing: "0.02em",
                lineHeight: "18px",
              }}>
                무연고
              </span>
            )}
          </h3>
        </div>
        <div style={{ marginLeft: "16px", flexShrink: 0, textAlign: "right" }}>
          <p style={{ fontSize: "10px", color: "#888", margin: 0, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>발인</p>
          <p style={{ fontSize: "14px", color: "#a0a0a0", fontWeight: 400, margin: "3px 0 0", fontVariantNumeric: "tabular-nums" }}>
            {obituary.funeral_date}
          </p>
        </div>
      </div>

      {/* 중간: 장례식장 */}
      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", fontSize: "13px", color: "#9ca3af", fontWeight: 300 }}>
        <svg style={{ width: "13px", height: "13px", marginRight: "5px", flexShrink: 0 }}
          fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {obituary.funeral_hall}
      </div>

      {/* 하단: 다중 배지 태그 */}
      <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {obituary.tags.map((tag, i) => (
          <span key={i} style={{
            padding: "4px 10px",
            borderRadius: "4px",
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#aaa",
            fontSize: "11px", fontWeight: 400,
            letterSpacing: "0.01em",
            transition: "all 0.2s",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════
   Pagination
   ═══════════════════════════════════════════ */
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2px", marginTop: "48px" }}>
      {/* Prev */}
      <button onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1}
        style={{
          width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
          background: "none", border: "none",
          color: current === 1 ? "#2a2a2a" : "#777",
          cursor: current === 1 ? "default" : "pointer",
          borderRadius: "8px", transition: "all 0.2s", fontFamily: "inherit",
        }}>
        <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)}
          style={{
            width: "40px", height: "40px",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: p === current ? "#fff" : "none",
            color: p === current ? "#000" : "#9ca3af",
            border: "none", borderRadius: "8px",
            fontSize: "14px", fontWeight: p === current ? 600 : 400,
            cursor: "pointer", transition: "all 0.25s ease", fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { if (p !== current) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"; }}
          onMouseLeave={(e) => { if (p !== current) e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total}
        style={{
          width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center",
          background: "none", border: "none",
          color: current === total ? "#2a2a2a" : "#777",
          cursor: current === total ? "default" : "pointer",
          borderRadius: "8px", transition: "all 0.2s", fontFamily: "inherit",
        }}>
        <svg style={{ width: "14px", height: "14px" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   InfoItem
   ═══════════════════════════════════════════ */
function InfoItem({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: "11px", color: "#555", marginBottom: "4px", fontWeight: 500, letterSpacing: "0.06em" }}>{label}</p>
      <p style={{ fontSize: "14px", color: "#ddd", margin: 0, fontWeight: 400 }}>{value}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ObituaryModal
   ═══════════════════════════════════════════ */
function ObituaryModal({ obituary, onClose }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!obituary) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "16px",
      backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(16px)",
      animation: "overlayIn 0.25s ease both",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: "#111", borderRadius: "4px 16px 4px 16px",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto",
        animation: "modalIn 0.35s ease both",
      }}>
        {/* Header */}
        <div style={{ position: "relative", padding: "32px 28px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={onClose} style={{
            position: "absolute", top: "16px", right: "16px",
            width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "#555",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}>
            <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "52px", height: "52px", borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.05)", marginBottom: "16px",
            }}>
              <svg style={{ width: "24px", height: "24px", color: "#666" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>故 {obituary.name}</h2>
            <p style={{ fontSize: "14px", color: "#777", marginTop: "6px", fontWeight: 300 }}>향년 {obituary.age}세</p>
            {/* 태그 */}
            <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px" }}>
              {obituary.tags.map((tag, i) => (
                <span key={i} style={{
                  padding: "3px 10px", borderRadius: "4px",
                  backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.06)",
                  color: "#999", fontSize: "11px", fontWeight: 400,
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ padding: "24px 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <InfoItem label="장례식장" value={obituary.funeral_hall} />
            <InfoItem label="발인일시" value={obituary.funeral_date} />
          </div>
          <div style={{
            marginTop: "20px", borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", fontSize: "13px", color: "#777", marginBottom: "8px" }}>
              <svg style={{ width: "14px", height: "14px", marginRight: "6px" }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              오시는 길
            </div>
            <p style={{ fontSize: "14px", color: "#ddd", margin: 0 }}>{obituary.funeral_hall}</p>
          </div>
        </div>

        {/* Memorial */}
        <div style={{ padding: "12px 28px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 style={{ fontSize: "12px", fontWeight: 500, color: "#777", marginBottom: "12px", letterSpacing: "0.04em" }}>추모 메시지 남기기</h3>
          <form onSubmit={handleSubmit}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="고인의 명복을 빕니다..." rows={3}
              style={{
                width: "100%", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.03)", padding: "12px", fontSize: "14px",
                color: "#ddd", resize: "none", outline: "none", boxSizing: "border-box",
                fontFamily: "inherit", transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
              <button type="submit" style={{
                flex: 1, padding: "11px 16px", borderRadius: "8px",
                backgroundColor: "#fff", color: "#000",
                fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer",
                transition: "opacity 0.2s", fontFamily: "inherit",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                {submitted ? "메시지가 전달되었습니다" : "추모 메시지 전달"}
              </button>
              <button type="button" style={{
                padding: "11px 20px", borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)", backgroundColor: "transparent",
                color: "#aaa", fontSize: "14px", fontWeight: 500, cursor: "pointer",
                transition: "all 0.2s", fontFamily: "inherit",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#aaa"; }}>
                조의금 전달
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   App
   ═══════════════════════════════════════════ */
export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  /* 프리미엄 데이터 분리 */
  const premiumItem = useMemo(() => obituaries.find((o) => o.isPremium), []);
  const regularItems = useMemo(() => obituaries.filter((o) => !o.isPremium), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return regularItems;
    const q = query.trim().toLowerCase();
    return regularItems.filter((o) =>
      o.name.toLowerCase().includes(q) ||
      o.tags.some((t) => t.toLowerCase().includes(q)) ||
      o.funeral_hall.toLowerCase().includes(q)
    );
  }, [query, regularItems]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(page, totalPages || 1);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleQueryChange = (val) => { setQuery(val); setPage(1); };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at center, #1a1a1c 0%, #000000 100%)",
      backgroundAttachment: "fixed",
    }}>
      {/* Header */}
      <header style={{ paddingTop: "64px", paddingBottom: "0", paddingLeft: "20px", paddingRight: "20px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <h1
            onClick={() => { setQuery(""); setPage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{
              fontSize: "44px", fontWeight: 700, color: "#ffffff",
              letterSpacing: "-0.04em", margin: 0, lineHeight: 1,
              display: "inline-flex", alignItems: "center", gap: "10px",
              cursor: "pointer",
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.01)"; e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.opacity = "1"; }}
          >
            <svg
              width="44" height="44" viewBox="0 0 44 44" fill="none"
              style={{ flexShrink: 0 }}
            >
              {/* 외부 원 - 반투명 */}
              <circle cx="22" cy="22" r="20" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
              {/* 내부 글로우 */}
              <circle cx="22" cy="22" r="12" fill="rgba(255,255,255,0.04)" />
              {/* 중심 음파 - 3개 동심원 */}
              <circle cx="22" cy="22" r="5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" fill="none" />
              <circle cx="22" cy="22" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
              <circle cx="22" cy="22" r="13" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" />
              {/* 중심 점 */}
              <circle cx="22" cy="22" r="2" fill="#ffffff" />
            </svg>
            Echoes
          </h1>
          <p style={{
            fontSize: "14px", fontWeight: 300, color: "#9ca3af",
            marginTop: "12px", letterSpacing: "0.02em", lineHeight: 1.6,
          }}>
            소식이 끊긴 옛 우정의 마지막을 함께 하세요
          </p>
          <div style={{ marginTop: "24px" }}>
            <SearchBar query={query} onChange={handleQueryChange} />
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px 100px" }}>
        {/* Top Keywords */}
        <TopKeywords onSelect={handleQueryChange} activeKeyword={query} />

        {/* Count bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: "16px", paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0, fontWeight: 400 }}>
            {query.trim() ? `검색 결과 ${filtered.length}건` : `전체 ${obituaries.length}건`}
          </p>
          {totalPages > 1 && (
            <p style={{ fontSize: "12px", color: "#3a3a3a", margin: 0, fontWeight: 300 }}>
              {safePage} / {totalPages}
            </p>
          )}
        </div>

        {/* Premium Card - 검색어 없는 초기 상태 & 1페이지에서만 노출 */}
        {premiumItem && !query.trim() && safePage === 1 && (
          <PremiumCard obituary={premiumItem} onClick={setSelected} />
        )}

        {/* Card List */}
        {paged.length > 0 ? (
          <div key={`${query}-${safePage}`}>
            {paged.map((o, i) => (
              <ObituaryCard key={o.id} obituary={o} onClick={setSelected} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", paddingTop: "80px", paddingBottom: "80px", animation: "fadeUp 0.4s ease both" }}>
            <svg style={{ width: "36px", height: "36px", margin: "0 auto 16px", color: "#333" }}
              fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p style={{ color: "#555", fontSize: "14px", fontWeight: 300 }}>
              찾으시는 인연의 소식이 아직 등록되지 않았습니다
            </p>
          </div>
        )}

        {paged.length > 0 && (
          <Pagination current={safePage} total={totalPages}
            onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        padding: "12px 0", textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <p style={{ fontSize: "11px", color: "#3a3a3a", margin: 0, fontWeight: 300 }}>&copy; 2026 Echoes</p>
      </footer>

      {/* Modal */}
      {selected && <ObituaryModal obituary={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
