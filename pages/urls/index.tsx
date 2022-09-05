import axios, { Axios } from "axios";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IBreadcrumbLink } from "../../components/Breadcrumbs";
import { Layout } from "../../components/Layout";
import { LinksTable } from "../../components/LinkTable";
import { IPaginatedData } from "../../interfaces/commons/paginate.interface";
import { IUrl } from "../../interfaces/models/url.interface";

interface IPaginatedUrls extends IPaginatedData {
  data: Array<IUrl>;
}

const LinkIndexPage: NextPage = () => {
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "URLs", link: "#" },
  ];
  const [loading, setLoading] = useState(false);
  const [urlData, setUrlData] = useState<IPaginatedUrls | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchUrls();
    setLoading(false);
  }, []);

  const fetchUrls = async () => {
    const resp = await axios.get("http://localhost:8000/api/url");
    resp.status === 200 && setUrlData(resp.data.data);
  };

  const deleteLink = async (url: IUrl) => {
    const apiUrl = `http://localhost:8000/api/url/${url.id}`;
    await axios.delete(apiUrl);
    await fetchUrls();
  };

  return (
    <Layout pageTitle="Your URL list" breadCrumbs={breadCrumbs}>
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">My URLs</h1>
        </div>
        <div>
          <Link href="/urls/add">
            <a className="btn btn-primary">Add new URL</a>
          </Link>
        </div>
      </div>
      {urlData !== null && (
        <div className="mt-4">
          <LinksTable
            data={urlData?.data}
            onDelete={(url) => deleteLink(url)}
          />
        </div>
      )}
    </Layout>
  );
};

export default LinkIndexPage;
