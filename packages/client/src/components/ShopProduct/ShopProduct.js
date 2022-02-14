import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import Loader from "../layout/Loader";
import {Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormikTextInput from "../../formik/textInput";
import FormikTextArea from "../../formik/textArea";
import FormikRadioGroup from "../../formik/radioGroup";
import FormikCheckbox from "../../formik/checkbox";
import {Image} from "react-bootstrap";
import axios from "axios";

import {
  adminCreateProduct, adminUpdateProduct, adminGetProductById
} from "../../redux/actions/admin.actions";

import {createOrUpdateProductFormSchema} from "./schema/formSchematics";
import {regularSizeOptions, adjustableSizeOptions, basicPaletteOptions} from "./helpers/product.helpers";
import { // Needs To Be Implemented
  PRODUCT_NAME_MIN_LEN, PRODUCT_NAME_MAX_LEN, PRODUCT_CATEGORY_MIN, PRODUCT_CATEGORY_MAX,
  PRODUCT_PRICE_MIN, PRODUCT_PRICE_MAX, PRODUCT_DESCRIPTION_MIN, PRODUCT_DESCRIPTION_MAX,
  PRODUCT_STOCK_COUNT_MIN, PRODUCT_STOCK_COUNT_MAX, PRODUCT_HUE_NAME_MIN, PRODUCT_HUE_NAME_MAX,
  PRODUCT_HUE_HEX_MIN, PRODUCT_HUE_HEX_MAX, PRODUCT_PROMO_CODE_LIST_MIN, PRODUCT_PROMO_CODE_LIST_MAX
} from "./validation/formik.validation.constants";

import {translateSizeOptionLabel} from "../../utils/dev.utils";

const ShopProduct = () => {
  const
    dispatch = useDispatch(),
    navigate = useNavigate(),
    userLogin = useSelector(state => state.userLogin),
    viewProduct = useSelector(state => state.viewProduct),
    {loading: loadingProduct, success: loadingProductSuccess, error: loadingProductError, product } = viewProduct,
    { auth: { authLevel = 2000, token = null } } = userLogin,
    [formValues, setFormValues] = useState(createOrUpdateProductFormSchema),
    [paletteOptions, setPaletteOptions] = useState(basicPaletteOptions),
    [image, setImage] = useState(""),
    [uploading, setUploading] = useState(false);

  const
    location = useLocation(),
    {state: {pid = null}} = location;

  useEffect(() => {
    if (pid) { // Get Data For Product If Pid Was Provided
      dispatch(adminGetProductById(token, pid));
    }
  }, []);

  useEffect(() => {
    let continueWithPrefill = pid && loadingProductSuccess && product;
    if (continueWithPrefill) {
      let newFormState = {...formValues};
      newFormState.product_name = product ? product.name : "";
      newFormState.product_category = product ? product.category : "";
      newFormState.product_price = product ? product.price : "";
      newFormState.product_description = product ? product.description : "";

      // Bundled Fields Logic
      newFormState.product_stock_type = product ? product.stockType : 0;
      if (newFormState.product_stock_type === 2) {
        newFormState.product_stock_count = product ? product.stockCount : 0;
      }

      newFormState.product_includes_size_options = product ? product.sizeOptionsAvailable : false;
      if (newFormState.product_includes_size_options) {
        newFormState.product_size_options = [product.sizeOptionList.regularSizeList, product.sizeOptionList.adjustableSizeList];
      }

      newFormState.product_includes_hue_options = product ? product.hueOptionsAvailable : false;
      if (newFormState.product_includes_hue_options) {
        newFormState.product_hue_options = product ? product.hueOptionList : paletteOptions;
        setPaletteOptions(newFormState.product_hue_options);
      }

      newFormState.product_includes_promo_code_options = product ? product.promoCodesAvailable : false;
      if (newFormState.product_includes_promo_code_options) {
        newFormState.product_promo_code_list = product ? product.promoCodeList : "";
      }

      product ? setImage(product.image) : setImage("christoffer-engstrom-wc9avd2RaN0-unsplash.jpg");

      newFormState.product_publish_to_shop = (product && product.publishedToShop) ? "1" : "0";

      console.log(newFormState);
      setFormValues(newFormState);
    }

  }, [pid, loadingProductSuccess, product]);


  // Shop Product Helpers TODO: Move To Appropriate File
  const handleRemoveHueFromPalette = hueToRemove => {
    let confirmation = prompt(`Confirm Removal of ${hueToRemove} From The Palette;\nCopy & Paste: ${hueToRemove}`);
    if (confirmation === hueToRemove) {
      let newList = paletteOptions.filter(hue => hue.bgColorLabel !== hueToRemove);
      return setPaletteOptions(newList);
    }
  };
  const handleRequestToAddToPalette = hueToAdd => {
    let newList = [...paletteOptions, hueToAdd];
    return setPaletteOptions(newList);
  };

  const processChanges = (formData, palette, authLevel) => {
    let updates = { // Base Object
      name: formData.product_name,
      price: formData.product_price,
      category: formData.product_category,
      description: formData.product_description,
      stockType: parseInt(formData.product_stock_type),
      hueOptionsAvailable: formData.product_includes_hue_options,
      sizeOptionsAvailable: formData.product_includes_size_options,
      promoCodesAvailable: formData.product_includes_promo_code_options,
      publishedToShop: parseInt(formData.product_publish_to_shop) === 1
    };

    if (updates.stockType === 2) {
      updates.stockCount = formData.product_stock_count;
    }

    if (updates.hueOptionsAvailable) {
      updates.hueOptionList = [...palette];
    }

    if (updates.sizeOptionsAvailable) {
      updates.sizeOptionList = {
        regularSizeList: formData.product_size_options[0],
        adjustableSizeList: formData.product_size_options[1]
      };
    }

    if (image !== "") {
      updates.image = image.split('/')[2];
    } else {
      updates.image = "christoffer-engstrom-wc9avd2RaN0-unsplash.jpg";
    }

    if (updates.promoCodesAvailable) {
      updates.promoCodeList = formData.product_promo_code_list;
    }

    console.log(updates);

    if (authLevel === 1000) { // User Is Auditor. Allow Them To Create In Read Only Mode...
      updates.publishedToShop = 0;
      console.log('Data Prepped: ', updates);
      alert("Since you are an auditor, your product will not be published to the front-end of the shop.");
    }
    return updates;
  };
  const handleFileUpload = async evt => {
    console.log('Request To Upload File', evt.target.files[0]);
    let file = evt.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const { data } = await axios.post('/api/upload', formData, config);
      console.log('Data from post request is: ', data);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <>
      <div style={{minWidth: "1200px"}}>
        <Formik
          initialValues={formValues}
          onSubmit={async (formData, {setSubmitting, resetForm}) => {
            let updates = processChanges(formData, paletteOptions, authLevel);
            setSubmitting(true);
            if (!pid && authLevel < 2000) {
              await dispatch(adminCreateProduct(token, updates));
            } else if (pid && authLevel <= 100) {
              await dispatch(adminUpdateProduct(token, pid, updates));
            }
            setSubmitting(false);
            resetForm();
            return navigate("/l1ra/products", {state: {}});
          }}
          enableReinitialize
        >
          {formik => (
            <>
              {formik.isSubmitting ? (
                <>
                  <Loader/>
                </>
              ) : (
                <Form className="form-box form-wrap content-wrapper" style={{minWidth: "1200px"}}>
                  <Row className={"mb-5"}>
                    <h4>Basic Product Details</h4>
                    <Col md={4}>
                      <div className={"field-container"}>
                        <div className="form-row">
                          <div className="form-item login-form-item" style={{width: "100%!important"}}>
                            <FormikTextInput
                              label='Product Name'
                              minLength={PRODUCT_NAME_MIN_LEN} maxLength={PRODUCT_NAME_MAX_LEN}
                              id={'product_name'} name={'product_name'}
                              type='text' placeholder='Blowfish Lamp'
                              disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Category'
                            minLength={PRODUCT_CATEGORY_MIN} maxLength={PRODUCT_CATEGORY_MAX}
                            id={'product_category'} name={'product_category'}
                            type='text' placeholder='Merchandise'
                            disabled={formik.values.isBanned /*|| auth.authLevel === 1000*/}
                          />
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Price'
                            minLength={PRODUCT_PRICE_MIN} maxLength={PRODUCT_PRICE_MAX}
                            id={'product_price'} name={'product_price'}
                            type='text' placeholder='$15.99'
                            disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className={"field-container"} style={{minWidth: "100%"}}>
                        <div className="form-row login-form-item" style={{minWidth: "100%"}}>
                          <FormikTextArea
                            minLength={PRODUCT_DESCRIPTION_MIN} maxLength={PRODUCT_DESCRIPTION_MAX}
                            label={"Product Description"} placeholder={"Product Description Here"}
                            id={'product_description'} name={'product_description'}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className={"mb-5"}>
                    <h4>Product Image Details</h4>
                    <Col md={6}>
                      <label className="rl-label">File Upload</label>
                      <div>
                        <input type={"text"} placeholder={"img/url/here"} value={image} readOnly disabled/>
                      </div>
                      <div>
                        <input
                          type="file" name="product_file_upload" id="file" style={{cursor: 'pointer'}}
                          onChange={evt => handleFileUpload(evt)}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      {uploading ? (
                        <Loader />
                      ) : (
                        <Image
                          id='productImageWindow'
                          className="user-avatar big"
                          style={{height: '200px', width: '200px'}} src={image}
                          alt="Image Preview"
                        />
                      )}
                    </Col>
                  </Row>
                  <Row className={"my-5 mb-5"}>
                    <h4>Advanced Product Configuration Details</h4>
                    <Col md={4}>
                      <h5>Sizes</h5>
                      <FormikCheckbox
                        children={"Enable Size Options"}
                        id={"product_includes_size_options"}
                        name={"product_includes_size_options"}
                      />
                      <hr/>
                      {formik.values.product_includes_size_options && (
                        <Row>
                          <Col md={6}>
                            {regularSizeOptions.map((option, index) => (
                              <FormikCheckbox
                                children={translateSizeOptionLabel(option)}
                                id={"product_size_options[0][" + [option] + "]"}
                                name={"product_size_options[0][" + [option] + "]"}
                                onClick={() => formik.values.product_size_options[0][option] =
                                  !formik.values.product_size_options[0][option]
                                }
                              />
                            ))}
                          </Col>
                          <Col md={6}>
                            {adjustableSizeOptions.map(option => (
                              <FormikCheckbox
                                children={translateSizeOptionLabel(option)}
                                id={"product_size_options[1][" + [option] + "]"}
                                name={"product_size_options[1][" + [option] + "]"}
                                onClick={() => formik.values.product_size_options[1][option] =
                                  !formik.values.product_size_options[1][option]
                                }
                              />
                            ))}
                          </Col>
                        </Row>
                      )}
                    </Col>
                    <Col md={4}>
                      <h5>Hues</h5>
                      <FormikCheckbox
                        children={"Enable Hue Options"}
                        id={"product_includes_hue_options"}
                        name={"product_includes_hue_options"}
                      />
                      <hr/>
                      {formik.values.product_includes_hue_options && (
                        <>
                          {paletteOptions.length > 0 && (
                            <Row>
                              {paletteOptions.map((hueOption, index) => (
                                <>
                                  {((index + 1) % 4) === 0 ? (
                                    <Col md={4} className={"py-3 pb-0 mb-0"}>
                                      <div key={index}>
                                        <div
                                          key={`${hueOption.bgColorLabel}`}
                                          onClick={() => handleRemoveHueFromPalette(hueOption.bgColorLabel)}
                                          className={"hue-palette cursor-pointer pe-auto"}
                                          style={{
                                            backgroundColor: `${hueOption.bgColor}`,
                                            width: "20px",
                                            height: "20px"
                                          }}
                                        />
                                        <div>{hueOption.bgColorLabel}</div>
                                        <div>{hueOption.bgColor}</div>
                                      </div>
                                    </Col>
                                  ) : (
                                    <Col md={4} className={"py-3 pb-0 mb-0"}>
                                      <div key={`${hueOption.bgColorLabel}`}>
                                        <div
                                          onClick={() => handleRemoveHueFromPalette(hueOption.bgColorLabel)}
                                          className={"hue-palette cursor-pointer"}
                                          style={{
                                            backgroundColor: `${hueOption.bgColor}`,
                                            width: "20px",
                                            height: "20px"
                                          }}/>
                                        <div>{hueOption.bgColorLabel}</div>
                                        <div>{hueOption.bgColor}</div>
                                      </div>
                                    </Col>
                                  )}
                                </>
                              ))}
                            </Row>
                          )}
                          <hr/>
                          <Row>
                            <Col>
                              <Row>
                                <Col>
                                  <FormikTextInput
                                    label='Hue Name'
                                    minLength={PRODUCT_HUE_NAME_MIN} maxLength={PRODUCT_HUE_NAME_MAX}
                                    id={'add_hue_name'} name={'add_hue_name'}
                                    type='text' placeholder='Oceanic Blue'
                                    disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                                  />
                                  <FormikTextInput
                                    label='Hex Code'
                                    minLength={PRODUCT_HUE_HEX_MIN} maxLength={PRODUCT_HUE_HEX_MAX}
                                    id={'add_hue_hex'} name={'add_hue_hex'}
                                    type='text' placeholder='#800000'
                                    disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                                  />
                                </Col>
                                <Col md={4}>
                                  <button type={"button"} onClick={() => handleRequestToAddToPalette({
                                    bgColor: formik.values.add_hue_hex,
                                    bgColorLabel: formik.values.add_hue_name
                                  })} className={"text-black my-2"}>
                                    Add Hue
                                  </button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </>
                      )}
                    </Col>
                    <Col md={3}>
                      <h5>Promo Codes</h5>
                      <FormikCheckbox
                        children={"Enable Promo Codes"}
                        id={"product_includes_promo_code_options"}
                        name={"product_includes_promo_code_options"}
                      />
                      <hr/>
                      {formik.values.product_includes_promo_code_options && (
                        <FormikTextArea
                          label={"Promo Code List"}
                          minLength={PRODUCT_PROMO_CODE_LIST_MIN} maxLength={PRODUCT_PROMO_CODE_LIST_MAX}
                          placeholder={"PC-SunlightZone@200Meters,\nPC-TwilightZone@1000Meters,\nPC-MidnightZone@4000Meters,\nPC-TheAbyss@6000Meters,\nPC-TheTrenches@11000Meters,\n\t..."}
                          id={'product_promo_code_list'} name={'product_promo_code_list'}
                        />
                      )}
                    </Col>
                  </Row>
                  <Row className={"my-5 mb-5"}>
                    <Col md={4}>
                      <h4>Stock Type</h4>
                      <Row>
                        <Col md={4}>
                          <FormikRadioGroup
                            name={"product_stock_type"} style={{flexDirection: "column!important"}}
                            options={[{valueLabel: "Infinite"}, {valueLabel: "Out"}, {valueLabel: "Finite"}]}
                            idPrefix={"productStockType"}
                            currentlySelectedOption={formik.values.product_stock_type}
                          />
                        </Col>
                        {parseInt(formik.values.product_stock_type) === 2 && (
                          <Col>
                            <FormikTextInput
                              label='Product Stock Count'
                              minLength={PRODUCT_STOCK_COUNT_MIN} maxLength={PRODUCT_STOCK_COUNT_MAX}
                              id={'product_stock_count'} name={'product_stock_count'}
                              type='number' placeholder='30'
                              disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                            />
                          </Col>
                        )}
                      </Row>
                    </Col>
                    <Col md={6}>
                      <h4>Publish To Shop</h4>
                      <FormikRadioGroup
                        name={"product_publish_to_shop"}
                        options={[{valueLabel: "Save"}, {valueLabel: "Publish"}]}
                        idPrefix={"publishProduct"}
                        currentlySelectedOption={formik.values.product_publish_to_shop}
                      />
                    </Col>
                  </Row>
                  <div className="form-actions full py-4 pb-1">
                    <button type="submit" className="button full text-black login-btn"
                    >
                      {pid ? "Update" : "Create"} Product
                    </button>
                  </div>
                </Form>
              )}
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ShopProduct;