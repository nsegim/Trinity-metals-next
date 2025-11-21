
"use client"
import { usePathname } from "next/navigation";
import Link from "next/link"
import './Menu.css';
import RoutesConfig from "@/app/routes/routes";

const Menus = ({onItemClick}) => {
  const location = usePathname(); // Get the current URL path

  const routes = RoutesConfig()

  const renderMenu = (menuItems) =>
    menuItems.map((item, index) => {
      const isActive = location.pathname === item.path; // Check if this is the active link
      
      return (
        <li
          key={index}
          className={`menu-item ${item.children ? "has-children" : ""} ${isActive ? "active" : ""}`}
        >
          <Link className="the_link-item" href={item.path.startsWith('/') ? item.path : `#${item.path}`} onClick={onItemClick}>
            {item.name}
          </Link>
          {item.children && <ul className="dropdown">{renderMenu(item.children)}</ul>}
        </li>
      );
    });

  return (
    <nav className="menu">
      
      <ul className="menuWrapper">{renderMenu(routes)}</ul>
    </nav>
  );
};

export default Menus;
