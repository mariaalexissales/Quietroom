"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { Play, Pause, Square, X } from "lucide-react";
import React, { useState, useEffect } from "react";

import type { ResourceEntry } from "../app/api/resources/resources";

export default function Timer() {
  const [timeSeconds, setTimeSeconds] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [resources, setResources] = useState<ResourceEntry[] | null>(null);

  useEffect(() => {
    if (isFlipped && resources === null) {
      fetch("/api/resources")
        .then((res) => res.json())
        .then((data) => setResources(data));
    }
  }, [isFlipped, resources]);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handlePlay = () => {
    if (isRunning) setSecondsLeft(timeSeconds);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSecondsLeft(timeSeconds);
  };

  const secondsToParts = (totalSeconds: number) => ({
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  });

  const formatTime = (totalSeconds: number) => {
    const { minutes, seconds } = secondsToParts(totalSeconds);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const { minutes, seconds } = secondsToParts(timeSeconds);

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const ringSize = isMdUp ? "10rem" : isSmUp ? "8rem" : "6rem";

  return (
    <Box sx={{ perspective: "1200px" }}>
      <Box
        sx={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "0.6s",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <Box sx={{ backfaceVisibility: "hidden" }}>
          <Card
            variant="outlined"
            sx={{ justifySelf: "center", padding: { xs: "12px", sm: "24px" } }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "inline-flex",
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={(secondsLeft / timeSeconds) * 100}
                  size={ringSize}
                  thickness={3}
                />
                <Box
                  onClick={() => setIsFlipped((prev) => !prev)}
                  sx={{
                    position: "absolute",
                    inset: "0",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                  >
                    {formatTime(secondsLeft)
                      .split(":")
                      .map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span style={{ color: "var(--teal)" }}>:</span>
                          )}
                        </React.Fragment>
                      ))}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  label="min"
                  type="number"
                  value={minutes}
                  onChange={(e) => {
                    const newTotal = Number(e.target.value) * 60 + seconds;
                    setTimeSeconds(newTotal);
                    if (!isRunning) setSecondsLeft(newTotal);
                  }}
                />
                <Typography variant="h6">:</Typography>
                <TextField
                  label="sec"
                  type="number"
                  value={seconds}
                  onChange={(e) => {
                    const newTotal = minutes * 60 + Number(e.target.value);
                    setTimeSeconds(newTotal);
                    if (!isRunning) setSecondsLeft(newTotal);
                  }}
                />
              </Box>
              <Box>
                <ButtonGroup>
                  <Button onClick={handlePlay} disabled={isRunning}>
                    <Play />
                  </Button>
                  <Button onClick={handlePause} disabled={!isRunning}>
                    <Pause />
                  </Button>
                  <Button onClick={handleStop} disabled={!isRunning}>
                    <Square />
                  </Button>
                </ButtonGroup>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Card variant="outlined" sx={{ padding: { xs: "12px", sm: "24px" } }}>
            <CardContent>
              {resources === null ? (
                <Typography>Loading...</Typography>
              ) : (
                resources.map((r) => (
                  <Box key={r.label} sx={{ marginBottom: 1 }}>
                    <Typography variant="subtitle2">{r.label}</Typography>
                    <Typography variant="body2">{r.call}</Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
