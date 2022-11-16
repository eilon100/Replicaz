import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FiEdit2, FiBookmark, FiFlag, FiTrash } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

type PostEditProps = {
  postId: string;
  userPost: boolean;
};
export default function PostEdit({ postId, userPost }: PostEditProps) {
  const { state } = useContext(AuthContext);
  const { loggedIn, userId } = state;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <BiDotsHorizontalRounded className="text-black" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            console.log(postId);
          }}
        >
          <FiBookmark className="mr-5" />
          Save
        </MenuItem>
        {userPost ? (
          <div>
            <MenuItem>
              <FiTrash className="mr-5" /> Delete
            </MenuItem>
            <MenuItem>
              <FiEdit2 className="mr-5" /> Edit
            </MenuItem>
          </div>
        ) : (
          ""
        )}

        <MenuItem>
          <FiFlag className="mr-5" /> Report
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
