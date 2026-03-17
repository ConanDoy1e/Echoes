import { useState, useMemo } from "react";
import obituaries from "./obituaries.json";

/* ── SearchBar ── */
function SearchBar({ query, onChange }) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "576px", margin: "0 auto" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          paddingLeft: "16px",
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <svg
          style={{ width: "24px", height: "24px", color: "#9ca3af" }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이름, 소속(학교/직장), 지역으로 검색..."
        style={{
          width: "100%",
          paddingLeft: "56px",
          paddingRight: "48px",
          paddingTop: "16px",
          paddingBottom: "16px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          backgroundColor: "#fff",
          color: "#1f2937",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          fontFamily: "inherit",
        }}
      />
      {query && (
        <button
          onClick={() => onChange("")}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            paddingRight: "16px",
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9ca3af",
          }}
        >
          <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ── ObituaryCard ── */
function ObituaryCard({ obituary, onClick }) {
  return (
    <button
      onClick={() => onClick(obituary)}
      style={{
        width: "100%",
        textAlign: "left",
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "20px",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#111827", margin: 0 }}>
            故 {obituary.name}
            <span style={{ marginLeft: "8px", fontSize: "14px", fontWeight: 400, color: "#9ca3af" }}>
              향년 {obituary.age}세
            </span>
          </h3>
          <p style={{ marginTop: "4px", fontSize: "14px", color: "#6b7280" }}>{obituary.affiliation}</p>
        </div>
        <div style={{ marginLeft: "16px", flexShrink: 0, textAlign: "right" }}>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>발인</p>
          <p style={{ fontSize: "14px", color: "#4b5563", fontWeight: 500, margin: "2px 0 0" }}>{obituary.funeral_date}</p>
        </div>
      </div>
      <div style={{ marginTop: "12px", display: "flex", alignItems: "center", fontSize: "12px", color: "#9ca3af" }}>
        <svg
          style={{ width: "14px", height: "14px", marginRight: "4px" }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {obituary.funeral_hall}
      </div>
    </button>
  );
}

/* ── InfoItem (모달 내부 사용) ── */
function InfoItem({ label, value }) {
  return (
    <div>
      <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "2px" }}>{label}</p>
      <p style={{ fontSize: "14px", color: "#374151", margin: 0 }}>{value}</p>
    </div>
  );
}

/* ── ObituaryModal ── */
function ObituaryModal({ obituary, onClose }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!obituary) return null;

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmitted(true);
      setMessage("");
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: "512px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ position: "relative", padding: "24px 24px 16px", borderBottom: "1px solid #f3f4f6" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#9ca3af",
            }}
          >
            <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "#f9fafb",
                marginBottom: "16px",
              }}
            >
              <svg style={{ width: "32px", height: "32px", color: "#9ca3af" }} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#111827", margin: 0 }}>故 {obituary.name}</h2>
            <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>향년 {obituary.age}세</p>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <InfoItem label="소속" value={obituary.affiliation} />
            <InfoItem label="지역" value={obituary.location} />
            <InfoItem label="장례식장" value={obituary.funeral_hall} />
            <InfoItem label="발인일시" value={obituary.funeral_date} />
          </div>

          {/* Location placeholder */}
          <div
            style={{
              marginTop: "16px",
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
              <svg style={{ width: "16px", height: "16px", marginRight: "6px" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              오시는 길
            </div>
            <p style={{ fontSize: "14px", color: "#374151", margin: 0 }}>{obituary.funeral_hall}</p>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>{obituary.location}</p>
          </div>
        </div>

        {/* Memorial message */}
        <div style={{ padding: "8px 24px 24px", borderTop: "1px solid #f3f4f6" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>추모 메시지 남기기</h3>
          <form onSubmit={handleSubmitMessage}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="고인의 명복을 빕니다..."
              rows={3}
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                padding: "12px",
                fontSize: "14px",
                color: "#374151",
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {submitted ? "메시지가 전달되었습니다" : "추모 메시지 전달"}
              </button>
              <button
                type="button"
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "transparent",
                  color: "#4b5563",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                조의금 전달
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── App (메인) ── */
export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return obituaries.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.affiliation.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q)
    );
  }, [query]);

  const showResults = query.trim().length > 0;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header style={{ paddingTop: "80px", paddingBottom: "40px", paddingLeft: "16px", paddingRight: "16px" }}>
        <div style={{ maxWidth: "672px", margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "48px",
              fontWeight: 700,
              color: "#374151",
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Echoes
          </h1>
          <p
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "16px",
              color: "#9ca3af",
              marginTop: "12px",
            }}
          >
            마지막 안부를 전하는 곳
          </p>
          <div style={{ marginTop: "32px" }}>
            <SearchBar query={query} onChange={setQuery} />
          </div>
          <p style={{ marginTop: "12px", fontSize: "12px", color: "#d1d5db" }}>
            인연의 잔향을 찾아보세요
          </p>
        </div>
      </header>

      {/* Results */}
      <main style={{ maxWidth: "672px", margin: "0 auto", padding: "0 16px 80px" }}>
        {showResults && results.length > 0 && (
          <>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "16px" }}>
              검색 결과 {results.length}건
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {results.map((o) => (
                <ObituaryCard key={o.id} obituary={o} onClick={setSelected} />
              ))}
            </div>
          </>
        )}

        {showResults && results.length === 0 && (
          <div style={{ textAlign: "center", paddingTop: "80px", paddingBottom: "80px" }}>
            <svg
              style={{ width: "48px", height: "48px", margin: "0 auto 16px", color: "#e5e7eb" }}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p style={{ fontFamily: "'Noto Serif KR', serif", color: "#9ca3af", fontSize: "14px" }}>
              찾으시는 인연의 소식이 아직 등록되지 않았습니다
            </p>
          </div>
        )}

        {!showResults && (
          <div style={{ textAlign: "center", paddingTop: "64px", paddingBottom: "64px" }}>
            <p style={{ color: "#d1d5db", fontSize: "14px" }}>
              이름, 소속, 지역을 검색하여 부고를 찾을 수 있습니다
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 0",
          textAlign: "center",
          backgroundColor: "rgba(249,250,251,0.8)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <p style={{ fontSize: "12px", color: "#d1d5db", margin: 0 }}>
          &copy; 2026 Echoes. 마지막 안부를 전하는 서비스.
        </p>
      </footer>

      {/* Modal */}
      {selected && (
        <ObituaryModal obituary={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
