
import React from 'react';

export default function Hotspot({ s, onOpen }) {
    return (
        <button
            type="button"
            className="hotspot"
            style={{ left: s.pos.x + '%', top: s.pos.y + '%', transform: 'translate(-50%, -50%)' }}
            onClick={onOpen}
        >
            <div className="glyph"
                style={{
                    WebkitMaskImage: `url(${s.silhouette})`,
                    maskImage: `url(${s.silhouette})`
                }}
            />
            <div className="label">{s.name}</div>
        </button>
    );
}
