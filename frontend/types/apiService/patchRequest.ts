export type EDIT_POST = { title: string; body: string; postId: string };
export type EDIT_COMMENT = { body: string; commentId: string };
export type EDIT_USER_DATA = {
  phone?: string;
  lastName?: string;
  firstName?: string;
  birthDate?: Date | string;
  image: string;
};
