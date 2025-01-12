import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/sidebar.types";

const sidebarGenerator = (items: TUserPath[], role: string) => {
  const sidebarRoutes = items.reduce((acc: TSidebarItem[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((item) => ({
          key: item.name,
          label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        })),
      });
    }
    return acc;
  }, []);
  return sidebarRoutes;
};

export default sidebarGenerator;
