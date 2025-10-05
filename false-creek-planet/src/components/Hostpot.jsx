import React from "react";

export default function Hotspot({ s, onOpen }) {
    return (
        <button
            type="button"
            className="hotspot"
            onClick={() => onOpen?.(s)}
            aria-label={s.name}
            style={{
                left: `${s.pos.x}%`,
                top: `${s.pos.y}%`,
                transform: "translate(-50%, -50%)",
                position: "absolute",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
            }}
        >
            {/* silhouette image */}
            <img
                src={s.silhouette}
                alt={s.name}
                className="glyph"
            />

            {/* label text */}
            <div className="label">{s.name}</div>
        </button>
    );
}
