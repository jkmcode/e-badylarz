import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  SET_FLAG_DESC_FALSE,
  DISTRICT_ADD_DESC_DELETE,
} from "../constants/adminConstans";
import { useDispatch, useSelector } from "react-redux";
import { addDesc } from "../actions/adminActions";

function Description(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // dispatch({ type: SET_FLAG_DESC_FALSE });
    dispatch({ type: DISTRICT_ADD_DESC_DELETE });

    if (props.getDesc.length < 1) {
      dispatch(
        addDesc({
          id: userInfo.id,
          addDesc: true,
          objType: props.parentProps.descType,
          objId: props.parentProps.objId,
          lng: props.lngDesc,
          desc: data.desc,
        })
      );
    } else {
      dispatch(
        addDesc({
          id: userInfo.id,
          addDesc: false,
          objType: props.parentProps.descType,
          objId: props.parentProps.objId,
          lng: props.lngDesc,
          desc: data.desc,
          descId: props.getDesc[0].id,
        })
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="desc">
          <Form.Label className="form-msg-style ms-2">
            {t("DistrictAddDescription_label_desc")}
          </Form.Label>
          <Form.Control
            as="textarea"
            placeholder={t("DistrictAddDescription_placeholder_desc")}
            defaultValue={props.descText ? props.descText : null}
            {...register("desc", {
              maxLength: {
                value: 255,
                message: t("Form_maxLength_255"),
              },
            })}
            onKeyUp={() => {
              trigger("desc");
            }}
            name="desc"
          ></Form.Control>
          {errors.desc && (
            <div className="text-danger form-msg-style">
              {errors.desc.message}
            </div>
          )}
        </Form.Group>
        <Button type="submit" variant="success" className="rounded my-3 w-50">
          {t("btn_submit")}
        </Button>
      </Form>
    </>
  );
}

export default Description;
