import { useTranslation } from "react-i18next";

export function useKindShopSpots() {
  const { t } = useTranslation();
  const kindSpots = [
    {
      id: "1",
      name: t("ShopsSpot_kind_shop"),
    },
    {
      id: "2",
      name: t("ShopsSpot_kind_farmer"),
    },
    {
      id: "3",
      name: t("ShopsSpot_kind_manufacturer"),
    },
    {
      id: "4",
      name: t("ShopsSpot_kind_wholesaler"),
    },
    {
      id: "5",
      name: t("ShopsSpot_kind_agent"),
    },
  ];
  return kindSpots;
}
