import React, { useEffect, useState, useMemo, useCallback } from "react";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

const colors = {
  light: {
    background: "#fff",
    text: "#202020",
    sidebarBg: "#f9f9f9",
    border: "#ddd",
    inputBg: "#fff",
    inputBorder: "#ccc",
    inputFocusBorder: "#1a73e8",
    favActive: "#ea4335",
    scrollbarThumb: "#c2c2c2",
  },
  dark: {
    background: "#181818",
    text: "#e8e8e8",
    sidebarBg: "#202020",
    border: "#333",
    inputBg: "#121212",
    inputBorder: "#555",
    inputFocusBorder: "#8ab4f8",
    favActive: "#f28b82",
    scrollbarThumb: "#555",
  },
};

function Sidebar({
  themeColors,
  filteredList,
  favorites,
  toggleFavorite,
  selectedSong,
  setSelectedSong,
  searchTerm,
  setSearchTerm,
  toggleTheme,
  showOnlyFavorites,
  setShowOnlyFavorites,
  isMobile,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <aside
      style={{
        width: isMobile ? (sidebarOpen ? "80vw" : 0) : 320,
        borderRight: isMobile ? "none" : `1px solid ${themeColors.border}`,
        backgroundColor: themeColors.sidebarBg,
        display: "flex",
        flexDirection: "column",
        padding: isMobile ? (sidebarOpen ? "12px 16px" : 0) : "12px 16px",
        boxSizing: "border-box",
        overflowY: "auto",
        scrollbarWidth: "auto",
        scrollbarColor: `${themeColors.scrollbarThumb} transparent`,
        transition: "width 0.3s ease, padding 0.3s ease",
        position: isMobile ? "fixed" : "relative",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 1000,
        boxShadow: isMobile && sidebarOpen ? "2px 0 8px rgba(0,0,0,0.3)" : "none",
      }}
      className="sidebar-scrollbar"
    >
      {/* Sticky header container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: themeColors.sidebarBg,
          padding: "12px 16px 12px 16px",
          zIndex: 10,
          borderBottom: `1px solid ${themeColors.border}`,
          boxShadow:
            themeColors === colors.light
              ? "0 1px 2px rgba(0,0,0,0.1)"
              : "0 1px 2px rgba(0,0,0,0.8)",
          backdropFilter: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            marginRight: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: 8,
              fontSize: 14,
              borderRadius: 4,
              border: `1px solid ${themeColors.inputBorder}`,
              backgroundColor: themeColors.inputBg,
              color: themeColors.text,
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = themeColors.inputFocusBorder)
            }
            onBlur={(e) => (e.target.style.borderColor = themeColors.inputBorder)}
            aria-label="Search songs"
          />
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            title="Toggle dark/light theme"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 20,
              color: themeColors.text,
              userSelect: "none",
            }}
          >
            {themeColors === colors.light ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Removed Mobile close button as requested */}
      </div>

      <label
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          color: themeColors.text,
          fontSize: 14,
          userSelect: "none",
          whiteSpace: "nowrap",
          paddingLeft: isMobile ? 0 : undefined,
        }}
      >
        <input
          type="checkbox"
          checked={showOnlyFavorites}
          onChange={(e) => setShowOnlyFavorites(e.target.checked)}
          style={{ marginRight: 6 }}
          aria-checked={showOnlyFavorites}
        />
        Show only favorites
      </label>

      {filteredList.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: themeColors.text,
            opacity: 0.6,
            userSelect: "none",
          }}
        >
          No songs found
        </p>
      )}

      {filteredList.map(({ id, title, videoId, imageUrl }) => {
        const isFav = favorites.includes(id);
        return (
          <SongItem
            key={id}
            id={id}
            title={title}
            videoId={videoId}
            imageUrl={imageUrl}
            isFav={isFav}
            toggleFavorite={toggleFavorite}
            selected={selectedSong?.videoId === videoId}
            setSelectedSong={setSelectedSong}
            themeColors={themeColors}
            isMobile={isMobile}               // NEW
            setSidebarOpen={setSidebarOpen}   // NEW
          />
        );
      })}
    </aside>
  );
}

