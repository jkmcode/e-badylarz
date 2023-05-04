//Form
import useResponsive from "../component/useResponsive";

export const formLabel = {
  fontStyle: "italic",
  fontSize: "0.85rem",
  margin: "0",
  marginLeft: "0.5rem",
};

export const formInput = {
  display: "block",
  width: "100%",
  padding: "0.375rem 0.75rem",
  border: "1px solid #ced4da",
  borderRadius: "0.25rem",
  backgroundColor: "white",
};

const btn = {
  backgroundColor: "transparent",
  border: "none",
  marginTop: "1rem",
  padding: "0.3rem",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "0.25rem",
  color: "white",
  textTransform: "uppercase",
  fontWeight: "500",
};

export const submitBtn = {
  ...btn,
  backgroundImage: `linear-gradient(90deg, rgba(152, 255, 152, 1) 0%, rgba(61, 217, 61, 1) 100%)`,
};

export const editBtn = {
  ...btn,
  backgroundImage: `linear-gradient(183deg, rgb(236, 181, 26) 0%, rgb(217, 196, 33) 100%)`,
};

export const unactiveBtn = {
  ...btn,
  backgroundImage: `linear-gradient(171deg, rgba(234, 17, 59, 1) 45%, rgba(202, 71, 130, 1) 89%)`,
};

export const activeBtn = {
  ...btn,
  backgroundImage: `linear-gradient(173deg, rgba(56, 168, 48, 1) 0%, rgba(69, 141, 43, 1) 100%)`,
};

export const subcategoryBtn = {
  ...btn,
  backgroundImage: `linear-gradient(149deg, rgba(89, 165, 252, 1) 0%, rgba(44, 63, 116, 1) 100%)`,
};

export const addProdCatBtn = {
  ...btn,
  backgroundImage: `linear-gradient(137deg, rgba(110, 170, 102, 1) 0%, rgba(59, 100, 73, 1) 100%)`,
  textAlign: "center",
};

export const btnTable = {
  backgroundColor: "white",
  border: "none",
  fontWeight: 600,
  borderRadius: "0.25rem",
  fontSize: "0.85rem",
};

export const btnUnactive = {
  ...btnTable,
  color: "red",
};

export const btnEdit = {
  ...btnTable,
  color: "#dec314",
};
export const btnInfo = {
  ...btnTable,
  color: "blue",
};
export const btnDescription = {
  ...btnTable,
  color: "green",
};

export const btnDescription2 = {
  ...btn,
  backgroundImage: `linear-gradient(173deg, rgba(56, 168, 48, 1) 0%, rgba(69, 141, 43, 1))`,
};

export const btnActive = {
  ...btnTable,
  color: "green",
};

export const tableCell = {
  padding: "0.75rem",
  verticalAlign: "middle",
  borderTop: "2px solid rgb(219, 219, 219)",
  borderRight: "2px solid rgb(219, 219, 219)",
};

export const tableCellNoBorderRight = {
  ...tableCell,
  borderRight: "none",
};

export const styleHeader = {
  borderBottom: `3px solid rgb(219, 219, 219)`,
  padding: "1rem",
};

export const productsStyleHeader = {
  backgroundColor: "white",
  borderBottom: `3px solid #1a6985`,
  padding: "1rem",
};

export function FormLayout({ children, col, ratio }) {
  const { windowWidth } = useResponsive();

  const grid = {
    display: "grid",

    gridColumnGap: "1rem",
  };

  const standardRadio = {
    ...grid,
    gridTemplateColumns:
      windowWidth > 800 ? `repeat(${col}, 1fr)` : `repeat(1, 1fr)`,
  };

  const radioOneToTwo = {
    ...grid,
    gridTemplateColumns: windowWidth > 800 ? `1fr 2fr` : `repeat(1, 1fr)`,
  };

  return (
    <div style={ratio === "1/2" ? radioOneToTwo : standardRadio}>
      {children}
    </div>
  );
}

export const emptylistTitle = {
  display: "flex",
  justifyContent: "center",
  textTransform: "uppercase",
  fontSize: "1.5rem",
  fontWeight: "500",
};

export const emptyListIcon = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: `300px`,
  width: "100%",
  fontSize: `calc(15rem + 4vw)`,
  color: "grey",
  opacity: "0.4",
};

export const activeBadge = {
  padding: "0.25em 0.4em",
  fontSize: "0.85rem",
  fontWeight: 500,
  textAlign: "center",
  borderRadius: "0.25rem",
  backgroundImage: "linear-gradient(to right, #28a745, #20c997)",
  color: "#fff",
};

export const inactiveBadge = {
  padding: "0.25em 0.4em",
  fontSize: "0.85rem",
  fontWeight: 500,
  textAlign: "center",
  borderRadius: "0.25rem",
  backgroundImage:
    "linear-gradient(179deg, rgba(237, 12, 12, 1) 64%, rgba(188, 39, 34, 1) 100%)",
  color: "#fff",
};

export const BTN = {
  borderRadius: "0.25rem",
  padding: "0.5rem",
  minWidth: "100px",
  border: "none",
  color: "white",
  fontWeight: "500",
};

export const changeBtn = {
  ...BTN,
  backgroundImage:
    "linear-gradient(183deg, rgba(236, 181, 26, 1) 0%, rgba(217, 196, 33, 1) 100%)",
};

export const addBtn = {
  ...BTN,
  backgroundImage:
    "linear-gradient(183deg, rgba(72, 236, 26, 1) 0%, rgba(83, 155, 41, 1) 100%)",
};

export const returnBtn = {
  color: "#212529",
  fontSize: ".975rem",
  fontWeight: 500,
  lineHeight: 1.5,
  color: "black",
};

export const title = {
  display: "flex",
  justifyContent: "center",
  fontSize: "calc(1.2rem + 1vw)",
  marginBottom: "1rem",
  marginTop: "1rem",
  textAlign: "center",
};
