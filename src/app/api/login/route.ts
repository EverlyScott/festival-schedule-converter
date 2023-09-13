import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { schedulePortal } from "@/endpoints";
import { parse as parseHtml } from "node-html-parser";
import { parse as parseCookies } from "cookie";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: "error" | "success";
  sessionToken?: string;
  errorMessage?: string;
}

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password }: LoginBody = await req.json();

  const loginPage = parseHtml((await axios.get(`${schedulePortal}/login`)).data);

  const utf8 = loginPage.querySelector('input[name="utf8"]')?.getAttribute?.("value");
  const authenticity_token = loginPage.querySelector('input[name="authenticity_token"]')?.getAttribute("value");

  const newBody = {
    utf8,
    authenticity_token,
    email: email,
    password: password,
  };

  try {
    const sessionRes = await axios.post(`${schedulePortal}/sessions`, newBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      maxRedirects: 0,
    });

    switch (sessionRes.status) {
      case 200: {
        const loginPage = parseHtml(sessionRes.data);
        return NextResponse.json<LoginResponse>({
          status: "error",
          errorMessage:
            loginPage.querySelector("div.alert.fade.in.alert-error")?.innerText.substring(7) ??
            "Unknown Error Occurred!",
        });
      }
      case 302: {
        return NextResponse.json<LoginResponse>({
          status: "success",
          sessionToken: parseCookies(sessionRes.headers["set-cookie"]![1])._web_portal_session,
        });
      }
    }
  } catch (err: any) {
    if (err.response.headers["set-cookie"]![1]) {
      return NextResponse.json<LoginResponse>({
        status: "success",
        sessionToken: parseCookies(err.response.headers["set-cookie"]![1])._web_portal_session,
      });
    } else {
      return NextResponse.json<LoginResponse>({
        status: "error",
        errorMessage: "Unknown Error Occurred!",
      });
    }
  }
};
