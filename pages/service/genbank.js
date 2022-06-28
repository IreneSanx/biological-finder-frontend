import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import React, {Component} from 'react';
import Link from 'next/link';

import Layout from "../../components/layout";
import Table from "../../components/table";

const GenbankService = () => {
  const router = useRouter();
  const { geneName } = router.query
  console.log(geneName)
  const [queryId, setQueryId] = useState("");
  const [queryLocus, setQueryLocus] = useState("");
  const [queryDescription, setQueryDescription] = useState("");
  const [queryName, setQueryName] = useState(geneName || "");
  const [queryOrganism, setQueryOrganism] = useState("");

  const [showMore, setShowMore] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [err, setErr] = useState();
  const [tab, setTab] = useState(false)

  const submitQuery = () => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/genbank/api/return_query_genbank?gene_id=${queryId}&gene_locus=${queryLocus}&gene_name=${queryName}&gene_organism=${queryOrganism}&gene_description=${queryDescription}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setResult([])
        setErr(err);
      })
      .finally(() => {
        setLoading(false);
        setTab(true);
      });
  };

  useEffect(() => {
    if (geneName)
      {submitQuery()}
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'ID',
      },
      {
        Header: 'Locus',
        accessor: 'Locus',
      },
      {
        Header: 'Description',
        accessor: 'Description',
      },
      {
        Header: 'Organism',
        accessor: 'Organism',
      },
      {
        Header: 'Taxonomy',
        accessor: 'Taxonomy',
      },
      {
        Header: 'Gene name',
        accessor: 'Name',
      },
    ],
    []
  )

  return (
    <Layout>
      <br/>
      <div className="text-center">
        <p className="h4">GenBank</p>
      </div>
      <br/>
      <div>
        <div className="mb-3">
          <p>ID</p>
          <input
            className="form-control"
            type="text"
            placeholder="ID"
            onChange={(e) => setQueryId(e.target.value)}
          ></input>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => setShowMore(true)}
        >
          Show more
        </button>
        {showMore && (
        <div className="mb-3">
          <br/>
          <p className="h5">Fill in one field only</p>
          <br/>
          <p>Locus</p>
          <input
            className="form-control"
            type="text"
            placeholder="Locus"
            onChange={(e) => setQueryLocus(e.target.value)}
          ></input>
          <br/>
          <p>Name</p>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            defaultValue={queryName}
            onChange={(e) => setQueryName(e.target.value)}
          ></input>
          <br/>
          <p>Organism (add '+' between words)</p>
          <input
            className="form-control"
            type="text"
            placeholder="Organism"
            onChange={(e) => setQueryOrganism(e.target.value)}
          ></input>
          <br/>
          <p>Description (add '+' between words)</p>
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            onChange={(e) => setQueryDescription(e.target.value)}
          ></input>
          <br/>
          <button
              className="btn btn-secondary"
              onClick={() => setShowMore(false)}
            >
              Hide filters
          </button>
        </div>
        )}
      </div>
      
      <div className=" mt-2 mb-3">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => submitQuery()}
        >
          Submit
        </button>
        <div className="ml-2 mt-4">
          <Link href="/">
            <a className="h6">← Back to home</a>
          </Link>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {err && <div className="alert alert-danger" role="alert">Oh no! :(</div>}
      {tab && 
        <div className = "overflow-scroll">
          <Table columns={columns} data={result}></Table>
        </div>
      }
    </Layout>
  );
};

export default GenbankService;
