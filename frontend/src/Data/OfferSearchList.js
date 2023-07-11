import { useTranslation } from "react-i18next";


export function useBarrelBulk() {
  const { t } = useTranslation();
  const BarrelBulk = [
    {
      id: "1",
      name: t("Offer_BarrelBulk_kg"),
      short: t("Offer_BarrelBulk_kg_short"),
      bb: "kg"
    },
    {
      id: "2",
      name: t("Offer__BarrelBulk_art"),
      short: t("Offer__BarrelBulk_art_short"),
      bb: "szt"
    },
    {
      id: "3",
      name: t("Offer__BarrelBulk_liter"),
      short: t("Offer__BarrelBulk_liter_short"),
      bb: "litr"
    },
  ];
  return BarrelBulk;
}

export function useCountry() {
  const { t } = useTranslation();
  const counrtyList = [
    {
      id: "1",
      name: t("Offer_Country_PL"),
      code: "PL"
    },
    {
      id: "2",
      name: t("Offer_Country_EN"),
      code: "EN"
    },
    {
      id: "3",
      name: t("Offer_Country_EU"),
      code: "EU"
    },

  ];
  return counrtyList
}

export function useCurrency() {
  const { t } = useTranslation();
  const currencyList = [
    {
      id: "1",
      name: "PLN"
    },
    {
      id: "2",
      name: "EURO"
    },

  ];
  return currencyList
}

export function useLiter() {
  const { t } = useTranslation();
  const ListLiter = [
    {
      id: "1",
      name: t("Offer_liter_100ml"),
      value: 0.1
    },
    {
      id: "2",
      name: t("Offer_liter_250ml"),
      value: 0.25
    },
    {
      id: "3",
      name: t("Offer_liter_500ml"),
      value: 0.5
    },
    {
      id: "4",
      name: t("Offer_liter_750ml"),
      value: 0.75
    },
    {
      id: "5",
      name: t("Offer_liter_1"),
      value: 1
    },
    {
      id: "6",
      name: t("Offer_liter_1_5"),
      value: 1.5
    },
    {
      id: "7",
      name: t("Offer_liter_2"),
      value: 2
    },
    {
      id: "8",
      name: t("Offer_liter_5"),
      value: 5
    },
  ]
  return ListLiter;
}

export function useArt() {
  const { t } = useTranslation();
  const ListArt = [
    {
      id: "1",
      name: t("Offer_art_1"),
      value: 1
    },
    {
      id: "2",
      name: t("Offer_art_2"),
      value: 2
    },
    {
      id: "3",
      name: t("Offer_art_3"),
      value: 3
    },
    {
      id: "4",
      name: t("Offer_art_5"),
      value: 5
    },
    {
      id: "5",
      name: t("Offer_art_10"),
      value: 10
    },
    {
      id: "6",
      name: t("Offer_art_20"),
      value: 20
    },
  ]
  return ListArt;
}

export function useKg() {
  const { t } = useTranslation();
  const ListKg = [
    {
      id: "1",
      name: t("Offer_kg_50g"),
      value: 0.05
    },
    {
      id: "2",
      name: t("Offer_kg_100g"),
      value: 0.1
    },
    {
      id: "3",
      name: t("Offer_kg_150g"),
      value: 0.15
    },
    {
      id: "4",
      name: t("Offer_kg_200g"),
      value: 0.20
    },
    {
      id: "5",
      name: t("Offer_kg_250g"),
      value: 0.25
    },
    {
      id: "6",
      name: t("Offer_kg_500g"),
      value: 0.5
    },
    {
      id: "7",
      name: t("Offer_kg_1"),
      value: 1
    },
    {
      id: "8",
      name: t("Offer_kg_2"),
      value: 2
    },
    {
      id: "9",
      name: t("Offer_kg_5"),
      value: 5
    },
    {
      id: "10",
      name: t("Offer_kg_10"),
      value: 10
    },
    {
      id: "11",
      name: t("Offer_kg_15"),
      value: 15
    },
    {
      id: "12",
      name: t("Offer_kg_20"),
      value: 20
    },
  ];
  return ListKg;
}

export function useDateFrom() {
  const { t } = useTranslation();
  const dateFromList = [
    {
      id: "1",
      name: t("Offer_DateFrom_today"),
      delta: 0
    },
    {
      id: "2",
      name: t("Offer_DateFrom_1_day"),
      delta: 1
    },
    {
      id: "3",
      name: t("Offer_DateFrom_2_days"),
      delta: 2
    },
    {
      id: "4",
      name: t("Offer_DateFrom_3_days"),
      delta: 3
    },
    {
      id: "5",
      name: t("Offer_DateFrom_7_days"),
      delta: 7
    },
  ];
  return dateFromList;
}

export function useDateTo() {
  const { t } = useTranslation();
  const dateList = [
    {
      id: "1",
      name: t("Offer_DateTo_1_day"),
      delta: 1
    },
    {
      id: "2",
      name: t("Offer_DateTo_2_days"),
      delta: 2
    },
    {
      id: "3",
      name: t("Offer_DateTo_3_days"),
      delta: 3
    },
    {
      id: "4",
      name: t("Offer_DateTo_4_days"),
      delta: 4
    },
    {
      id: "5",
      name: t("Offer_DateTo_5_days"),
      delta: 5
    },
    {
      id: "6",
      name: t("Offer_DateTo_1_week"),
      delta: 7
    },
    {
      id: "7",
      name: t("Offer_DateTo_2_weeks"),
      delta: 14
    },
    {
      id: "8",
      name: t("Offer_DateTo_1_month"),
      delta: 30
    },
    {
      id: "9",
      name: t("Offer_DateTo_2_months"),
      delta: 60
    },
    {
      id: "10",
      name: t("Offer_DateTo_3_months"),
      delta: 90
    },
  ];
  return dateList;
}