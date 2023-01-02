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
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";
import { apiService } from "../../../../utills/apiService";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import  { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import { user } from "../../../../types/user";
import InputModal from "../../../../UI/modals/InputModal";
import ConfirmModal from "../../../../UI/modals/ConfirmModal";

type PostOptionsProps = {
  postId: string;
  userPost: boolean;
  saves: user[];
  setEditPost: React.Dispatch<React.SetStateAction<boolean>>;
};
const style = {
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
};

export default function PostOptions({
  postId,
  userPost,
  saves,
  setEditPost,
}: PostOptionsProps) {
  const { state } = useContext(AuthContext);
  const { userId } = state;
  const [savedPost, setSavedPost] = useState(saves.includes(userId));
  const [closeOptions, setCloseOptions] = useState<null | HTMLElement>(null);
  const [reportModal, setReportModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const open = Boolean(closeOptions);
  const router = useRouter();

  useEffect(() => {
    setSavedPost(saves.includes(userId));
  }, [saves]);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setCloseOptions(event.currentTarget);
  };

  const savePostHandler = () => {
    const data = { postId };

    apiService.post
      .SAVE_POST(data)
      .then(({ data: { message, saved } }) => {
        toast.success(message);
        saved ? setSavedPost(true) : setSavedPost(false);
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };

  const deletePostHandler = () => {
    const notification = toast.loading("Deleting post...");
    const data = { postId };

    apiService.post
      .DELETE_POST(data)
      .then(({ data: { message } }) => {
        toast.success(message, {
          id: notification,
        });
        if (router.pathname.includes("/post")) router.back();
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error, {
          id: notification,
        });
      });
  };

  const editPostHandler = () => {
    setEditPost(true);
  };
  const reportPostHandler = (body: string) => {
    const data = { postId, body };

    apiService.post
      .REPORT_POST(data)
      .then(({ data: { message } }) => {
        toast.success(message);
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  };
  const menu = () => {
    return (
      <Menu
        anchorEl={closeOptions}
        id="PostOptions"
        open={open}
        onClose={() => setCloseOptions(null)}
        onClick={() => setCloseOptions(null)}
        PaperProps={{
          elevation: 0,
          sx: style,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            savePostHandler();
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
                setDeleteModal(true);
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
          <MenuItem
            onClick={() => {
              setReportModal(true);
            }}
          >
            <BsFlag className="mr-5" /> Report
          </MenuItem>
        )}
      </Menu>
    );
  };

  return (
    <React.Fragment>
      <InputModal
        modalOpen={reportModal}
        setModalOpen={setReportModal}
        functionHandler={reportPostHandler}
      />
      <ConfirmModal
        modalOpen={deleteModal}
        setModalOpen={setDeleteModal}
        functionHandler={deletePostHandler}
        action="delete"
        page="post"
      />
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? "PostOptions" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <BiDotsHorizontalRounded className="text-text-main" />
      </IconButton>
      {menu()}
    </React.Fragment>
  );
}
