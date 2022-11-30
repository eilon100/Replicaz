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
import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useQueryClient } from "react-query";

type PostEditProps = {
  postId: string;
  userPost: boolean;
  saves: string[];
  setEditPost: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostEdit({
  postId,
  userPost,
  saves,
  setEditPost,
}: PostEditProps) {
  const { state } = useContext(AuthContext);
  const { userId } = state;
  const [savedPost, setSavedPost] = useState(saves.includes(userId));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
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

  const deletePostHandler = (id: string) => {
    const notification = toast.loading("Deleting post...");
    const postId = { postId: id };

    apiService.post
      .DELETE_POST(postId)
      .then((res) => {
        toast.success(res.data.message, {
          id: notification,
        });
        queryClient.fetchQuery("posts");
        Router.push("/");
      })
      .catch((error) => {
        toast.error(error.response.data.error, {
          id: notification,
        });
      });
  };

  const editPostHandler = async () => {
    setEditPost(true);
  };

  const reportPostHandler = (id: string) => {
    const postId = { postId: id };

    apiService.post
      .REPORT_POST(postId)
      .then((res) => {
        toast.success(res.data.message);
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
            <MenuItem
              onClick={() => {
                deletePostHandler(postId);
              }}
            >
              <BsTrash className="mr-5" /> Delete
            </MenuItem>
            <MenuItem
              onClick={() => {
                editPostHandler();
              }}
            >
              <BsPencil className="mr-5" /> Edit
            </MenuItem>
          </div>
        ) : (
          ""
        )}
        <MenuItem
          onClick={() => {
            reportPostHandler(postId);
          }}
        >
          <BsFlag className="mr-5" /> Report
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
