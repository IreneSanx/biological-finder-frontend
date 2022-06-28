import { useState } from "react";
import React, {Component} from 'react';
import Link from 'next/link';

import Layout from "../../components/layout";
import Table from "../../components/table";

const OmimService = () => {
  const [queryId, setQueryId] = useState("");
  const [queryName, setQueryName] = useState("");
  const [queryGeneSymbol, setQueryGeneSymbol] = useState("");
  const [queryGeneLocus, setQueryGeneLocus] = useState("");
  const [querySymptom, setQuerySymptom] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [err, setErr] = useState();
  const [tab, setTab] = useState(false)

  const [showMore, setShowMore] = useState(false);

  const submitQuery = () => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/virtuoso/api/return_query_omim?disease_id=${queryId}&disease_name=${queryName}&disease_geneSymbol=${queryGeneSymbol}&disease_geneLocus=${queryGeneLocus}&disease_symptom=${querySymptom}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
      })
      .finally(() => {
        setLoading(false);
        setTab(true);
      });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Disease name',
        accessor: 'name',
      },
      {
        Header: 'Gene names',
        accessor: 'geneSymbol',
        Cell: ({ row }) => (<Link href={{ pathname: `/service/genbank`, query: { geneName: row.values.geneSymbol }, }}>{row.values.geneSymbol}</Link>)
      },
      {
        Header: 'Gene locus',
        accessor: 'geneLocus',
      },
      {
        Header: 'Symptoms',
        accessor: 'symptom',
      },
    ],
    []
  )

  return (
    <Layout>
      <div>
        <br/>
        <div className="text-center">
          <p className="h4">OMIM</p>
        </div>
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
        { showMore && (
          <div className="mb-3">
            <br/>
            <p>Disease name</p>
            <input
              className="form-control"
              type="text"
              placeholder="Disease Name"
              onChange={(e) => setQueryName(e.target.value)}
            ></input>
            <br/>
            <p>Gene name</p>
            <input
              className="form-control"
              type="text"
              placeholder="Gene name"
              onChange={(e) => setQueryGeneSymbol(e.target.value)}
            ></input>
            <br/>
            <p>Gene locus</p>
            <input
              className="form-control"
              type="text"
              placeholder="Gene locus"
              onChange={(e) => setQueryGeneLocus(e.target.value)}
            ></input>
            <br/>
            <p>Symptom</p>
            <input
              className="form-control"
              type="text"
              placeholder="Symptom"
              onChange={(e) => setQuerySymptom(e.target.value)}
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
      <div className="mt-2 mb-3">
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

export default OmimService;
