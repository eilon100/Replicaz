import React, { useState } from "react";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import {
  MenuIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Divider from "@mui/material/Divider";

function MenuDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const session = {
    user: {
      email: "eilonshamir123@gmail.com",
      name: "eilon",
      image: "/../public/EmptyProfile.png",
    },
  };
  const userImage = session?.user?.image!;
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const communityArr = ["Home", "Shoes", "Bags", "Clothes"];

  return (
    <>
      <IconButton
        sx={{ padding: "2px", ml: "0px" }}
        size="small"
        edge="start"
        color="inherit"
        aria-label="logo"
        className="hover:bg-transparent"
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon className="h-9"/>
      </IconButton>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            <List>
              {session?.user ? (
                <ListItem disablePadding>
                  <ListItemText
                    primary={
                      <div>
                        <div className="relative h-11 w-11 my-2">
                          <Image
                            className=" rounded-full "
                            objectFit="contain"
                            src={userImage || "/../public/EmptyProfile.png"}
                            layout="fill"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h1 className="font-bold text-xl ">{userName}</h1>
                          <h2 className="truncate text-xs mb-1">{userEmail}</h2>
                        </div>
                      </div>
                    }
                  />
                </ListItem>
              ) : (
                <div>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => signIn()}>
                      <ListItemText primary={"Sign in"} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setIsHomeOpen(!isHomeOpen)}>
                      <ListItemText
                        primary={
                          <div className="flex items-center space-x-32">
                            <div className="">Pages</div>
                            {isHomeOpen ? (
                              <ChevronUpIcon className="h-4 w-4 " />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 " />
                            )}
                          </div>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {isHomeOpen &&
                    communityArr.map((item) => {
                      return (
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText
                              primary={<p className="text-xs ml-3">{item}</p>}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                </div>
              )}

              {session?.user && (
                <div className=" mt-3 ">
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setIsHomeOpen(!isHomeOpen)}>
                      <ListItemText
                        primary={
                          <div className="flex items-center space-x-32">
                            <div className="">Pages</div>
                            {isHomeOpen ? (
                              <ChevronUpIcon className="h-4 w-4 " />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4 " />
                            )}
                          </div>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {isHomeOpen &&
                    communityArr.map((item, i) => {
                      return (
                        <ListItem disablePadding key={i}>
                          <ListItemButton>
                            <ListItemText
                              primary={<p className="text-xs ml-3">{item}</p>}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}

                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={<p className="">Messages</p>} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={<p className="">Notifications</p>}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => signOut()}>
                      <ListItemText
                        primary={
                          <p className="font-semibold text-red-500">Sign out</p>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </div>
              )}
            </List>
          </Typography>
        </Box>
      </Drawer>
    </>
  );
}

export default MenuDrawer;
