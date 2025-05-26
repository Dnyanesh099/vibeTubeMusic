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
}) {
  return (
    <aside
      style={{
        width: 320,
        borderRight: `1px solid ${themeColors.border}`,
        backgroundColor: themeColors.sidebarBg,
        display: "flex",
        flexDirection: "column",
        padding: "12px 16px",
        boxSizing: "border-box",
        overflowY: "auto",
        scrollbarWidth: "auto",
        scrollbarColor: `${themeColors.scrollbarThumb} transparent`,
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
        }}
      >
        <div
          style={{
            marginBottom: 16,
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
      </div>

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
      onClick={() => setSelectedSong({ title, videoId })}
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

function Player({ selectedSong, themeColors }) {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // Added to stack logo and text vertically
        backgroundColor: themeColors.background,
        padding: 24,
        boxSizing: "border-box",
      }}
    >
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
          <img src={`${process.env.PUBLIC_URL}/favicon.svg`} alt="App Logo"
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
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const themeColors = colors[theme];

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/music")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setMusicList(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
      );
    },
    [setFavorites]
  );

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredList = useMemo(() => {
    const filtered = musicList.filter(({ title, id }) => {
      if (showOnlyFavorites && !favorites.includes(id)) return false;
      return title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });
    return filtered;
  }, [musicList, debouncedSearchTerm, favorites, showOnlyFavorites]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: themeColors.background,
        color: themeColors.text,
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
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
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <main
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
              color: themeColors.text,
            }}
          >
            Loading songs...
          </main>
        ) : error ? (
          <main
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
              color: "red",
            }}
          >
            Error: {error}
          </main>
        ) : (
          <Player selectedSong={selectedSong} themeColors={themeColors} />
        )}
      </div>
    </div>
  );
}

export default YouTubeStyleMusic;