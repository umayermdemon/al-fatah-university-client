import { ReactNode } from "react";
import { TUserPath } from "../types/sidebar.type";

type TRoute = {
  path: string;
  element: ReactNode;
};

const routesGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item?.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.forEach((item) => {
        acc.push({
          path: item.path as string,
          element: item.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};

export default routesGenerator;
