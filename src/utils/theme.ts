import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface Palette {
		gray: Palette["primary"];
		lightBlue: Palette["primary"];
	}

	interface PaletteOptions {
		gray: PaletteOptions["primary"];
		lightBlue: PaletteOptions["primary"];
	}

	interface Theme {
		palette: {
			primary: {
				main: string;
			};
			secondary: {
				main: string;
			};
			gray: {
				main: string;
			};
			lightBlue: {
				main: string;
			};
		};
	}
}

export const theme = createTheme({
	palette: {
		primary: {
			main: "#20489F",
		},
		secondary: {
			main: "#E50304",
		},
		gray: {
			main: "#C4C4C4",
		},
		lightBlue: {
			main: "#ABCDFF",
		},
	},
});

/*
Example of using custom palette color for a button:
https://mui.com/material-ui/customization/palette/

```
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}
```

```
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    lightBlue: true;
  }
}
```

*/
