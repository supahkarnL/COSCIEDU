import {
  Navigate,
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../css/Home.css";

export default function Home() {
  const userinfo = useOutletContext();
  const userid = userinfo.id;
  let history = useNavigate();

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const [open, setOpen] = useState(false);

  const fetchClassData = async () => {
    const response = await axios
      .get(`http://192.168.1.35:3001/classroom/${userid}`)
      .catch((err) => console.log(err));

    if (response) {
      const dataSource = response.data;
      // setCalculateinfo(JSON.parse(response.data.calculateinfo));
      console.log("Info: ", dataSource);

      setDataSource(dataSource);
    }
  };

  useEffect(() => {
    fetchClassData();
  }, []);

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setDataSource([...dataSource]);
    }
  };

  const initialValues = {
    subject: "",
    section: "",
    userid: userid,
  };

  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("You must input a Subject!"),
    section: Yup.string().max(3).required(),
  });

  //submit

  const onSubmit = (data) => {
    axios.post("http://192.168.1.35:3001/classroom", data).then((response) => {
      history("/calculate");
      console.log(data);
      setOpen(!open);
      fetchClassData();
    });
  };

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 py-2 gap-5">
      <div
        className="container h-screen mt-5 pt-5 
    rounded-md px-5 bg-white"
      >
        <p className="text-2xl pb-2 border-b border-slate-800">
          ?????????????????????????????????????????????
        </p>
        <div className="flex justify-between pt-3">
          <div className="pt-5">???????????????????????????:</div>
          <div className="pt-5">
            <button
              type="button"
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              data-toggle="modal"
              onClick={() => setOpen(!open)}
            >
              ???????????????????????????
            </button>
          </div>
        </div>

        {open && (
          <div className="popup-box">
            <div
              className="box"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="pt-5">??????????????????????????????????????????</div>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className="flex flex-row gap-4 pt-5 items-center">
                    <div className="flex-none w-20">????????????????????????:</div>
                    <div class="justify-start pt-3">
                      <Field
                        type="text"
                        name="subject"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Web Programming"
                        id="inputSubject"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 pt-5 items-center">
                    <div className="flex-none w-20">Section:</div>
                    <div className="form-floating w-20">
                      <Field
                        name="section"
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="B00"
                        id="inputSection"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 pt-5 justify-center">
                    <button
                      type="submit"
                      // onClick={() => setOpen(!open)}
                      className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      ???????????????????????????
                    </button>
                    <button
                      type="cancel"
                      className="inline-block items-end px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => setOpen(!open)}
                    >
                      ??????????????????
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}

        <div className="flex justify-start pt-3">
          <div className="flex flex-col w-full">
            <div className="flex justify-center">
              <div className="mb-3 w-full">
                <input
                  type="search"
                  className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid 
        rounded
        transition
        ease-in-out
        m-0
        border-blue-600
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                  id="exampleSearch"
                  placeholder="???????????????????????????"
                  value={value}
                  onChange={filterData}
                />
              </div>
            </div>
            <div className="overflow-x-auto h-screen sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <tbody>
                      {value.length > 0
                        ? tableFilter.map((data) => {
                            return (
                              <tr
                                onClick={() => {
                                  history(`/InputInfo/${data.uuid}`);
                                }}
                                to={`/InputInfo/${data.uuid}`}
                                key={data.uuid}
                              >
                                <td>
                                  <div className="flex w-full justify-center ">
                                    <div className="flex flex-col sm:flex-row w-full rounded-lg bg-white shadow-lg h-32 my-1 border-blue-600 border border-solid">
                                      <div className="p-5 flex flex-col justify-start">
                                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                                          {data.subject}
                                        </h5>
                                        <p
                                          className={`text-gray-700 text-base`}
                                        >
                                          Section: {data.section}
                                        </p>
                                        <p
                                          className={`text-gray-700 text-base mb-4 `}
                                        >
                                          ???????????????????????????????????????:{" "}
                                          {JSON.parse(data.calculateinfo).type}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : dataSource.map((data) => {
                            return (
                              <tr
                                onClick={() => {
                                  history(`/InputInfo/${data.uuid}`);
                                }}
                                to={`/InputInfo/${data.uuid}`}
                                key={data.uuid}
                              >
                                <td>
                                  <div className="flex w-full justify-center">
                                    <div className="flex flex-col sm:flex-row w-full rounded-lg bg-white shadow-lg h-32 my-1 border-blue-600 border border-solid">
                                      <div className="p-5 flex flex-col justify-start">
                                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                                          {data.subject}
                                        </h5>
                                        <p className="text-gray-700 text-base">
                                          Section: {data.section}
                                        </p>
                                        <p
                                          className={`text-gray-700 text-base mb-4 `}
                                        >
                                          ???????????????????????????????????????:{" "}
                                          {JSON.parse(data.calculateinfo).type}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <div
          className="container h-96 mt-5 pt-5 
    rounded-md px-5 bg-white"
        ></div> */}
        <div
          className="container h-screen mt-5 pt-5 
    rounded-md px-5 bg-white"
        >
          <p class="text-2xl pb-2 border-b border-slate-800">?????????????????????</p>

          <div className="flex justify-center pt-3">
            <img src="./src/assets/step1.png" className="max-w-sm h-auto" />
          </div>
          <div className="pt-5 text-md pl-5">????????????????????????????????????:</div>
          <div className="pt-5 text-md pl-5">
            1.?????????????????????????????????????????????????????????????????????????????????????????????
            ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </div>
          <div className="pt-2 text-md pl-5">
            2.????????????????????????????????????????????? ?????????????????? import ????????????????????????????????????????????? ?????????????????????????????????????????????
            excel
          </div>
          <div className="pt-2 text-md pl-5">
            3.????????????????????????????????????????????????????????? (???????????????????????? ???????????? ????????????????????????)
            ??????????????????????????????????????????????????????????????????????????????
          </div>
          <div className="pt-2 text-md pl-5">
            4.?????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </div>
          <div className="pt-2 text-md pl-5">
            5.???????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????????????????
          </div>
          <div className="pt-16 flex justify-center">
            <button
              type="button"
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              data-toggle="modal"
              onClick={() => {
                history(`/calculate`);
              }}
            >
              ?????????????????????
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
