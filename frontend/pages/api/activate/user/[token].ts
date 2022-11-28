import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import { apiService } from "../../../../utills/apiService";

export default function activateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = { token: req.query.token };

  if (!data.token) {
    setCookie("active", "failed", { req, res });
    return res.redirect(307, "/auth/signin");
  }

  apiService.post
    .ACTIVATE_USER(data)
    .then(() => {
      setCookie("active", "Succeeded", { req, res });
      return res.redirect(307, "/auth/signin");
    })
    .catch((err) => {
      setCookie("active", "failed", { req, res });
      return res.redirect(307, "/auth/signin");
    });
}
