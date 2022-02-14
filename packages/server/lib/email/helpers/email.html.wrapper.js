module.exports = (() => {
  const buildHTMLBodyEmail = emailProps => (`
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            ${emailProps.title}
        </title>
    </head>
    <body>
        ${emailProps.body}    
    </body>
</html>
`);
  return {buildHTMLBodyEmail};
})();