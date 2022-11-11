import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

export default function activateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = { token: req.query.token };

  if (!data.token) {
    setCookie("active", "failed", { req, res });
    return res.redirect(307, "/auth/signin");
  }
  axios
    .post("http://localhost:8000/auth/activate", data)
    .then(() => {
      setCookie("active", "Succeeded", { req, res });
      return res.redirect(307, "/auth/signin");
    })
    .catch(() => {
      setCookie("active", "failed", { req, res });
      return res.redirect(307, "/auth/signin");
    });
}
