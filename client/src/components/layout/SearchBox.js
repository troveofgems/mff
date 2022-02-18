import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const
    [keyword, setKeyword] = useState(''),
    navigate = useNavigate();

  const handleRequestToSearchProductCatalogue = evt => {
    evt.preventDefault();
    if(keyword.trim()) {
      console.log('Search DB For: ', keyword);
      return navigate(`/?search=${keyword}`, {state: { search: keyword }});
    } else {
      return navigate("/");
    }
  };

  return (
    <Form onSubmit={handleRequestToSearchProductCatalogue} className={"d-flex me-2"}>
      <Form.Control
        type={"text"} name={'productCatalogueQuery'}
        onChange={evt => setKeyword(evt.target.value)}
        classname={"mr-sm-2 ml-sm-5"} placeholder={"Search Products"}
      >
      </Form.Control>
      <Button type={"submit"} variant={"outline-success"} className={"p-2 ms-4"}>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;