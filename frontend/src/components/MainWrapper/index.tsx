import React from 'react';
import st from "./wrapper.module.css";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={st.wrapper}>
    {children}
  </div>;
}
