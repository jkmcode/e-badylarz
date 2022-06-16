import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { testList } from "../actions/testActions";
import {
  TEST_REQUEST,
  TEST_SUCCESS,
  TEST_FAIL,
} from "../constants/testConstans";

function FormAdressScreen2() {
  const dispatch = useDispatch();

  const [test, setTest] = useState("");
  const [test2, setTest2] = useState("");

  const testFunction = (p) => {
    setTest(p);
  };

  const testFunction2 = (props) => {
    setTest2(props);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const zero = "0";
  const { t } = useTranslation();

  const onSubmit = (data) => {
    console.log("działa submit formularza", test);
    console.log("działa submit formularza", test2);
  };
  dispatch(testList([]));

  return (
    <div>
      <Container>
        <FormTitle text="xxxxxxxxx"></FormTitle>
        <FormTitle text="aaaaaaaaa"></FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={9}>
              <FormTextInput
                textPlaceholder="AAAA..."
                textName="street"
                testF={testFunction}
                labelName="Miejscowość"
              />
            </Col>
            <Col md={3}>
              <FormTextInput
                textPlaceholder="BBBB..."
                textName="street2"
                testF={testFunction2}
                labelName="Ulica"
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <FormTextInput
                textPlaceholder="AAAA..."
                textName="street"
                testF={testFunction}
                labelName="Miejscowość"
              />
            </Col>
          </Row>
          <Row>
            <Col md={9}>
              <div>
                <Form.Group>
                  <Form.Label className="m-0">xxx</Form.Label>
                  <Form.Control
                    type="text"
                    className="mb-2"
                    placeholder="xxxx...."
                    {...register("xxx", {
                      required: "Pole wymagane",
                      minLength: {
                        value: 8,
                        message: "za mało liter",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("xxx");
                    }}
                    name="xxx"
                    //onChange={testAAAA}
                  ></Form.Control>
                </Form.Group>
                {errors.xxx && <div>{errors.xxx.message}</div>}
              </div>
            </Col>
          </Row>
          <Button
            type="submit"
            variant="success"
            className="rounded my-3 w-100"
          >
            {t("FormAddressScreen__btn")}
          </Button>
        </Form>
      </Container>
      ;
    </div>
  );
}

function Container(props) {
  return (
    <div className="container bg-container mt-5 p-4 rounded-3">
      {props.children}
    </div>
  );
}

function FormTitle(props) {
  return (
    <Row>
      <Col>
        <h5 className="text-center">{props.text}</h5>
      </Col>
    </Row>
  );
}

function FormTextInput(props) {
  const nameField = props.textName;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    trigger,
  } = useForm();

  const { t } = useTranslation();

  const testAAAA = (e) => {
    props.testF(e.target.value);
  };

  return (
    <div>
      <Form.Group>
        <Form.Label className="m-0">{props.labelName}</Form.Label>
        <Form.Control
          type="text"
          className="mb-2"
          placeholder={props.textPlaceholder}
          {...register(nameField, {
            required: "Pole wymagane",
            minLength: {
              value: 8,
              message: "za mało liter",
            },
          })}
          onKeyUp={() => {
            trigger({ nameField });
          }}
          name={nameField}
          //onChange={testAAAA}
        ></Form.Control>
      </Form.Group>
      {errors.nameField && <div>{errors.nameField.message}</div>}
    </div>
  );
}

export default FormAdressScreen2;
