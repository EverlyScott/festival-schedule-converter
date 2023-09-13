import React from "react";

export type Layout<P = undefined> = (props: { children: React.ReactNode; params?: P }) => JSX.Element;
