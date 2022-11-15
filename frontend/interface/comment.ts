type commentedUser = {
  _id: string;
  userName: string;
  image: string;
};

export type comment = {
  _id: string;
  createdAt: string;
  body: string;
  postedBy: commentedUser;
  likes: string[];
};
