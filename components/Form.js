import { useForm, useField } from "react-form";
import { useMemo } from "react";
import Editor from "./Editor";
import DatePicker from "react-datepicker";
import moment from "moment";
import { editPost, postPost } from "../helpers/api";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";

function todayToMongoISO() {
  return moment(new Date()).format("YYYY-MM-DD[T00:00:00.000Z]");
}

const errorLabel = (error) => <div className="error-label">{error}</div>;

async function checkRequired(value) {
  if (!value) {
    return "Field required";
  }
  return false;
}

async function sendToServer(values, { isEditor, id }, { token }) {
  console.log(values)

  // prepare for api post
  const data = { ...values };
  let formattedDate = moment(values.date).format("YYYY-MM-DD");
  data.date = formattedDate;
  data.updatedAt = todayToMongoISO();

  if (!isEditor) {
    const response = await postPost(data, token);
    console.log(response);
    return response;
  }
  if (isEditor) {
    const response = await editPost(id, data, token);
    console.log(response);
    return response;
  }
}

function TitleField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("title", {
    validate: checkRequired,
  });

  return (
    <>
      <input type="text" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        errorLabel(error)
      ) : null}
    </>
  );
}

function DateField() {
  const {
    value = [],
    setValue,
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("date", {
    validate: checkRequired,
  });

  const handleChange = (date) => {
    setValue(date);
  };

  return (
    <>
      <DatePicker selected={value} onChange={handleChange} />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        errorLabel(error)
      ) : null}
    </>
  );
}

function SlugField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("slug", {
    validate: checkRequired,
  });

  return (
    <>
      <input type="text" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        errorLabel(error)
      ) : null}
    </>
  );
}

function CreatedAtField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("createdAt", {
    validate: checkRequired,
  });

  return (
    <>
      <input
        style={{ display: "none" }}
        type="hidden"
        type="text"
        {...getInputProps()}
      />
    </>
  );
}

function TextField({html}) {
  const {
    setValue,
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("html", {
    validate: checkRequired,
  });

  const handleChange = (text) => {
    setValue(text);
  };

  return (
    <>
      <Editor html={html} handleChange={handleChange} {...getInputProps()} />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <div className="error-label-editor">{error}</div>
      ) : null}
    </>
  );
}

function CategoryField() {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("category", {
    validate: checkRequired,

    //   validate: validateAddressStreet
  });

  return (
    <>
      <input type="text" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        errorLabel(error)
      ) : null}
    </>
  );
}

function Form({ post, token }) {
  console.log(token);
  const { addToast } = useToasts();

  const defaultValues = useMemo(
    () => ({
      title: post && post.title,
      slug: post && post.slug,
      category: post && post.category,
      date: (post && new Date(post.date)) || new Date(),
      createdAt: (post && post.createdAt) || todayToMongoISO(),
      html: post && post.html,
    }),
    []
  );

  const {
    Form,
    meta: { isSubmitting, canSubmit },
    reset,
  } = useForm({
    defaultValues,
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      const isEditor = !!post;
      const response = await sendToServer(
        values,
        {
          isEditor: isEditor,
          id: (post && post.id) || null,
        },
        token
      );
      if (!response.success) {
        addToast(response.message, { appearance: "error" });
      } else {
        console.log("Huzzah!");
        !isEditor && addToast("Added new post.", { appearance: "success" }) &&       Router.push("/");
        ;
        isEditor && addToast("Edited post.", { appearance: "success" });

      }
    },
    debugForm: true,
  });

  return (
    <Form>
      <div>
        <label>
          Title: <TitleField />
        </label>
      </div>
      <div>
        <label>
          Slug: <SlugField />
        </label>
      </div>
      <div>
        <label>
          Category: <CategoryField />
        </label>
      </div>
      <div>
        <label>
          Date: <DateField />
        </label>
      </div>
      <div>
        <label>
          Text: <TextField html={post && post.html} />
        </label>
      </div>

      <CreatedAtField />

      <div>
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
    /* <style jsx>{`
     
      
      `}</style> */
  );
}
export default Form;
