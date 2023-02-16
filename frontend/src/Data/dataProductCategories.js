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

export const subproductCatList = [
  {
    id: 1,
    name: "Pomidor",
    language: "en",
    is_active: true,
  },
  {
    id: 2,
    name: "Kalafior",
    language: "en",
    is_active: true,
  },
  {
    id: 3,
    name: "Ogórek",
    language: "pl",
    is_active: true,
  },
  {
    id: 4,
    name: "Marchewka",
    language: "en",
    is_active: false,
  },
  {
    id: 5,
    name: "Cebula",
    language: "pl",
    is_active: false,
  },
  {
    id: 6,
    name: "Sałata",
    language: "en",
    is_active: false,
  },
  {
    id: 7,
    name: "Rzotkiewka",
    language: "en",
    is_active: false,
  },
  {
    id: 8,
    name: "Burak",
    language: "pl",
    is_active: false,
  },
  {
    id: 9,
    name: "Kabaczek",
    language: "en",
    is_active: false,
  },
];
