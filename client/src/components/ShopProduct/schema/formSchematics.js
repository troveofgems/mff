export const createOrUpdateProductFormSchema = {
  product_name: "",
  product_category: "",
  product_price: "",
  product_description: "",
  product_file_upload: "",
  product_stock_type: 0,
  product_stock_count: 0,
  product_includes_size_options: false,
  product_includes_hue_options: false,
  product_size_options: [{
    xsm: false,
    sm: false,
    md: false,
    lg: false,
    xlg: false,
    xxlg: false
  }, {
    xsmsm: false,
    smmd: false,
    mdlg: false,
    lgxlg: false,
    xlgxxlg: false
  }],
  product_hue_options: [],
  product_includes_promo_code_options: false,
  product_promo_code_list: "",
  product_publish_to_shop: 0
};