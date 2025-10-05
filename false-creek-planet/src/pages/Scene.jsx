import React, { useEffect, useState } from 'react';
import Hotspot from '../components/Hostpot.jsx'; // your file is named Hostpot.jsx in the project tree
import InfoCard from '../components/InfoCard.jsx';
import Toggle from '../components/Toggle.jsx';
import '../styles/scene.css';

export default function Scene() {
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [isPast, setIsPast] = useState(true);

    useEffect(() => {
        let mounted = true;
        fetch('/data/species.json')
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch species.json: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (!mounted) return;
                setSpecies(data);
                setLoading(false);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err.message);
                setLoading(false);
            });

        return () => { mounted = false; };
    }, []);

    if (loading) {
        return (
            <main className="scene">
                <div className="loading">Loading species…</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="scene">
                <div className="error">Error loading species: {error}</div>
            </main>
        );
    }

    return (
        <main className={`scene ${isPast ? 'scene--past' : 'scene--present'}`}>
            <header className="scene__header">
                <h1>False Creek Planet</h1>
                <Toggle isPast={isPast} setIsPast={setIsPast} />
            </header>

            {/* hotspots (positioned absolutely using s.pos.x / s.pos.y) */}
            {species.map((s, idx) => (
                <Hotspot key={s.name ?? idx} s={s} onOpen={() => setSelected(s)} />
            ))}

            {/* Info card modal */}
            {selected && <InfoCard data={selected} onClose={() => setSelected(null)} />}
        </main>
    );
}
