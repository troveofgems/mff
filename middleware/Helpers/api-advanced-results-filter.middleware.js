module.exports.apiAdvancedResultsFilter = (model, populate, bypassDefaultFilters) => async (req, res, next) => {
  console.log('The Referrer was: ', req.headers.referer);
  const t = req.headers.referer.split('?');
  t.shift();
  let fromEntries = [];
  t.map(param => {
    let paramArr = param.split('=');
    fromEntries.push(paramArr);
  });
  let requestedPage = Object.fromEntries(fromEntries).page || 1;
  let query;
  const reqQuery = { ...req.query };

  // Field Projection
  const removeFields = ['search', 'select', 'sort', 'pageNumber', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  if (!bypassDefaultFilters) {
    if(model.collection.modelName === "Product") {
      reqQuery.publishedToShop = true;
    }
  }

  if (reqQuery.keyword) {
    console.log("Keyword exists, make a change...");
    reqQuery.name = {
      $regex: reqQuery.keyword,
      $options: 'i'
    };
    delete reqQuery.keyword;
  }

  let queryStr = JSON.stringify(reqQuery);
  console.log(queryStr);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  console.log('queryStr prior to model is: ', queryStr);
  query = model.find(JSON.parse(queryStr));

  if (req.query.select) {
    console.log("INSIDE SELECT");
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    console.log("INSIDE SORT");
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort({ "createdAt": 'asc', name: -1 });
  }

  // Pagination
  req.query.page 	 = requestedPage;
  const page 			 = parseInt(req.query.page, 10) || 1;
  const drawLimit	 = parseInt(req.query.limit, 10) || 500;
  const pageLimit  = parseInt(req.query.pageLimit, 10) || 2;
  const startIndex = (page - 1) * pageLimit;
  const finalIndex = page * pageLimit;
  const totalDocs	 = await model.countDocuments();

  query = query.skip(startIndex).limit(drawLimit);

  if (populate) {
    query = query.populate(populate);
  }

  const
    queryResult = await query,
    count				= queryResult.length,
    pagination  = {};

  console.log('QUERY RESULT WAS: ', queryResult);

  pagination.totalPages = Math.ceil(count / pageLimit);

  if (finalIndex < totalDocs) {
    pagination.next = {
      page: page + 1,
      pageLimit
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      pageLimit
    }
  }

  res.advancedResults = {
    success: true,
    count,
    totalDocs,
    pagination,
    data: queryResult,
    loading: false
  };

  next();
};
