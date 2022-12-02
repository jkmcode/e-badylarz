import { Icon } from "@iconify/react";

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
    path: "",
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
