export const mainTheme = {
   token: {
     colorPrimary: "#6CC7FE",
    colorInfo: "var(--primary)",
    colorError: "#ca0b00",
   },

  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "#fff",
      itemHoverBg: "var(--primary)",
      itemHoverColor: "#fff",
      itemSelectedBg: "var(--primary)",
      itemSelectedColor: "var(--primary-black)",
      iconSize: 17,
      itemMarginBlock: 10,
      itemHeight: 56,
      itemPaddingInline: 1,
    },

    Table: {
      headerBg: "white",
      headerSplitColor: "black",
      headerColor: "var(--primary-black)",
      colorBgContainer: "var(--primary-black)",
      cellFontSize: 16,
      colorText: "var(--primary-white)",
      borderColor: "var(--primary-white)",
      headerFilterHoverBg: "transparent",
      rowHoverBg: "#262e46",
      filterDropdownMenuBg: "#000",  
      filterDropdownBg: "#000",
    },

    Button: {
      colorPrimary: "var(--primary)",
      color: "var(--primary)",
    },

    Input: {
      colorBorder: "var(--input-border)",
      activeBorderColor: "var(--primary)",
      controlHeight: 38,
    },

    Select: {
      colorBorder: "var(--input-border)",
    },

    DatePicker: {
      controlHeight: 40,
      colorBorder: "var(--secondary)",
    },

    Tabs: {
      itemColor: "white",
      itemActiveColor: "var(--primary)",
    },

    Pagination: {
      itemActiveBg: "var(--primary)",
      colorBgContainer: "#000000",
      colorText: "#ffffff",
      colorPrimary: "#ffffff",
      colorBgTextHover: "var(--primary)",
    },

    Spin: {
      colorPrimary: "var(--primary)",
    },
    Segmented: {
      itemColor: "var(--primary-white)",
      trackBg: "var(--primary)",
    },

    Empty: {
      colorTextDescription: "var(--primary-white)",
    },
  },
};
