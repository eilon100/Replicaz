import * as React from "react";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import SelectUnstyled, {
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import Router from "next/router";
import { styled } from "@mui/system";
import { useState } from "react";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledButton = styled("button")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 15px;
    box-sizing: border-box;
    min-height: 44.5px;
    padding-left:26px;
    width:230px;
    @media (max-width:1280px) {width:100px}
    border-radius: 12px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
   
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
    
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      border-color: ${blue[400]};
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    
    `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 13px;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 230px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 2;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

export default function UnstyledSelectSimple(props) {
  const [page, setPage] = useState("Home");

  const onChangePage = (e) => {
    Router.push(`/`);
  };

  return (
    <div className="hidden lg:flex items-center ml-3 mr-3 px-1 rounded-xl cursor-pointer  xl:min-w-[230px]  ">
      <HomeIcon className="h-5 w-5  relative bottom-[1px] left-1 " />
      <CustomSelect
        defaultValue={"Home"}
        className="absolute"
        onChange={onChangePage}
      >
        <StyledOption value={"Home"}>Home</StyledOption>
        <StyledOption value={"Shoes"}>Shoes</StyledOption>
        <StyledOption value={"Bags"}>Bags</StyledOption>
        <StyledOption value={"Clothes"}>Clothes</StyledOption>
      </CustomSelect>
      <ChevronDownIcon className="h-5 w-5 ml-[58px] xl:ml-44 " />
    </div>
  );
}
