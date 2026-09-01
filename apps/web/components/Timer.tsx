"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Plus, Minus, Play, Pause, Square } from "lucide-react";
import { useState, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";

export default function Timer() {
  const [timeSeconds, setTimeSeconds] = useState(25 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

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

  return (
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
            size={{ xs: "6rem", sm: "8rem", md: "10rem" } as any}
            thickness={3}
          />
          <Box
            sx={{
              position: "absolute",
              inset: "0",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              {formatTime(secondsLeft)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label="min"
            type="number"
            value={minutes}
            onChange={(e) =>
              setTimeSeconds(Number(e.target.value) * 60 + seconds)
            }
          />
          <Typography variant="h6">:</Typography>
          <TextField
            label="sec"
            type="number"
            value={seconds}
            onChange={(e) =>
              setTimeSeconds(minutes * 60 + Number(e.target.value))
            }
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
  );
}
