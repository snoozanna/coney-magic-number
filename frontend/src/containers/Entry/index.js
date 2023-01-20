import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { useMutation } from "@apollo/client";
import CODENAMES_QUERY from "../../queries/codenames";

import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Query from "../../components/Query";

import "./Entry.css";

const Entry = () => {
  const [codename, setCodename] = useState("");

  // const { loading, error, data } = useQuery(SURVEYS_QUERY, {
  //   variables: { slug },
  // });

  // const { loading, error, data } = useQuery(QUESTIONS_QUERY);

  // console.log("datainq", data);

  // const { name, slug } = data.surveys.data[0].attributes;

  // Form - React Hook Forms functionality
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      responses: {},
    },
  });

  const handleSelectChange = (event) => {
    setCodename(event.target.value);
  };

  const onSubmit = (data) => {
    // TODO add successful submission
  };

  return (
    <>
      <main>
        <Query query={CODENAMES_QUERY}>
          {({ data: { codenames } }) => {
            console.log("codenames", codenames.data);
            const codenamesToShow = codenames.data;
            return (
              <>
                <div className="formContainer">
                  <div className="formWrapper">
                    <div className="formStatus">
                      <span>Choose codename</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="optionWrapper">
                        <select
                          // value={emailToShow}
                          onChange={handleSelectChange}
                        >
                          {" "}
                          {/* //set value here */}
                          {codenamesToShow.map((c, inx) => {
                            const name = c.attributes.codename;
                            const confirmed = c.attributes.confirmed;

                            console.log("confirmed", confirmed);
                            return (
                              <option value={codename} key={inx}>
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <Link to="/form">
                        <button>Go</button>
                      </Link>
                    </form>
                  </div>
                </div>
              </>
            );
          }}
        </Query>
      </main>

      <Footer />
    </>
  );
};

export default Entry;

//  return (
//    <>
//      <div className="formWrapper">
//        <h1>{name}</h1>

//      </div>
//    </>
//  );

//  <form onSubmit={handleSubmit(onSubmit)} key={surveyId}>
//    <input defaultValue="test" {...register("email", { required: true })} />
//    <input
//      defaultValue="test"
//      {...register("surveyResponse", { required: true })}
//    />
//    <input
//      defaultValue="test"
//      {...register("surveyQuestion", { required: true })}
//    />
//    <input type="submit" />;
//  </form>;
