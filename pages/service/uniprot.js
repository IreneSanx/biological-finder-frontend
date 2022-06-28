import { useState } from "react";
import React from 'react';
import Link from 'next/link';
import Layout from "../../components/layout";
import Table from "../../components/table";

const UniprotService = () => {
  const [queryId, setQueryId] = useState("");
  const [queryProtein, setQueryProtein] = useState("");
  const [queryGene, setQueryGene] = useState("");
  const [queryOrganism, setQueryOrganism] = useState("");
  const [queryDisease, setQueryDisease] = useState("");
  const [querySimilarity, setQuerySimilarity] = useState("");
  const [queryLocation, setQueryLocation] = useState("");
  const [queryFunction, setQueryFunction] = useState("");
  const [queryPharmaceutical, setQueryPharmaceutical] = useState("");

  const [showMore, setShowMore] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [err, setErr] = useState();
  const [tab, setTab] = useState(false)

  const submitQuery = () => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/uniprot/api/return_query_uniprot?protein_id=${queryId}&protein_name=${queryProtein}&protein_gene=${queryGene}&protein_organism=${queryOrganism}&protein_disease=${queryDisease}&protein_similarity=${querySimilarity}&protein_location=${queryLocation}&protein_function=${queryFunction}&protein_pharmaceutical=${queryPharmaceutical}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data)
      })
      .catch((err) => {
        console.log(err);
        setResult([]);
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
        Header: 'Protein',
        accessor: 'protein',
      },
      {
        Header: 'Gene name',
        accessor: 'geneName',
        Cell: ({ row }) => (<Link href={{ pathname: `/service/genbank`, query: { geneName: row.values.geneName }, }}>{row.values.geneName}</Link>)
      },
      {
        Header: 'Organism Name',
        accessor: 'organismName',
      },
      {
        Header: 'Location Annotation',
        accessor: 'locationAnnotationText',
      },
      {
        Header: 'Function Annotation',
        accessor: 'functionAnnotationText',
      },
      {
        Header: 'Similarity Annotation',
        accessor: 'similarityAnnotationText',
      },
      {
        Header: 'Disease Annotation',
        accessor: 'diseaseAnnotationText',
      },
      {
        Header: 'Protein Name',
        accessor: 'proteinFullName',
      },
    ],
    []
  )

  return (
    <Layout>
      <div>
        <br/>
        <div className="text-center">
          <p className="h4">Uniprot</p>
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
            <p>Protein name</p>
            <input
              className="form-control"
              type="text"
              placeholder="Protein Name"
              onChange={(e) => setQueryProtein(e.target.value)}
            ></input>
            <br/>
            <p>Gene name</p>
            <input
              className="form-control"
              type="text"
              placeholder="Gene name"
              onChange={(e) => setQueryGene(e.target.value)}
            ></input>
            <br/>
            <p>Organism</p>
            <input
              className="form-control"
              type="text"
              placeholder="Organism"
              onChange={(e) => setQueryOrganism(e.target.value)}
            ></input>
            <br/>
            <p>Disease Annotation</p>
            <input
              className="form-control"
              type="text"
              placeholder="Disease"
              onChange={(e) => setQueryDisease(e.target.value)}
            ></input>
            <br/>
            <p>Similarity Annotation</p>
            <input
              className="form-control"
              type="text"
              placeholder="Similarity"
              onChange={(e) => setQuerySimilarity(e.target.value)}
            ></input>
            <br/>
            <p>Location Annotation</p>
            <input
              className="form-control"
              type="text"
              placeholder="Location"
              onChange={(e) => setQueryLocation(e.target.value)}
            ></input>
            <br/>
            <p>Function Annotation</p>
            <input
              className="form-control"
              type="text"
              placeholder="Function"
              onChange={(e) => setQueryFunction(e.target.value)}
            ></input>
            <br/>
            <p>Pharmaceutical Annotation</p>
            <input
              className="form-control"
              type="text"
              placeholder="Pharmaceutical"
              onChange={(e) => setQueryPharmaceutical(e.target.value)}
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

export default UniprotService;