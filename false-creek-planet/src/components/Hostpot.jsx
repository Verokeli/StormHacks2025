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
            }}
        >
            <img
                src={s.silhouette}
                alt={s.name}
                className="glyph"
            />
        </button>
    );
}
