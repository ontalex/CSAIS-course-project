import React from 'react';

import st from "./header.module.css";

export default function Header({children}:{children: React.ReactNode}) {
  return (
    <div className={st.header_box}>
      <h1 className={st.text}>{children}</h1>
    </div>
  )
}
