import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SET_FLAG } from "../constants/adminConstans";
import { useDispatch } from "react-redux";

function Description(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log("działa submit formularza", data);
    dispatch({ type: SET_FLAG });
    // console.log("id opisu -->", desc[0].id);
    // dispatch(
    //   addDesc({
    //     id: userInfo.id,
    //     addDesc: isAddDesc,
    //     objType: props.descType,
    //     objId: props.objId,
    //     lng: lngCode,
    //     desc: data.desc,
    //     descId: desc[0].id,
    //   })
    // );
  };

  return (
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
  );
}

export default Description;
