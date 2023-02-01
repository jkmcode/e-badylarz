import { Icon } from "@iconify/react";

export const dataProductCategories = [
  {
    id: 1,
    icon: <Icon icon="lucide:carrot" color="white" width="64" height="64" />,
    path: "",
    name: "WARZYWA",
    isActive: true,
  },
  {
    id: 2,
    icon: (
      <Icon
        icon="mdi:fruit-grapes-outline"
        color="white"
        width="64"
        height="64"
      />
    ),
    path: "",
    name: "OWOCE",
    isActive: true,
  },
  {
    id: 3,
    icon: (
      <Icon
        icon="mdi:food-drumstick-outline"
        color="white"
        width="64"
        height="64"
      />
    ),
    path: "",
    name: "MIĘSO",
    isActive: false,
  },
];