function SongItem({
  id,
  title,
  videoId,
  imageUrl,
  isFav,
  toggleFavorite,
  selected,
  setSelectedSong,
  themeColors,
  isMobile,             // NEW
  setSidebarOpen,       // NEW
}) {
  const [hovered, setHovered] = useState(false);
  const bgColor = selected
    ? themeColors === colors.light
      ? "#e3f2fd"
      : "#313131"
    : hovered
    ? themeColors === colors.light
      ? "#e8f0fe"
      : "#2c2c2c"
    : "transparent";

  const favColor = hovered
    ? isFav
      ? themeColors === colors.light
        ? "#d93025"
        : "#f28b82"
      : themeColors === colors.light
      ? "#555"
      : "#ccc"
    : isFav
    ? themeColors.favActive
    : "#aaa";

  return (
    <div
      onClick={() => {
        setSelectedSong({ title, videoId });
        if (isMobile) setSidebarOpen(false);  // CLOSE SIDEBAR ON MOBILE
      }}
      style={{
        display: "flex",
        cursor: "pointer",
        marginBottom: 12,
        gap: 12,
        alignItems: "center",
        padding: 6,
        borderRadius: 6,
        backgroundColor: bgColor,
        transition: "background-color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelectedSong({ title, videoId });
          if (isMobile) setSidebarOpen(false);
        }
      }}
      role="button"
      aria-pressed={selected}
      aria-label={`Select song: ${title}`}
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ width: 120, height: 68, objectFit: "cover", borderRadius: 6 }}
        loading="lazy"
      />
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: "500",
            color: themeColors.text,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={title}
        >
          {title}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(id);
        }}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        title={isFav ? "Remove from favorites" : "Add to favorites"}
        style={{
          border: "none",
          background: "none",
          cursor: "pointer",
          fontSize: 18,
          color: favColor,
          userSelect: "none",
          transition: "color 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          lineHeight: 1,
          width: "24px",
        }}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

function Player({ selectedSong, themeColors, isMobile, setSidebarOpen }) {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // stack logo and text vertically
        backgroundColor: themeColors.background,
        padding: 24,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            fontSize: 30,
            cursor: "pointer",
            border: "none",
            background: "none",
            color: themeColors.text,
            zIndex: 1100,
            userSelect: "none",
          }}
        >
          ☰
        </button>
      )}

      {selectedSong ? (
        <div
          style={{
            width: "100%",
            maxWidth: 800,
            aspectRatio: "16 / 9",
            boxShadow:
              themeColors === colors.light
                ? "0 4px 15px rgba(0,0,0,0.1)"
                : "0 4px 20px rgba(0,0,0,0.6)",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedSong.videoId}?autoplay=1`}
            title={selectedSong.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/favicon.svg`}
            alt="App Logo"
            style={{
              width: 170,
              height: 170,
              marginBottom: 24,
              userSelect: "none",
            }}
            loading="lazy"
          />
        </>
      )}
    </main>
  );
}

function YouTubeStyleMusic() {
  const [musicList, setMusicList] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [theme, setTheme] = useState(() => {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 640px)").matches
  );
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    // Fetch music list only once
    async function fetchList() {
      try {
        const res = await fetch("https://music-backendvibtube.onrender.com/music");
        const json = await res.json();
        setMusicList(json);
      } catch (e) {
        console.error("Failed to load music list:", e);
      }
    }
    fetchList();
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    function onResize() {
      const mobile = window.matchMedia("(max-width: 640px)").matches;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const themeColors = colors[theme];

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredList = useMemo(() => {
    const list = showOnlyFavorites
      ? musicList.filter((item) => favorites.includes(item.id))
      : musicList;
    if (!debouncedSearch) return list;

    const lower = debouncedSearch.toLowerCase();
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.videoId.toLowerCase().includes(lower)
    );
  }, [musicList, favorites, showOnlyFavorites, debouncedSearch]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: themeColors.background,
        color: themeColors.text,
        overflow: "hidden",
      }}
    >
      <Sidebar
        themeColors={themeColors}
        filteredList={filteredList}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toggleTheme={toggleTheme}
        showOnlyFavorites={showOnlyFavorites}
        setShowOnlyFavorites={setShowOnlyFavorites}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Player
        selectedSong={selectedSong}
        themeColors={themeColors}
        isMobile={isMobile}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}

export default YouTubeStyleMusic;
