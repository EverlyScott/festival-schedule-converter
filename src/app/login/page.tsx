"use client";

import { schedulePortal } from "@/endpoints";
import { TextField, Button, Typography, Link, Paper, useTheme, IconButton } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { LoginResponse } from "../api/login/route";
import { Close } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { tokenAtom } from "@/atoms";

const Login: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [token, setToken] = useRecoilState(tokenAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = async () => {
    router.prefetch("/");
    setError(undefined);
    setLoading(true);
    const res = await axios.post<LoginResponse>("/api/login", {
      email,
      password,
    });
    setLoading(false);

    if (res.data.status === "success") {
      setToken(res.data.sessionToken);
      router.push("/");
    } else {
      setError(res.data.errorMessage);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          textAlign: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "350px",
        }}
      >
        <span style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          {error && (
            <Paper
              sx={{
                backgroundColor: theme.palette.error[theme.palette.mode],
                color: theme.palette.getContrastText(theme.palette.error[theme.palette.mode]),
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ flexGrow: 1 }}>{error}</Typography>
              <IconButton
                sx={{ color: theme.palette.getContrastText(theme.palette.error[theme.palette.mode]) }}
                onClick={() => {
                  setError(undefined);
                }}
              >
                <Close />
              </IconButton>
            </Paper>
          )}
          <TextField label="Email" type="email" value={email} onChange={handleEmailChange} fullWidth />
          <TextField label="Password" type="password" value={password} onChange={handlePasswordChange} fullWidth />
          <div style={{ display: "flex" }}>
            <Button href={`${schedulePortal}/register`} target="_blank">
              Register
            </Button>
            <div style={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              disabled={loading || email.length < 1 || password.length < 1}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
        </span>
        <div style={{ textAlign: "left", alignSelf: "flex-start", marginTop: 32 }}>
          <Typography fontWeight="bold">What do I enter here?</Typography>
          <Typography>
            Enter your email and password for the{" "}
            <Link href={schedulePortal} target="_blank">
              schedule&nbsp;portal
            </Link>
            .
          </Typography>
          <br />
          <Typography fontWeight="bold">Is my information safe?</Typography>
          <Typography>
            Your browser will contact our servers and our servers will directly forward the information to Festival's
            servers. Your information will never be stored outside of your web browser.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Login;
