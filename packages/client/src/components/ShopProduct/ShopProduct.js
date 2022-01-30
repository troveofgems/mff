import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import Loader from "../layout/Loader";
import {Form, Formik} from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormikTextInput from "../../formik/textInput";
import {
  FIRST_NAME_MAX_LEN,
  FIRST_NAME_MIN_LEN, LAST_NAME_MAX_LEN,
  LAST_NAME_MIN_LEN
} from "../UserProfile/validation/formik.validation.constants";
import FormikTextArea from "../../formik/textArea";
import FormikRadioGroup from "../../formik/radioGroup";
import FormikCheckbox from "../../formik/checkbox";
import {Image} from "react-bootstrap";


const ShopProduct = () => {
  const sizeLabels = ["xsm", "sm", "md", "lg", "xlg", "xxlg"];
  const adjustableSizes = ["xsmsm", "smmd", "mdlg", "lgxl", "xlgxxlg"];
  const
    [paletteOptions, setPaletteOptions] = useState([
      {
        bgColor: "#000",
        bgColorLabel: "Black"
      },
      {
        bgColor: "#fff",
        bgColorLabel: "White"
      },
      {
        bgColor: "#eee",
        bgColorLabel: "Grey"
      },
      {
        bgColor: "#e0f",
        bgColorLabel: "Fuschia"
      }
    ]),
    [formValues, setFormValues] = useState({
    product_name: "",
    product_category: "",
    product_price: "",
    product_description: "",
    product_file_upload: "",
    product_stock_type: "0",
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
    product_publish_to_shop: "0"
  });

  const
    location = useLocation(),
    { state: { pid = null } } = location;

  console.log('Location is: ', location);

  const handleRemoveHueFromPalette = hueToRemove => {
    let confirmation = prompt(`Confirm Removal of ${hueToRemove} From The Palette;\nCopy & Paste: ${hueToRemove}`);
    if(confirmation === hueToRemove) {
      let newList = paletteOptions.filter(hue => hue.bgColorLabel !== hueToRemove);
      return setPaletteOptions(newList);
    }
  };

  const handleRequestToAddToPalette = hueToAdd => {
    let newList = [...paletteOptions, hueToAdd];
    let
      hueNameField = document.getElementById('add_hue_name'),
      hueHexField = document.getElementById('add_hue_hex');
    hueNameField.value = "";
    hueHexField.value = "";
    return setPaletteOptions(newList);
  };

  return (
    <>
      <div style={{minWidth: "1200px"}}>
        <Formik
          initialValues={formValues}

          onSubmit={async (formData, {setSubmitting, resetForm}) => {
            console.log('Form Submitted. Time To Pre-process the data:', formData);
            //let updates = processChanges(formData, user);
            //console.log("Updates Have Been Processed And Are Ready To Be Sent To The Server", updates);
            setSubmitting(true);
            //Make Call TO Admin API Update User Call Here

            setSubmitting(false);
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
                              minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                              id={'product_name'} name={'product_name'}
                              type='text' placeholder='Blowfish Lamp'
                              disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                            />
                          </div>
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Category'
                            minLength={LAST_NAME_MIN_LEN} maxLength={LAST_NAME_MAX_LEN}
                            id={'product_category'} name={'product_category'}
                            type='text' placeholder='Merchandise'
                            disabled={formik.values.isBanned /*|| auth.authLevel === 1000*/}
                          />
                        </div>
                        <div className="form-row login-form-item">
                          <FormikTextInput
                            label='Price'
                            minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
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
                            label={"Product Description"} placeholder={"Product Description Here"}
                            id={'product_description'} name={'product_description'}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <h4>Product Image Details</h4>
                    <Col md={6}>
                      <label className="rl-label">File Upload</label>
                      <div>
                        <input
                          type="file" name="product_file_upload" id="file" style={{cursor: 'pointer'}}
                          /*onChange={evt => {
                            setFieldValue("set_productImage", evt.currentTarget.files[0]);
                            previewFile(window);
                          }}*/
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <Image
                        id='productImageWindow'
                        className="user-avatar big"
                        style={{height: '300px', width: '300px'}}
                        //src={/*(values && values.set_productImage) ? previewFile(window) : '/images/site/brand/logo.png'*/}
                        alt="Image Preview"
                      />
                    </Col>
                  </Row>
                  <Row className={"my-5 mb-5"}>
                    <h4>Advanced Product Configuration Details</h4>
                    <Col md={4}>
                      <h5>Stock</h5>
                      <Row>
                        <Col md={3}>
                          <FormikRadioGroup
                            name={"product_stock_type"} label={"Type"} style={{flexDirection: "column!important"}}
                            options={[{valueLabel: "Infinite"}, {valueLabel: "No Stock"}, {valueLabel: "Finite"}]}
                            idPrefix={"productStockType"}
                            currentlySelectedOption={formik.values.product_stock_type}
                          />
                        </Col>
                        {formik.values.product_stock_type === "2" && (
                          <Col>
                            <FormikTextInput
                              label='Product Stock'
                              minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                              id={'product_stock_count'} name={'product_stock_count'}
                              type='number' placeholder='30'
                              disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                            />
                          </Col>
                        )}
                      </Row>
                    </Col>
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
                            {sizeLabels.map(option => (
                              <FormikCheckbox
                                children={option}
                                id={option} name={option}
                                onClick={() => formik.values.product_size_options[0][option] = !formik.values.product_size_options[0][option]}
                              />
                            ))}
                          </Col>
                          <Col md={6}>
                            {adjustableSizes.map(option => (
                              <FormikCheckbox
                                children={option}
                                id={`${option}`} name={`${option}`}
                                onClick={() => formik.values.product_size_options[1][option] = !formik.values.product_size_options[1][option]}
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
                                                style={{backgroundColor: `${hueOption.bgColor}`, width: "20px", height: "20px"}}
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
                                              style={{backgroundColor: `${hueOption.bgColor}`, width: "20px", height: "20px"}} />
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
                                    label='Name'
                                    minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                                    id={'add_hue_name'} name={'add_hue_name'}
                                    type='text' placeholder='Oceanic Blue'
                                    disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                                  />
                                  <FormikTextInput
                                    label='Hex Code'
                                    minLength={FIRST_NAME_MIN_LEN} maxLength={FIRST_NAME_MAX_LEN}
                                    id={'add_hue_hex'} name={'add_hue_hex'}
                                    type='text' placeholder='#800000'
                                    disabled={formik.values.isBanned/* || auth.authLevel === 1000*/}
                                  />
                                </Col>
                                <Col md={3}>
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
                  </Row>
                  <Row className={"my-5 mb-5"}>
                    <h4>Publish To Shop</h4>
                    <Col md={6}>
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
                      {pid ? "Edit" : "Create"} Product
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