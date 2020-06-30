import React from "react";
import rice from "../../../images/rice.png";

export default function Menu(props) {
  const menus = props.menus;
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>대표메뉴</h3>
      <div style={{ border: "1px solid gray", padding: 10 }}>
        {menus.map((menu) => (
          <div key={menu.id} style={{ letterSpacing: 2, lineHeight: 2 }}>
            <img
              src={rice}
              alt="rice"
              style={{ height: 20, marginRight: 10 }}
            />
            {menu.menu_name}: {menu.price}원
          </div>
        ))}
      </div>
    </div>
  );
}
