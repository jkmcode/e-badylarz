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

export const submitBtn = {
  backgroundColor: "transparent",
  border: "none",
  backgroundImage: `linear-gradient(90deg, rgba(152, 255, 152, 1) 0%, rgba(61, 217, 61, 1) 100%)`,
  marginTop: "1rem",
  padding: "0.3rem",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "0.25rem",
  color: "white",
  textTransform: "uppercase",
  fontWeight: "500",
};

export function FormLayout({ children, col }) {
  const { windowWidth } = useResponsive();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          windowWidth > 800 ? `repeat(${col}, 1fr)` : `repeat(1, 1fr)`,
        gridColumnGap: "1rem",
      }}
    >
      {children}
    </div>
  );
}
