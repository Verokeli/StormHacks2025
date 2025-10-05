import React from 'react';

export default function InfoCard({ data, onClose }) {
    return (
        <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="card">
                <h2>{data.name}</h2>
                <img src={data.figure} alt={data.name} className="figure" />
                <p>{data.story}</p>
                <small>Source: {data.source}</small>
                <button type="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
