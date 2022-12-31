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
