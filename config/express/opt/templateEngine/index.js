const path = require('path');
module.exports.setTemplatingEngine = (App, projectDir) => {
  const
    { VIEW_ENGINE_TYPE, VIEWS_FOLDER_NAME } = process.env;
  const pathToViewsFolder = path.join(projectDir, VIEWS_FOLDER_NAME);

  App.set('view engine', VIEW_ENGINE_TYPE);
  App.set('views', pathToViewsFolder);

  return App;
}