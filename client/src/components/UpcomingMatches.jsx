import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./UpcomingMatches.css";

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch matches:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading upcoming matches...</div>;
  }

  if (!matches.length) {
    return <div className="loading">No matches found.</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Upcoming Soccer Matches</h1>
      <p className="timezone-note">
        All times are shown in your local time zone:{" "}
        {Intl.DateTimeFormat().resolvedOptions().timeZone}
      </p>
      <div className="match-list">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            className="match-card"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="teams">
              {match.homeTeam.name} <span>vs</span> {match.awayTeam.name}
            </h2>
            <p className="match-date">
              {new Date(match.utcDate).toLocaleString(undefined, {
                timeZoneName: "short",
              })}
            </p>
            <p className="match-competition">{match.competition.name}</p>
            <p className="match-status">Status: {match.status}</p>
            {match.group && <p className="match-group">Group: {match.group}</p>}
            <p className="match-stage">Stage: {match.stage}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
