export const signUpEmail = (email: string, token: string) => {
  return {
    from: "Replicazsite@gmail.com",
    to: email,
    subject: "Replicaz - verify your email",
    text: `
      Hello,thanks for registering on our site.
      Please copy and paste the address below to verify your account.
      http://localhost:3000/api/activate/user/${token}`,
    html: `<h1>Hello,</h1>
      <p>thanks for registering on our site.</p>
      <p>  Please click the link below to verify your account.</p>
      <a href="http://localhost:3000/api/activate/user/${token}">Verify your account</a>`,
  };
};
export const resetPasswordEmail = (email: string, token: string) => {
  return {
    from: "Replicazsite@gmail.com",
    to: email,
    subject: "Replicaz - reset your password",
    text: `
      Hello,thanks for registering on our site.
      Please copy and paste the address below to verify your account.
      http://localhost:3000/auth/newPassword?token=${token}`,
    html: `<h1>Hello,</h1>
      <p>thanks for registering on our site.</p>
      <p>  Please click the link below to reset your password.</p>
      <a href="http://localhost:3000/auth/newPassword?token=${token}">reset your password</a>`,
  };
};
