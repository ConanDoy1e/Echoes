import { useState, useMemo } from "react";
import obituaries from "./data/obituaries.json";
import SearchBar from "./components/SearchBar";
import ObituaryCard from "./components/ObituaryCard";
import ObituaryModal from "./components/ObituaryModal";

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
      <main className="max-w-2xl mx-auto px-4 pb-20">
        {showResults && results.length > 0 && (
          <>
            <p className="text-xs text-gray-400 mb-4">
              검색 결과 {results.length}건
            </p>
            <div className="space-y-3">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
