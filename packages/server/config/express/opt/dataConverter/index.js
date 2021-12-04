module.exports.configureDataConverters = (App, express) => {
  const
    { json, urlencoded } = express,
    urlencoded_options = {
      extended: false
    };

  App.use(json());
  App.use(urlencoded(urlencoded_options));

  return App;
};