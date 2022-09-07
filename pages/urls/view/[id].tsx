import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IBreadcrumbLink } from "../../../components/Breadcrumbs";
import { Layout } from "../../../components/Layout";
import { IUrl } from "../../../interfaces/models/url.interface";
import { getLocalDate } from "../../../services/utils.service";

const UrlViewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "URLs", link: "/urls" },
    { name: "URL view" },
  ];

  const [url, setUrl] = useState<IUrl | null>(null);

  const fetchUrlDetails = async () => {
    const resp = await axios.get(
      `http://192.168.1.233:8000/api/url-failure/${id}`
    );
    setUrl(resp.data.data);
  };

  useEffect(() => {
    id !== undefined && fetchUrlDetails();
  }, [id]);

  return (
    <Layout pageTitle="URL Details" breadCrumbs={breadCrumbs}>
      <div className="w-1/2 shadow rounded p-10 bg-white">
        {url != null && (
          <React.Fragment>
            <h2>Recent failures</h2>
            <ul>
              {url.failures?.map((fail, index) => {
                return <li key={fail.id}>{getLocalDate(fail.created_at)}</li>;
              })}
            </ul>
          </React.Fragment>
        )}
      </div>
    </Layout>
  );
};

export default UrlViewPage;
