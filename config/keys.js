const googleClientID = process.env.GOOGLECLIENTID;
const googleClientSecret = process.env.GOOGLECLIENTSECRET;

module.exports = {
  mongoURI: "mongodb://salezy:salezy1@ds149947.mlab.com:49947/storybooks-dev",
  googleClientID,
  googleClientSecret
};
