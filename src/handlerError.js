'use stric';

const createError = require('http-errors');

// catch 404 and forward to error handler
module.exports.notFound = (req, res, next) => {
  next(createError(404));
};

module.exports.InternalServerError = (err, req, res, next) => {
  // console.log(err);
  if (err.array) {
    // error de validación
    err.status = 422;
    const errInfo = err.array({onlyFirstError: true})[0];
    err.message = `Param ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if (req.originalUrl.startsWith('/api/')) {
    // API request
    res.json({error: err.message});
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
};
