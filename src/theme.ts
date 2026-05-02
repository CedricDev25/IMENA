import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#2563eb", // Primary blue from design
      600: "#1d4ed8",
      700: "#1e40af",
      800: "#1e3a8a",
      900: "#172554",
    },
    dark: {
      bg: "#09090B",
      surface: "#161618",
      sidebar: "#0C0C0E",
      border: "rgba(255, 255, 255, 0.1)",
    },
  },
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "dark.bg",
        color: "#F4F4F5",
      },
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        bg: "dark.bg",
      },
      "::-webkit-scrollbar-thumb": {
        bg: "whiteAlpha.200",
        borderRadius: "full",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});

export default theme;
