export const theme = (props) => {
  console.log("🚀 ~ file: style.js ~ line 2 ~ theme ~ props", props);
  const getSize = ({ xxl, xl, lg, md, sm, xs }) => {
    if (props.sizes.xxl) return xxl;
    if (props.sizes.xl) return xl;
    if (props.sizes.lg) return lg;
    if (props.sizes.md) return md;
    if (props.sizes.sm) return sm;
    if (props.sizes.xs) return xs;
  };

  return {
    ...props,
    isBreakpoints: props.sizes,
    breakpoints: {
      xxl: `1600px`,
      xl: `1200px`,
      lg: `992px`,
      md: `768px`,
      sm: `576px`,
      xs: `320px`,
    },
    myColors: {
      gray: "#f2f2f2",
    },
    customColors: {
      primary: `#1C4770`,
      secondary: `#4A94A5`,
      white: "#fff",
      lightGray: "#fafafa",
      orange: "#FE5F55",
      lightOrange: "#EC663D",
      primaryHover: "#4A94A5",
      opacityPrimaryHover: "rgba(74, 148, 165, 0.24)",
      darkBlack: "#585858",
      turq: "#599BA9",
      lightBlue: "#1985A1",
      darkPrimary: "#343C44",
      lightGreen: "#6EC586",
      darkGreen: "#219653",
    },
    colors: {
      black: "#000",
      black3: "#333",
      Gray: "#999",
      Gray1: "#828282",
      Gray2: "#4f4f4f",
      Gray3: "#272833",
      Gray4: "#444444",
      Gray5: "#18191F",
      Gray6: "#BDBDBD",
      red: "#FE5F55",
    },
    backgroundColors: {
      bgPrimary: `#001529`,
      bgSecondary: "#f5f5f5",
      black3: "#333",
      lightBlue: "#EAF5FF",
      lightRed: "#FFF8F9",
      overlay: "#F2FFFF",
      lightGray: "#FAFAFA",
      red: "#FE5F55",
      gray1: "#F8F8F8",
      gray2: "#e5e5e5",
      gray3: "#fbfbfb",
      gray4: "#f2f2f2",
      gray5: "#E0E0E0",

      // bgSecondaryLight: lighten(0.6, colors?.secondary || `#6a759b`),
    },
    borderColors: {
      primaryBorderColor: `#001529`,
      secondBorderColor: `#c4c4c4`,
      black3: "#333",
      light: "#e3eef1",
      lightGray: "#FAFAFA",
      gray: "#E0E0E0",
      gray2: "#f2f2f2",
      gray3: "#4f4f4f",
      Gray6: "#BDBDBD",
      lightBlack: "#b0b0b0",
      lightGreen: "#6FCF97",
      darkRed: "#EB5757",
    },
    baseFontSize: {
      h1FontSize: getSize({
        xxl: "40px",
        xl: "32px",
        md: "24px",
        xs: "20px",
      }),
      h2FontSize: getSize({
        xxl: "24px",
        xl: "20px",
        md: "16px",
        sm: "12px",
      }),
      h3FontSize: getSize({
        xxl: "24px",
        md: "16px",
        xs: "12px",
      }),
      h4FontSize: getSize({
        xxl: "24px",
        xl: "16px",
        md: "14px",
      }),
      h5FontSize: getSize({
        xxl: "20px",
        xl: "16px",
        md: "14px",
      }),
    },
    baseBoxShadow: {
      boxShadowBase: `0 2px 8px rgba(0, 0, 0, 0.15)`,
      sortingBoxShadow: `0 2.36px 9.46px #2979FF`,
    },
    borderRadius: {
      borderRadiusBase: `4px`,
      bgBorderRadius: `10px`,
    },
  };
};
