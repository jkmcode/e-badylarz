import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export const navItems = [
  {
    id: 1,
    icon: (
      <Icon
        icon="material-symbols:home-outline"
        color="white"
        width="32"
        height="32"
      />
    ),
    path: "",
    name: "home",
  },
  {
    id: 2,
    icon: (
      <Icon icon="ic:outline-favorite" color="white" width="32" height="32" />
    ),
    path: "favorite",
    name: "favorite",
  },
  {
    id: 3,
    icon: <Icon icon="gg:profile" color="white" width="32" height="32" />,
    path: "profile",
    name: "profile",
  },
  {
    id: 4,
    icon: (
      <Icon
        icon="ic:sharp-shopping-cart-checkout"
        color="white"
        width="32"
        height="32"
      />
    ),
    path: "cart",
    name: "cart",
  },
  {
    id: 5,
    icon: (
      <Icon icon="pajamas:hamburger" color="white" width="32" height="32" />
    ),
    path: "#",
    name: "hamburger",
  },
];

export const navLinksItem = [
  {
    id: 1,
    icon: <Icon icon="gg:profile" color="white" width="32" height="32" />,
    path: "profile",
    name: "My profile",
    goToMenu: "",
  },
  {
    id: 2,
    icon: (
      <Icon
        icon="material-symbols:settings-outline"
        color="white"
        width="32"
        height="32"
      />
    ),
    path: "",
    name: "Settings",
    goToMenu: "settings",
  },
  {
    id: 3,
    icon: (
      <Icon icon="carbon:open-panel-top" color="white" width="32" height="32" />
    ),
    path: "",
    name: "Admin panel",
    goToMenu: "admin-panel",
  },
  {
    id: 4,
    icon: (
      <Icon
        icon="material-symbols:admin-panel-settings-rounded"
        color="white"
        width="32"
        height="32"
      />
    ),
    path: "admin",
    name: "Admin",
    goToMenu: "",
  },
  {
    id: 5,
    icon: (
      <Icon
        icon="ant-design:logout-outlined"
        color="white"
        width="32"
        height="32"
        rotate={1}
      />
    ),
    path: "/login-admin",
    name: "Logout",
  },
];

export const navLinksSettings = [
  {
    id: 1,
    icon: (
      <Icon
        icon="material-symbols:keyboard-double-arrow-left-rounded"
        color="white"
        width="32"
        height="32"
      />
    ),
    path: "",
    name: "",
    goToMenu: "main",
  },
  {
    id: 2,
    icon: <Icon icon="gg:profile" color="white" width="32" height="32" />,
    path: "profile",
    name: "My profile",
    goToMenu: "",
  },
  {
    id: 3,
    icon: (
      <Icon
        icon="material-symbols:broken-image-outline-rounded"
        color="white"
        width="32"
        height="32"
      />
    ),
    path: "uploadImage",
    name: "Upload image",
    goToMenu: "",
  },
];

export function useNavLinksAdminPanel() {
  const { t } = useTranslation();

  const navList = [
    {
      id: 1,
      icon: (
        <Icon
          icon="material-symbols:keyboard-double-arrow-left-rounded"
          color="white"
          width="32"
          height="32"
        />
      ),
      path: "",
      name: "",
      goToMenu: "main",
    },
    {
      id: 2,
      icon: (
        <Icon icon="carbon:zoom-in-area" color="white" width="32" height="32" />
      ),
      path: "district",
      name: t("sidebar_navlink_districts"),
      goToMenu: "",
    },
    {
      id: 3,
      icon: (
        <Icon
          icon="icon-park-outline:shop"
          color="white"
          width="32"
          height="32"
        />
      ),
      path: "shops",
      name: t("sidebar_navlink_shops"),
      goToMenu: "",
    },
    {
      id: 4,
      icon: (
        <Icon
          icon="mdi:map-marker-circle"
          color="white"
          width="32"
          height="32"
        />
      ),
      path: "areas",
      name: t("sidebar_navlink_areas"),
      goToMenu: "",
    },
    {
      id: 6,
      path: "product-categories",
      name: t("sidebar_navlink_product_cat"),
      icon: (
        <Icon
          icon="material-symbols:category-rounded"
          color="white"
          width="32"
          height="32"
        />
      ),
    },
    {
      id: 5,
      icon: (
        <Icon
          icon="fluent-mdl2:product-variant"
          color="white"
          width="32"
          height="32"
        />
      ),
      path: "products",
      name: t("sidebar_navlink_products"),
      goToMenu: "",
    },
  ];

  return navList;
}
