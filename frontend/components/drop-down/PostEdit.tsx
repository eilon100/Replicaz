import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsPencil,
  BsTrash,
  BsFlag,
} from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { apiService } from "../../utills/apiService";
import toast from "react-hot-toast";
import { useState } from "react";

type PostEditProps = {
  postId: string;
  userPost: boolean;
  saves: string[];
};
export default function PostEdit({ postId, userPost, saves }: PostEditProps) {
  const { state } = useContext(AuthContext);
  const { userId } = state;
  const [savedPost, setSavedPost] = useState(saves.includes(userId));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const savePostHandler = (id: string) => {
    const postId = { postId: id };
    apiService.post
      .SAVE_POST(postId)
      .then((res) => {
        toast.success(res.data.message);
        res.data.saved ? setSavedPost(true) : setSavedPost(false);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
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
            savePostHandler(postId);
          }}
        >
          {savedPost ? (
            <BsFillBookmarkFill className="mr-5" />
          ) : (
            <BsBookmark className="mr-5" />
          )}
          Save
        </MenuItem>
        {userPost ? (
          <div>
            <MenuItem>
              <BsTrash className="mr-5" /> Delete
            </MenuItem>
            <MenuItem>
              <BsPencil className="mr-5" /> Edit
            </MenuItem>
          </div>
        ) : (
          ""
        )}

        <MenuItem>
          <BsFlag className="mr-5" /> Report
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
