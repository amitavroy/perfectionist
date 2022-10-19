import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IBreadcrumbLink } from "../../../components/Breadcrumbs";
import { Card } from "../../../components/commons/Card";
import { Heading1 } from "../../../components/commons/Headings/Heading1";
import { Heading2 } from "../../../components/commons/Headings/Heading2";
import { Layout } from "../../../components/Layout";
import { IUrl } from "../../../interfaces/models/url.interface";
import HttpService from "../../../services/http.services";
import { getLocalDate } from "../../../services/utils.service";

const UrlViewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [url, setUrl] = useState<IUrl | null>(null);

  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
    { name: "URLs", link: `/collections/link/view/${url?.collection_id}` },
  ];

  const fetchUrlDetails = async () => {
    const resp = await HttpService.get(`url-failure/${id}`);
    setUrl(resp.data.data);
  };

  useEffect(() => {
    id !== undefined && fetchUrlDetails();
  }, [id]);

  return (
    <Layout pageTitle="URL Details" breadCrumbs={breadCrumbs}>
      <div className="mb-4">
        <Heading1 text="URL details" />
      </div>
      <div className="mb-4">
        <Card>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p>
                <strong>URL link:</strong> {url?.url}
              </p>
            </div>
            <div>
              <p>
                <strong>URL status:</strong>{" "}
                {url?.active ? "Active" : "Inactive"}
              </p>
            </div>
            <div>
              <p>
                <strong>URL is failing:</strong> {url?.failing ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </Card>
      </div>
      {url && url.failures && url.failures?.length > 0 && (
        <div className="w-1/4">
          <Card>
            <React.Fragment>
              <Heading2 text="Recent failures" />
              <ul className="mt-4">
                {url.failures?.map((fail, index) => {
                  return (
                    <li key={fail.id} className="mt-2">
                      {getLocalDate(fail.created_at)}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default UrlViewPage;
