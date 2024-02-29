"use client";
import React, { useState } from "react";
import Link from "next/link";

const AdminSidebar = () => {
  const menuItem = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "Rooms",
      url: "/admin/rooms",
      icon: "fas fa-hotel",
    },
    {
      name: "Bookings",
      url: "/admin/bookings",
      icon: "fas fa-user",
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fas fa-receipt",
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: "fas fa-star",
    },
  ];

  const [activeMenu, setActiveMenu] = useState(menuItem[0].name);

  const handlerMenuItemClick = (menuItem: string) => {
    setActiveMenu(menuItem);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItem.map((menItem, index) => (
        <Link
          key={index}
          href={menItem.url}
          className={`fw-bold list-group-item list-group-item-action ${
            activeMenu === menItem.name ? "active" : ""
          }`}
          onClick={() => handlerMenuItemClick(menItem.name)}
          aria-current={activeMenu === menItem.name ? "true" : "false"}
        >
          <i className={`${menItem.icon} fa-fw pe-2`}></i> {menItem.name}
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
