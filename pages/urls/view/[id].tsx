import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "react-feather";

import { IBreadcrumbLink } from "../../../components/Breadcrumbs";
import { Card } from "../../../components/commons/Card";
import { Heading1 } from "../../../components/commons/Headings/Heading1";
import { Heading2 } from "../../../components/commons/Headings/Heading2";
import ResponseGraph from "../../../components/Graphs/ResponseGraph";
import { Layout } from "../../../components/Layout";
import { ISuccessResp } from "../../../interfaces/graph.interface";
import { IUrl, IUrlSuccess } from "../../../interfaces/models/url.interface";
import HttpService from "../../../services/http.services";
import { getLocalDate } from "../../../services/utils.service";

const UrlViewPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [url, setUrl] = useState<IUrl | null>(null);
  const [success, setSuccess] = useState<Array<IUrlSuccess> | null>(null);
  const [graphData, setgraphData] = useState<Array<ISuccessResp> | null>(null);

  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
    { name: "URLs", link: `/collections/link/view/${url?.collection_id}` },
  ];

  const fetchUrlDetails = async () => {
    const resp = await HttpService.get(`url-failure/${id}`);
    setUrl(resp.data.data);

    const successResp = await HttpService.get(`url/${id}`);
    setSuccess(successResp.data.success);

    const graphResp = await HttpService.post(`url/success-resp`, {
      id,
    });
    setgraphData(graphResp.data);
  };

  const changeUrlState = async () => {
    const resp = await HttpService.get(`url/change-status/${id}`);
    setUrl(resp.data.data);
  };

  const changeUrlFailing = async () => {
    const resp = await HttpService.get(`url/change-failing/${id}`);
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
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p>
                <strong>URL link:</strong> {url?.url}
              </p>
            </div>
            <div className="flex">
              <div className="mr-2">
                <strong>URL status:</strong>{" "}
                {url?.active ? "Active" : "Inactive"}
              </div>
              {url != null && (
                <div>
                  {!url?.active ? (
                    <ToggleLeft
                      className="text-red-500"
                      onClick={changeUrlState}
                    />
                  ) : (
                    <ToggleRight
                      className="text-green-500"
                      onClick={changeUrlState}
                    />
                  )}
                </div>
              )}
            </div>
            <div className="flex">
              <div className="mr-2">
                <strong>URL is failing:</strong> {url?.failing ? "Yes" : "No"}
              </div>
              {url != null && (
                <div>
                  {url?.failing ? (
                    <ToggleLeft
                      className="text-red-500"
                      onClick={changeUrlFailing}
                    />
                  ) : (
                    <ToggleRight
                      className="text-green-500"
                      onClick={changeUrlFailing}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <strong>Avg time:</strong> {url?.avg_time}ms
            </div>
            <div></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          {url && url.failures && url.failures?.length > 0 && (
            <div className="mb-4">
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

          {success != null && success.length > 0 && (
            <Card>
              <React.Fragment>
                <Heading2 text="Recent polls" />
                {success?.map((s, index) => {
                  return (
                    <div key={s.id} className="mt-2 flex justify-between">
                      <div>{getLocalDate(s.created_at)}</div>
                      <div>{s.time}ms</div>
                    </div>
                  );
                })}
              </React.Fragment>
            </Card>
          )}
        </div>
        <div className="col-span-3">
          {graphData != null && (
            <Card>
              <ResponseGraph graphData={graphData} />
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UrlViewPage;
