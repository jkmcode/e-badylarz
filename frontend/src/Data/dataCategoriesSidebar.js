import React from "react";
import { Icon } from "@iconify/react";
export const links = [
  {
    id: 1,
    url: "/",
    text: "home",
    icon: <Icon icon="ion:home-outline" width="32" height="32" />,
    sublinks: [
      {
        id: 1,
        label: "home1",
        url: "/products",
        icon: <Icon icon="ion:home-outline" width="32" height="32" />,
        subsublinks: [
          {
            id: 1,
            label: "subhome1.1",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
          {
            id: 2,
            label: "subhome1.2",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
          {
            id: 3,
            label: "subhome1.3",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
        ],
      },
      {
        id: 2,
        label: "home2",
        url: "/products",
        icon: <Icon icon="ion:home-outline" width="32" height="32" />,
        subsublinks: [
          {
            id: 1,
            label: "subhome2.1",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
          {
            id: 2,
            label: "subhome2.2",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
          {
            id: 3,
            label: "subhome2.3",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
        ],
      },
      {
        id: 3,
        label: "home3",
        url: "/products",
        icon: <Icon icon="ion:home-outline" width="32" height="32" />,
        subsublinks: [
          {
            id: 1,
            label: "subhome3.1",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
          {
            id: 2,
            label: "subhome3.2",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
          {
            id: 3,
            label: "subhome3.3",
            url: "/products",
            icon: <Icon icon="ion:home-outline" width="32" height="32" />,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    url: "/team",
    text: "team",
    icon: <Icon icon="fluent:people-team-28-filled" width="32" height="32" />,
    sublinks: [
      {
        id: 1,
        label: "team1",
        url: "/products",
        icon: (
          <Icon icon="fluent:people-team-28-filled" width="32" height="32" />
        ),
        subsublinks: [
          {
            id: 1,
            label: "subteam1.1",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
          {
            id: 2,
            label: "subteam1.2",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
          {
            id: 3,
            label: "subteam1.3",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
        ],
      },
      {
        id: 2,
        label: "team2",
        url: "/products",
        icon: (
          <Icon icon="fluent:people-team-28-filled" width="32" height="32" />
        ),
        subsublinks: [
          {
            id: 1,
            label: "subteam2.1",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
          {
            id: 2,
            label: "subteam2.2",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
          {
            id: 3,
            label: "subteam2.3",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
        ],
      },
      {
        id: 3,
        label: "team3",
        url: "/products",
        icon: (
          <Icon icon="fluent:people-team-28-filled" width="32" height="32" />
        ),
        subsublinks: [
          {
            id: 1,
            label: "subteam3.1",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
          {
            id: 2,
            label: "subteam3.2",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
          {
            id: 3,
            label: "subteam3.3",
            url: "/products",
            icon: (
              <Icon
                icon="fluent:people-team-28-filled"
                width="32"
                height="32"
              />
            ),
          },
        ],
      },
    ],
  },
  {
    id: 3,
    url: "/projects",
    text: "projects",
    icon: (
      <Icon
        icon="material-symbols:create-new-folder-outline-rounded"
        width="32"
        height="32"
      />
    ),
    sublinks: [
      {
        id: 1,
        label: "projects1",
        url: "/products",
        icon: (
          <Icon icon="material-symbols:create-new-folder-outline-rounded" />
        ),
        subsublinks: [
          {
            id: 1,
            label: "subprojects1.1",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
          {
            id: 2,
            label: "subprojects1.2",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
          {
            id: 3,
            label: "subprojects1.3",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
        ],
      },
      {
        id: 2,
        label: "projects2",
        url: "/products",
        icon: (
          <Icon
            icon="material-symbols:create-new-folder-outline-rounded"
            width="32"
            height="32"
          />
        ),
        subsublinks: [
          {
            id: 1,
            label: "subprojects2.1",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
          {
            id: 2,
            label: "subprojects2.2",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
          {
            id: 3,
            label: "subprojects2.3",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
        ],
      },
      {
        id: 3,
        label: "projects3",
        url: "/products",
        icon: (
          <Icon
            icon="material-symbols:create-new-folder-outline-rounded"
            width="32"
            height="32"
          />
        ),
        subsublinks: [
          {
            id: 1,
            label: "subprojects3.1",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
          {
            id: 2,
            label: "subprojects3.2",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
          {
            id: 3,
            label: "subprojects3.3",
            url: "/products",
            icon: (
              <Icon icon="material-symbols:create-new-folder-outline-rounded" />
            ),
          },
        ],
      },
    ],
  },
  {
    id: 4,
    url: "/calendar",
    text: "calendar",
    icon: (
      <Icon icon="material-symbols:calendar-month" width="32" height="32" />
    ),
    sublinks: [
      {
        id: 1,
        label: "calendar1",
        url: "/products",
        icon: <Icon icon="material-symbols:calendar-month" />,
        subsublinks: [
          {
            id: 1,
            label: "subcalendar1.1",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
          {
            id: 2,
            label: "subcalendar1.2",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
          {
            id: 3,
            label: "subcalendar1.3",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
        ],
      },
      {
        id: 2,
        label: "calendar2",
        url: "/products",
        icon: <Icon icon="material-symbols:calendar-month" />,
        subsublinks: [
          {
            id: 1,
            label: "subcalendar2.1",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
          {
            id: 2,
            label: "subcalendar2.2",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
          {
            id: 3,
            label: "subcalendar2.3",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
        ],
      },
      {
        id: 3,
        label: "calendar3",
        url: "/products",
        icon: <Icon icon="material-symbols:calendar-month" />,
        subsublinks: [
          {
            id: 1,
            label: "subcalendar3.1",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
          {
            id: 2,
            label: "subcalendar3.2",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
          {
            id: 3,
            label: "subcalendar3.3",
            url: "/products",
            icon: <Icon icon="material-symbols:calendar-month" />,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    url: "/documents",
    text: "documents",
    icon: <Icon icon="fa:wpforms" width="32" height="32" />,
    sublinks: [
      {
        id: 1,
        label: "documents1",
        url: "/products",
        icon: <Icon icon="fa:wpforms" />,
        subsublinks: [
          {
            id: 1,
            label: "subdocuments1",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
          {
            id: 2,
            label: "subdocuments1",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
          {
            id: 3,
            label: "subdocuments1",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
        ],
      },
      {
        id: 2,
        label: "documents2",
        url: "/products",
        icon: <Icon icon="fa:wpforms" />,
        subsublinks: [
          {
            id: 1,
            label: "subdocuments2",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
          {
            id: 2,
            label: "subdocuments2",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
          {
            id: 3,
            label: "subdocuments2",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
        ],
      },
      {
        id: 3,
        label: "documents3",
        url: "/products",
        icon: <Icon icon="fa:wpforms" />,
        subsublinks: [
          {
            id: 1,
            label: "subdocuments3",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
          {
            id: 2,
            label: "subdocuments3",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
          {
            id: 3,
            label: "subdocuments3",
            url: "/products",
            icon: <Icon icon="fa:wpforms" />,
          },
        ],
      },
    ],
  },
];

export const social = [
  {
    id: 1,
    url: "https://www.twitter.com",
    icon: <Icon icon="uiw:facebook" />,
  },
  {
    id: 2,
    url: "https://www.twitter.com",
    icon: <Icon icon="ph:twitter-logo" />,
  },
  {
    id: 3,
    url: "https://www.twitter.com",
    icon: <Icon icon="bi:linkedin" />,
  },
];
