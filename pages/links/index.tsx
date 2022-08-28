import axios, { Axios } from "axios";
import { NextPage } from "next";
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
  return (
    <Layout pageTitle="Your URL list" breadCrumbs={breadCrumbs}>
      <div>
        <h1 className="text-4xl font-bold">My links</h1>
      </div>
      {urlData !== null && (
        <div className="mt-4">
          <LinksTable data={urlData?.data} />
        </div>
      )}
    </Layout>
  );
};

export default LinkIndexPage;
