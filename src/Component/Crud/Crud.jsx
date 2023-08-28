import React, { useState, useEffect } from "react";
import { Input, Button, Popconfirm, Form } from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  BreadcrumbDynamic,
  DataTable,
  PopupModel,
  FormInput,
  FormButton,
  FormUpload,
  Loader,
  FormSwitch,
  FormView,
  FormTag,
  ImageView,
} from "../../Helpers/Helpers";
import API from "../../Utils/ApiService";
import { start, success, failure } from "../../Store/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Messages from "../../Helpers/Messages";
const Crud = ({ title }) => {
  const api = new API();
  const messages = new Messages();
  const dispatch = useDispatch();
  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const [loading, setLoading] = useState({
    create: false,
    update: false,
    view: false,
    single: false,
    delete: false,
    deleteMany: false,
    table: false,
  });
  const [popup, setPopup] = useState({
    create: false,
    update: false,
    view: false,
  });
  const [reset, setReset] = useState({
    create: false,
    update: false,
    view: false,
  });
  const [rows, setRows] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uploadAddImg, setUploadAddImg] = useState([]);
  const [editImg, setEditImg] = useState([]);
  const [addImg, setAddImg] = useState([]);
  //redux selector
  const list = useSelector((state) => state?.auth?.crudlist?.data);
  const single = useSelector((state) => state?.auth?.crudsingle?.data);
  //initFunction
  const initFunction = async () => {
    setLoading({ ...loading, table: true });
    await api.getAll(
      dispatch,
      [start, success, failure, "crudlist"],
      "sample",
      {},
      (err, res) => {
        setLoading({ ...loading, table: false });
        if (res) {
        } else {
          dispatch(failure());
          dispatch(success({ type: "crudlist", data: null }));
        }
      }
    );
  };
  //init
  useEffect(() => {
    initFunction();
  }, []);
  //table search function
  const handleSearch = (searchText) => {
    const keys = ["name", "des"];
    const filtered = data.filter((item) =>
      keys.some((key) =>
        item[key].toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  //table row selection
  const rowSelections = (ids) => {
    setRows(ids);
  };
  //popup model
  const openPopup = (type) => {
    setPopup({ ...popup, [type]: true });
  };
  //crud function
  const handleSubmit = (value, type) => {
    if (type === "create") {
      const form_data = new FormData();
      form_data.append("image", uploadAddImg[0]);
      Object.entries(value).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          form_data.append(key, value);
        }
      });
      setLoading({ ...loading, create: true });
      api.create(
        dispatch,
        [start, success, failure, "crudcreate"],
        "sample",
        form_data,
        (err, res) => {
          setLoading({ ...loading, create: false });
          if (res) {
            initFunction();
            setRows([]);
            setAddImg([]);
            formCreate.resetFields();
            setReset({ ...reset, create: true });
            setPopup({ ...popup, create: false });
            messages.message("success", res?.data?.message);
          } else {
            dispatch(failure());
            dispatch(success({ type: "crudcreate", data: null }));
            messages.message("error", err?.response?.data?.message);
          }
        }
      );
    } else if (type === "edit") {
      formUpdate.resetFields();
      setLoading({ ...loading, view: true });
      api.getSingle(
        dispatch,
        [start, success, failure, "crudsingle"],
        "sample",
        value,
        (err, res) => {
          setLoading({ ...loading, view: false });
          if (res) {
            formUpdate.setFieldsValue({
              ...res?.data?.data,
              status: single?.status,
            });
            setEditImg([
              {
                uid: res?.data?.data?._id,
                url: res?.data?.data?.image
                  ? api.apiUrl + res?.data?.data?.image
                  : "",
                name: res?.data?.data?.name,
                status: "done",
              },
            ]);
            setPopup({ ...popup, update: true });
          } else {
            dispatch(failure());
            setPopup({ ...popup, update: false });
            dispatch(success({ type: "crudsingle", data: null }));
            messages.message("error", err?.response?.data?.message);
          }
        }
      );
    } else if (type === "update") {
      const form_data = new FormData();
      form_data.append("image", uploadAddImg[0]);
      Object.entries(value).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          form_data.append(key, value);
        }
      });
      setLoading({ ...loading, update: true });
      api.update(
        dispatch,
        [start, success, failure, "crudupdate"],
        "sample",
        single?._id,
        form_data,
        (err, res) => {
          setLoading({ ...loading, update: false });
          if (res) {
            initFunction();
            setPopup({ ...popup, update: false });
            messages.message("success", res?.data?.message);
          } else {
            dispatch(failure());
            dispatch(success({ type: "crudupdate", data: null }));
            messages.message("error", err?.response?.data?.message);
          }
        }
      );
    } else if (type === "delete") {
      setLoading({ ...loading, delete: true });
      api.remove(
        dispatch,
        [start, success, failure, "cruddelete"],
        "sample",
        value,
        (err, res) => {
          setLoading({ ...loading, delete: false });
          if (res) {
            initFunction();
            messages.message("success", res?.data?.message);
          } else {
            dispatch(failure());
            dispatch(success({ type: "cruddelete", data: null }));
            messages.message("error", err?.response?.data?.message);
          }
        }
      );
    } else if (type === "deletemany") {
      setLoading({ ...loading, deleteMany: true });
      api.removeMany(
        dispatch,
        [start, success, failure, "cruddeletemany"],
        "sample",
        { ids: value },
        (err, res) => {
          setLoading({ ...loading, deleteMany: false });
          if (res) {
            initFunction();
            setRows([]);
            messages.message("success", res?.data?.message);
          } else {
            dispatch(failure());
            dispatch(success({ type: "cruddeletemany", data: null }));
            messages.message("error", err?.response?.data?.message);
          }
        }
      );
    } else if (type === "view") {
      setLoading({ ...loading, view: true });
      setPopup({ ...popup, view: true });
      api.getSingle(
        dispatch,
        [start, success, failure, "crudsingle"],
        "sample",
        value,
        (err, res) => {
          setLoading({ ...loading, view: false });
          if (res) {
          } else {
            dispatch(failure());
            dispatch(success({ type: "crudsingle", data: null }));
            messages.message("error", err?.response?.data?.message);
          }
        }
      );
    }
  };
  //table data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ...messages.tableService("name"),
    },
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: messages.statusTable("status"),
    },
    {
      title: "Action",
      dataIndex: "id",
      fixed: "right",
      width: 105,
      render: (id) => (
        <div className="action_btn_table">
          <p className="edit" onClick={() => handleSubmit(id, "view")}>
            <EyeOutlined />
          </p>
          <p className="edit" onClick={() => handleSubmit(id, "edit")}>
            <EditOutlined />
          </p>
          <Popconfirm
            title=" Are you Sure to delete?"
            onConfirm={() => handleSubmit(id, "delete")}
            okButtonProps={{
              loading: loading.delete,
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      ),
    },
  ];
  const data = list?.map((item) => ({
    key: item._id,
    id: item._id,
    name: item.name,
    image: item.image ? (
      <ImageView url={api.apiUrl + item.image} alt={item.name} size={35} />
    ) : (
      ""
    ),
    status: [item.status],
  }));
  //form upload
  const uploadAdd = (file) => {
    setUploadAddImg(file);
  };

  return (
    <>
      <BreadcrumbDynamic title={title} />
      <div className="card">
        <div className="action_head">
          <div className="action_head_left">
            <Input
              size="medium"
              placeholder="Search"
              className="width_230"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="action_head_right">
            {rows?.length > 0 && (
              <Popconfirm
                title=" Are you Sure to delete?"
                onConfirm={() => handleSubmit(rows, "deletemany")}
                okButtonProps={{
                  loading: loading.deleteMany,
                }}
              >
                <Button
                  type="primary"
                  danger
                  htmlType="button"
                  className="action_btn"
                >
                  <DeleteOutlined /> Delete
                </Button>
              </Popconfirm>
            )}
            <Button
              type="primary"
              className="action_btn"
              onClick={() => openPopup("create")}
            >
              <PlusCircleOutlined /> Add
            </Button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredData?.length > 0 ? filteredData : data}
          rowSelections={rowSelections}
          loading={loading.table}
        />
        {/*view*/}
        <PopupModel
          title={"View"}
          footer={null}
          open={popup.view}
          oncancel={() => setPopup({ ...popup, view: false })}
          width={450}
          body={
            loading.view === true ? (
              <Loader />
            ) : (
              <div className="col_1 g_15">
                <FormView label="Name" value={single?.name} />
                <FormView
                  label="Image"
                  value={
                    <ImageView
                      url={single?.image ? api.apiUrl + single?.image : ""}
                      alt={single?.name}
                      size={35}
                    />
                  }
                />
                <FormView
                  label="Status"
                  value={
                    single?.status === true ? (
                      <FormTag label="Active" color="green" />
                    ) : (
                      <FormTag label="Inactive" color="orange" />
                    )
                  }
                />
              </div>
            )
          }
        />
        {/*Add*/}
        <PopupModel
          title={"Create"}
          footer={null}
          open={popup.create}
          oncancel={() => setPopup({ ...popup, create: false })}
          width={450}
          body={
            <Form
              form={formCreate}
              onFinish={(e) => handleSubmit(e, "create")}
              layout="vertical"
              className="col_1 g_10"
            >
              <FormInput
                label="Name"
                name="name"
                required={true}
                validationmsg="Name is required"
              />
              <FormUpload
                label="Image"
                imagesize={150 / 150}
                limit={1}
                crop={true}
                upload={uploadAdd}
                reset={reset.create}
                setReset={setReset}
                resetType={"create"}
                setimage={addImg}
              />
              <FormSwitch label="Status" name="status" setValue={true} />
              <FormButton
                btype="submit"
                text="Create"
                type="primary"
                loading={loading.create}
              />
            </Form>
          }
        />
        {/*Edit*/}
        <PopupModel
          title={"Edit"}
          footer={null}
          open={popup.update}
          oncancel={() => setPopup({ ...popup, update: false })}
          width={450}
          body={
            loading.view === true ? (
              <Loader />
            ) : (
              <Form
                form={formUpdate}
                onFinish={(e) => handleSubmit(e, "update")}
                layout="vertical"
                className="col_1 g_10"
              >
                <FormInput
                  label="Name"
                  name="name"
                  required={true}
                  validationmsg="Name is required"
                />
                <FormUpload
                  label="Image"
                  imagesize={150 / 150}
                  limit={1}
                  crop={true}
                  upload={uploadAdd}
                  reset={reset.create}
                  setReset={setReset}
                  resetType={"update"}
                  setimage={editImg}
                />
                <FormSwitch
                  label="Status"
                  name="status"
                  setValue={single?.status}
                />
                <FormButton
                  btype="submit"
                  text="Update"
                  type="primary"
                  loading={loading.update}
                />
              </Form>
            )
          }
        />
      </div>
    </>
  );
};

export default Crud;
