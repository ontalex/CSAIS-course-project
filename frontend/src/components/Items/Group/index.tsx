import React from 'react'
import st from '../style.module.css';

export default function GroupsItem(data) {
  return (
    <div className={st.item}>
        <p className={st.item_name}>{data.name}</p>
    </div>
  )
}
