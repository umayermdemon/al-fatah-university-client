const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "/admin/create-admin",
        element: "",
      },
      {
        name: "Create Faculty",
        path: "/admin/create-faculty",
        element: "",
      },
      {
        name: "Create Student",
        path: "/admin/create-student",
        element: "",
      },
    ],
  },
];

const sidebarRoutes = adminPaths.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: "Navlink",
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((item) => ({
        key: item.name,
        label: "Navlink",
      })),
    });
  }
  return acc;
}, []);

console.log(JSON.stringify(sidebarRoutes));
