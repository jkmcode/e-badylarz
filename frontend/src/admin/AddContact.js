import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../component/Loader";
import ErrorMessage from "../component/ErrorMessage";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { addContact } from "../actions/adminActions";
import { getShopContacts, getShops, getShopSpots } from "../actions/adminActions";
import { unOrActiveList } from "../actions/adminActions";
import { Icon } from "@iconify/react";
import InfoWindow from "../component/infoWindow";
import Rocket from "../images/rocket.png";
import {
  SHOP_CONTACT_DESCRIPTION,
  SHOP_SPOT_DESCRIPTION,
  GET_CONTACT_LIST_DELETE,
  GET_SOPTS_LIST_DELETE,
  GET_SHOP_DELETE,
  SET_WINDOW_FLAG_DELETE,
} from "../constants/adminConstans";

function AddContact() {

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const shopId = Number(params.id);

  const [space, setSpace] = useState("  ");

  const [newContact, setNewContact] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [idContact, setIdContact] = useState();
  const [idContactActive, setIdContactActive] = useState();
  const [activeContact, setActiveContact] = useState(true);

  const [newSpot, setNewSpot] = useState(false);
  const [editSpot, setEditSpot] = useState(false);
  const [idSpot, setIdSpot] = useState();
  const [idSpotActive, setIdSpotActive] = useState();
  const [activeSpot, setActiveSpot] = useState(true);

  const [infoWindowFlag, setInfoWindowFlag] = useState(false);
  // if contactOrSpot is true -> contact else - spot
  const [contactOrSpot, setContactOrSpot] = useState(true);

  // data from redux
  const contactListRedux = useSelector((state) => state.contactList);
  const { ListOfContact, loading, error } = contactListRedux;

  const contactActivRedux = useSelector((state) => state.unOrActiveDescription);
  const { loading: activeLoading, error: activeError, success } = contactActivRedux;

  const shopListRedux = useSelector((state) => state.shopList);
  const { shopList, loading: shopListLoading, error: shopListError } = shopListRedux;

  const spotListRedux = useSelector((state) => state.shopSpotsList);
  const { shopSpotList, successAdd, loading: spotListLoading, error: spotListError } = spotListRedux;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const shopFlagVar = useSelector((state) => state.windowFlag);
  const { windowFlag } = shopFlagVar;

  const unActiveHandler = (id) => {
    setInfoWindowFlag(true)
    setIdContactActive(id)
    setContactOrSpot(true)
  };

  const unActiveSpotHandler = (id) => {
    setInfoWindowFlag(true)
    setIdSpotActive(id)
    setContactOrSpot(false)
  };

  const activeHandler = (id) => {
    setInfoWindowFlag(true)
    setIdContactActive(id)
    setContactOrSpot(true)
  };

  const activeSpotHandler = (id) =>{
    setInfoWindowFlag(true)
    setIdSpotActive(id)
    setContactOrSpot(false)
  }

  const newHendler =() =>{
    setEditContact(false)
    setNewContact(!newContact)
    reset({})
  }

  const newHendlerSpot =() =>{
    console.log("TEST !!!!!!!!!!  ----> drugi")
    navigate(`/dashboard/shops/shops/spot/${shopId}/add`)
  }

  const editShopHandler =()=>{
    console.log("TEST !!!!!!!!!!")
    navigate(`/dashboard/shops/shops/${shopId}/edit`)
  }

  const editSpotHandler =(id)=>{
    console.log("TEST !!!!!!!!!! - edycja punktu ",id)
    navigate(`/dashboard/shops/shops/spot/${shopId}/edit/${id}`)
  }

  const editHandler =(id) =>{
    setNewContact(true)
    setEditContact(true)
    ListOfContact.map((i) =>{
      if (i.id ===id) {
        setIdContact(id)
        reset({
          firstName: i.name,
          surname: i.surname,
          email: i.email,
          phone: i.phone,
          description: i.description,
        });
      }     
    })
  }
  // Change status contact & spot and close infoWindow
  useEffect(() => {
    if(contactOrSpot){
      if (windowFlag===true & activeContact) {  
        console.log("windowFlag --> ",windowFlag,"activeContact-->",activeContact)  
        dispatch(
          unOrActiveList({
            Id: idContactActive,
            shop_id:shopId,
            active: false,
            userId: userInfo.id,
            objType: SHOP_CONTACT_DESCRIPTION,
            kind: "Inactive contact",
        }));
      }
     if (windowFlag===true & !activeContact) {  
          console.log("windowFlag --> ",windowFlag,"activeContact-->",activeContact)
          dispatch(
            unOrActiveList({
              Id: idContactActive,
              shop_id:shopId,
              active: true,
              userId: userInfo.id,
              objType: SHOP_CONTACT_DESCRIPTION,
              kind: "Active contact",
            })
          );
      }

    }else{
      if (windowFlag===true & !activeSpot) {  
        console.log("windowFlag --> ",windowFlag,"activeSpot-->",activeContact)
        dispatch(
          unOrActiveList({
            Id: idSpotActive,
            shop_id:shopId,
            active: true,
            userId: userInfo.id,
            objType: SHOP_SPOT_DESCRIPTION,
            kind: "Active spot",
          })
        );
      }
     if (windowFlag===true & activeSpot) {  
        console.log("windowFlag --> ",windowFlag,"activeSpot-->",activeContact)
        dispatch(
          unOrActiveList({
            Id: idSpotActive,
            shop_id:shopId,
            active: false,
            userId: userInfo.id,
            objType: SHOP_SPOT_DESCRIPTION,
            kind: "Inactive spot",
          })
        );
      }

    }
    
   
    setInfoWindowFlag(false)
  }, [dispatch, windowFlag]);

  // Delete contact list after activation or deactivation
  useEffect(() => {
    if (success) {
      dispatch({ type: GET_CONTACT_LIST_DELETE });
      dispatch({ type: SET_WINDOW_FLAG_DELETE });
      dispatch({ type: GET_SOPTS_LIST_DELETE });
    }
  }, [dispatch, success]);

  //   // Delete spots list after activation or deactivation
  // useEffect(() => {
     
  //       dispatch({ type: GET_CONTACT_LIST_DELETE });
      
  // }, []);

  // fetching list of contact & spots from DB
  useEffect(() => {
    if (ListOfContact.length === 0) {
      dispatch(getShopContacts({ Id: shopId }));
    }
    if (shopSpotList.length === 0) {
      dispatch(getShopSpots({ Id: shopId }));
    }
  }, [dispatch, ListOfContact.length, shopSpotList.length]);

  // fetching shop from DB 
   useEffect(() => {
    if (shopList.length === 0) {
      dispatch(getShops());
    }
   }, [dispatch, shopList.length]);

   useEffect(() => {
    dispatch({ type: GET_SOPTS_LIST_DELETE });
    dispatch({ type: GET_CONTACT_LIST_DELETE });
   }, []);

  const onSubmit = (data) => {
    if(editContact){
        const insertData = {
          shop_id: shopId,
          Id: idContact,
          editing:true, 
          firstName: data.firstName,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          description:data.description,
          creator: userInfo.id,
          modifier: userInfo.id,
        }
        setEditContact(false)
        setNewContact(false)
        dispatch(addContact(insertData));
      } 
     else {
        const insertData = {
          shop_id: shopId,
          editing:false, 
          firstName: data.firstName,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          description:data.description,
          creator: userInfo.id,
          modifier: userInfo.id,
        }
        setNewContact(false)
        setEditContact(false)
        dispatch(addContact(insertData));
      };
  };

  // style
  const btnDelete = {
    backgroundColor: "white",
    border: "none",
    fontWeight: "bold",
  };

  return (
    <div className="full-screen">
      {loading || activeLoading || shopListLoading || spotListLoading ? (
        <Loader />
      ) : (
        <Row className="gx-0 ">
          {infoWindowFlag & contactOrSpot ? 
            <InfoWindow
                title={t("Window_title")}
                body={
                  !activeContact
                      ? t("AdminShops_activate_shop_InfoWindow_body")
                      : t("AdminShops_inactivate_shop_InfoWindow_body")
                  }
              />  
              :null       
          }
          {infoWindowFlag & !contactOrSpot ? 
            <InfoWindow
                title={t("Window_title")}
                body={
                  !activeSpot
                      ? t("AdminShops_activate_shop_InfoWindow_body")
                      : t("AdminShops_inactivate_shop_InfoWindow_body")
                  }
              />  
              :null       
          }
          <Col lg={4}>
            <div className="mx-2 bg-container mt-5 p-4 rounded">
              {error ? <ErrorMessage msg={error} timeOut={4000} />             
                : activeError ? <ErrorMessage msg={activeError} timeOut={4000} />
                : shopListError ? <ErrorMessage msg={shopListError} timeOut={4000} />              
                : spotListError ? <ErrorMessage msg={spotListError} timeOut={4000} />
                :null}             
              
              <Link to="/dashboard/shops/shops" className="text-dark h6">
                <Icon icon="ion:arrow-back" />
                {t("btn-return")}
              </Link>
              <div className="d-flex justify-content-center display-6">
                <div className="px-3">{t("AddContact_main_data")}</div>
              </div>


                     {/* Main data   */}
              {/* Name */}
              {shopList.length === 0 ? null
              :
              <>
                <div className=" text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_name")}:
                  <div className="text-dark h5">                 
                    {shopList.filter((shop) => shop.id === shopId)[0].name}
                  </div>
                </div>
                {/* NIP */}
                <div className=" text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_nip")}:
                  <div className="text-dark h5">
                    {shopList.filter((shop) => shop.id === shopId)[0].nip}
                  </div>
                </div>
                {/* Address */}
                <div className=" text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_address")}:
                  <div className="text-dark h6">
                    {shopList.filter((shop) => shop.id === shopId)[0].city}, { space }
                    {shopList.filter((shop) => shop.id === shopId)[0].street} { space }
                    {shopList.filter((shop) => shop.id === shopId)[0].no_building}, { space }
                    {shopList.filter((shop) => shop.id === shopId)[0].post_code} { space }
                    {shopList.filter((shop) => shop.id === shopId)[0].post} 
                  </div>
                </div>                                 
                {/* GPS */}
                <div className=" text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_GPS")}:
                  <div className="text-dark h6">
                    {shopList.filter((shop) => shop.id === shopId)[0].latitude}, { space }
                    {shopList.filter((shop) => shop.id === shopId)[0].longitude}
                  </div>
                </div> 
                {/* Bank account*/}
                <div className=" text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_bank")}:
                  <div className="text-dark h6">
                    {shopList.filter((shop) => shop.id === shopId)[0].bank_account}
                  </div>
                </div> 
                <Button
                                    variant="success"
                                    className="rounded my-3"
                                    onClick={() => editShopHandler()}
                                    
                        >
                         {t("btn-change")}
                </Button>
                <img className="img-contact" src={Rocket}></img>
              </>
              }
            </div>
          </Col>
          <Col lg={8}>
            <div className="bg-container mt-5 p-4 mx-2 rounded">
              <div className="d-flex justify-content-center h4">
                <div className="px-3">{t("AddContact_contactList")}</div>
              </div>
              <div className="d-flex justify-content-between">
                                  <button
                                    className="text-xs text-success"
                                    onClick={() => newHendler()}
                                    >
                                    {!newContact ?
                                    t("AddContact_btn_add")
                                    : editContact ? 
                                        t("AddContact_btn_close_edit")
                                      : t("AddContact_btn_close")}
                                </button>
                                                     
                                <button
                                    className="text-xs text-danger"
                                    onClick={() => setActiveContact(!activeContact)}
                                    >
                                    {activeContact ? 
                                    t("AddContact_show_unactive") 
                                    : t("AddContact_show_active")}
                                </button>
                               

              </div>

              <Table striped hover responsive className="table-sm mt-2">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_name")}
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_phone")}
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_email")}
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AdminShops_status")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ListOfContact.length !==0 ? 
                      ListOfContact.map((contact) => (
                        <tr key={contact.id}>
                          {contact.is_active & activeContact ? 
                          <>
                            <td>{contact.name} {contact.surname}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">
                                {t("status_active")}
                              </span>
                            </td>
                            <td className="align-middle">
                                    <button
                                      style={btnDelete}
                                      className="text-xs text-danger"
                                      onClick={() => unActiveHandler(contact.id)}
                                    >
                                      {t("btn_unactive")}
                                    </button>
                            </td>
                            <td className="align-middle">
                                    <button
                                      style={btnDelete}
                                      className="text-xs text-worning"
                                      onClick={() => editHandler(contact.id)}
                                    >
                                      {t("btn_edit")}
                                    </button>
                            </td>
                          </>    
                          : null}
                          {!contact.is_active & !activeContact ? 
                          <>
                            <td>{contact.name} {contact.surname}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">
                                {t("status_inactive")}
                              </span>
                            </td>
                            <td className="align-middle">
                                    <button
                                      style={btnDelete}
                                      className="text-xs text-danger"
                                      onClick={() => activeHandler(contact.id)}
                                    >
                                      {t("btn_active")}
                                    </button>
                              </td>
                          </>    
                          : null}
                        </tr>
                      ))                 
                
                  :t("No_data") }

                </tbody>
              </Table>
              {newContact ? 
                            <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                            <button
                                className="text-xs text-success"
                                onClick={() => setNewContact(!newContact)}
                                  >
                                      {editContact ? 
                                      t("AddContact_btn_close_edit") 
                                      : t("AddContact_btn_close")}
                              </button>
                            <div className="d-flex justify-content-center h4">
                                <div className="px-3">
                                  {editContact ? 
                                  t("AddContact_edit_title")
                                  :t("AddContact_new_title")}
                                </div>
                            </div>
                              <Col md={12} lg={3}>
                                <Form.Group controlId="firstName">
                                  <Form.Label className="form-msg-style ms-2">
                                    {t("AddContact_label_name")}
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className={errors.firstName ? "formInvalid" : null}
                                    placeholder={t("AddContact_name_placeholder")}
                                    {...register("firstName", {
                                      required: t("Form_field_required"),
                                      pattern: {
                                        value: /^[A-Za-z0-9ąśŚćĆęłŁńóżŻźŹ ]+$/,
                                        message: t("Form_letters_pl_and_digits"),
                                      },
                                      minLength: {
                                        value: 3,
                                        message: t("Form_minLength_3"),
                                      },
                                      maxLength: {
                                        value: 14,
                                        message: t("Form_maxLength_14"),
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("firstName");
                                    }}
                                    name="firstName"
                                  ></Form.Control>
                                  {errors.firstName && (
                                    <div className="text-danger form-msg-style">
                                      {errors.firstName.message}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md={12} lg={3}>
                                <Form.Group controlId="surname">
                                  <Form.Label className="form-msg-style ms-2">
                                    {t("AddContact_label_surname")}
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className={errors.surname ? "formInvalid" : null}
                                    placeholder={t("AddContact_surname_placeholder")}
                                    {...register("surname", {
                                      required: t("Form_field_required"),
                                      pattern: {
                                        value: /^[A-Za-z0-9ąćĆęłŁńóżŻźŹ ]+$/,
                                        message: t("Form_letters_pl_and_digits"),
                                      },
                                      minLength: {
                                        value: 3,
                                        message: t("Form_minLength_3"),
                                      },
                                      maxLength: {
                                        value: 30,
                                        message: t("Form_maxLength_30"),
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("surname");
                                    }}
                                    name="surname"
                                  ></Form.Control>
                                  {errors.surname && (
                                    <div className="text-danger form-msg-style">
                                      {errors.surname.message}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md={12} lg={3}>
                                <Form.Group controlId="email">
                                  <Form.Label className="form-msg-style ms-2">
                                    {t("AddContact_label_email")}
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className={errors.email ? "formInvalid" : null}
                                    placeholder={t("AddContact_email_placeholder")}
                                    {...register("email", {
                                      required: t("Form_field_required"),
                                      pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: t("Form_inproper_pattern_email"),
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("email");
                                    }}
                                    name="email"
                                  ></Form.Control>
                                  {errors.email && (
                                    <div className="text-danger form-msg-style">
                                      {errors.email.message}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                              <Col md={12} lg={3}>
                                <Form.Group controlId="phone">
                                  <Form.Label className="form-msg-style ms-2">
                                    {t("AddContact_label_phone")}
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className={errors.phone ? "formInvalid" : null}
                                    placeholder={t("AddContact_phone_placeholder")}
                                    {...register("phone", {
                                      required: t("Form_field_required"),
                                      pattern: {
                                        value: /^[0-9+]+$/,
                                        message: t("Form_phone_number"),
                                      },
                                      minLength: {
                                        value: 9,
                                        message: t("Form_minLength_9"),
                                      },
                                      maxLength: {
                                        value: 14,
                                        message: t("Form_maxLength_14"),
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("phone");
                                    }}
                                    name="phone"
                                  ></Form.Control>
                                  {errors.phone && (
                                    <div className="text-danger form-msg-style">
                                      {errors.phone.message}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                              
                            </Row>
                            <Row>

                              <Col md={12} lg={12}>
                                <Form.Group controlId="description">
                                  <Form.Label className="form-msg-style ms-2">
                                    {t("AddContact_description")}
                                  </Form.Label>
                                  <Form.Control
                                    type="text"
                                    className={errors.description ? "formInvalid" : null}
                                    placeholder={t("AddContact_description_placeholder")}
                                    {...register("description", {
                                      pattern: {
                                        value: /^[A-Za-z0-9ąśŚćĆęłŁńóżŻźŹ ]+$/,
                                        message: t("Form_letters_pl_and_digits"),
                                      },
                                      maxLength: {
                                        value: 250,
                                        message: t("Form_maxLength_250"),
                                      },
                                    })}
                                    onKeyUp={() => {
                                      trigger("description");
                                    }}
                                    name="description"
                                  ></Form.Control>
                                  {errors.description && (
                                    <div className="text-danger form-msg-style">
                                      {errors.description.message}
                                    </div>
                                  )}
                                </Form.Group>
                              </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                              {editContact ? (
                                    <Button
                                    type="submit"
                                    variant="success"
                                    className="rounded my-3"
                                  >
                                    {t("btn-change")}
                                  </Button>
                              ):(
                                    <Button
                                    type="submit"
                                    variant="success"
                                    className="rounded my-3"
                                  >
                                    {t("btn-add")}
                                  </Button>
                              )
                              }

                            </div>
                          </Form>
              : null}
              <div className="d-flex justify-content-center h4">
                <div className="px-3">{t("AddContact_spots_title")}</div>
              </div>
              <div className="d-flex justify-content-between">
                                  <button
                                    className="text-xs text-success"
                                    onClick={() => newHendlerSpot()}
                                    >
                                    {!newSpot ?
                                    t("AddContact_btn_add_spot")
                                    : editSpot ? 
                                        t("AddContact_btn_close_edit_spot")
                                      : t("AddContact_btn_close_spot")}
                                </button>
                                                     
                                <button
                                    className="text-xs text-danger"
                                    onClick={() => setActiveSpot(!activeSpot)}
                                    >
                                    {activeSpot ? 
                                    t("AddContact_show_unactive_spot") 
                                    : t("AddContact_show_active_spot")}
                                </button>
                               

              </div>
              <Table striped hover responsive className="table-sm mt-2">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_name")}
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AddContact_spots_address")}
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      {t("AdminShops_status")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shopSpotList.length !== 0 ?
                    shopSpotList.map((spot) => (
                      <tr key={spot.id}>
                        {spot.is_active & activeSpot ? 
                        <>
                            <td>
                              {spot.name}
                            </td>
                            <td>
                              {spot.city},{space}
                              {spot.street}{space}
                              {spot.no_building}
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">
                                {t("status_active")}
                              </span>
                            </td>
                            <td className="align-middle">
                                  <button
                                    style={btnDelete}
                                    className="text-xs text-danger"
                                    onClick={() => unActiveSpotHandler(spot.id)}
                                  >
                                    {t("btn_unactive")}
                                  </button>
                          </td>
                          <td className="align-middle">
                                  <button
                                    style={btnDelete}
                                    className="text-xs text-worning"
                                    onClick={() => editSpotHandler(spot.id)}
                                  >
                                    {t("btn_edit")}
                                  </button>
                          </td>
                        </>                      
                        : null}
                        {!spot.is_active & !activeSpot ? 
                        <>

                            <td>
                              {spot.name}
                            </td>
                            <td>
                              {spot.city},{space}
                              {spot.street}{space}
                              {spot.no_building}
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">
                                {t("status_inactive")}
                              </span>
                            </td>
                            <td className="align-middle">
                                    <button
                                      style={btnDelete}
                                      className="text-xs text-danger"
                                      onClick={() => activeSpotHandler(spot.id)}
                                    >
                                      {t("btn_active")}
                                    </button>
                              </td>

                        </>                    
                        :null}


                      </tr>
                    ))
                  :t("No_data")}
                  {/* {ListOfContact.map((contact) => (
                    <tr key={contact.id}>
                      {contact.is_active & activeContact ? 
                      <>
                        <td>{contact.name} {contact.surname}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td className="align-middle text-center text-sm">
                          <span className="badge badge-sm bg-gradient-success">
                            {t("status_active")}
                          </span>
                        </td>
                        <td className="align-middle">
                                <button
                                  style={btnDelete}
                                  className="text-xs text-danger"
                                  onClick={() => unActiveHandler(contact.id)}
                                >
                                  {t("btn_unactive")}
                                </button>
                        </td>
                        <td className="align-middle">
                                <button
                                  style={btnDelete}
                                  className="text-xs text-worning"
                                  onClick={() => editHandler(contact.id)}
                                >
                                  {t("btn_edit")}
                                </button>
                              </td>
                      </>    
                      : null}
                      {!contact.is_active & !activeContact ? 
                      <>
                        <td>{contact.name} {contact.surname}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td className="align-middle text-center text-sm">
                          <span className="badge badge-sm bg-gradient-success">
                            {t("status_inactive")}
                          </span>
                        </td>
                        <td className="align-middle">
                                <button
                                  style={btnDelete}
                                  className="text-xs text-danger"
                                  onClick={() => activeHandler(contact.id)}
                                >
                                  {t("btn_active")}
                                </button>
                              </td>
                      </>    
                      : null}
                    </tr>
                  ))} */}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
      
    </div>
  );
}

export default AddContact;
