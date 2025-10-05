import React from 'react';
import '../styles/scene.css'; // small styles included below

export default function Toggle({ isPast, setIsPast }) {
    return (
        <div className="then-now-toggle" role="group" aria-label="Then or Now toggle">
            <button
                type="button"
                className={`toggle-btn ${isPast ? 'active' : ''}`}
                onClick={() => setIsPast(true)}
            >
                Then
            </button>
            <button
                type="button"
                className={`toggle-btn ${!isPast ? 'active' : ''}`}
                onClick={() => setIsPast(false)}
            >
                Now
            </button>
        </div>
    );
}
