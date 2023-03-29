import React, { useState } from "react";
import { TextField } from "@mui/material";
import { addBrand } from "@/services/brand.service";
import { useNavigate } from "react-router-dom";

type Props = {};

const AddBrand = ({}: Props) => {
  const [errorName, setErrorName] = useState<string>("");
  const [errorDsc, setErrorDsc] = useState<string>(""); // Dsc => Dscription
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };
    const name = target.name.value; // typechecks!
    const description = target.description.value; // typechecks!

    console.log("name :" + name + "des : " + description);

    addBrand(name, description).then(
      (res) => {
        alert(res.data.message);
        setLoading(false);
        navigate("/brand", { replace: true });
      },
      (err) => {
        const msg = err?.response.data;
        // console.log(msg);
        switch (msg.status_code) {
          case 400: {
            setErrorName(msg.message);
            setErrorDsc("");
            break;
          }
          case 422: {
            setErrorName("");
            setErrorDsc("");
            msg.validation.map((validate: any) => {
              if (validate.param === "name") {
                setErrorName(validate.msg);
              }
              if (validate.param === "description") {
                setErrorDsc(validate.msg);
              }
            });

            break;
          }
          default: {
            setErrorName("");
            setErrorDsc("");
            break;
          }
        }
        setLoading(false);
      }
    );
  };

  return (
    <div className="grid h-screen place-items-center ">
      <form className="grid gap-3 p-9 w-80 rounded-lg" onSubmit={submitForm}>
        <TextField
          id="outlined-basic"
          // required
          label="Name"
          variant="outlined"
          name="name"
          inputProps={{
            style: { color: "#333" },
          }}
          InputLabelProps={{
            style: { color: "#333" },
          }}
        />
        <p className="text-red-600 text-center">{errorName && errorName}</p>
        {/* {errorName && <p className="text-red-800 text-center">{errorName}</p>} */}
        <TextField
          id="filled-basic"
          label="Description"
          variant="outlined"
          name="description"
          inputProps={{ style: { color: "#333" } }}
          InputLabelProps={{
            style: { color: "#333" },
          }}
        />
        <p className="text-red-600 text-center">{errorDsc && errorDsc}</p>
        {/* {errorDsc && (
          <p className="text-red-800 text-center">{errorDsc && errorDsc}</p>
        )} */}
        <button
          type="submit"
          className={`bg-slate-400 hover:bg-white transition-all ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
